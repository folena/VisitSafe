package br.com.visitsafe.service.unit;

import br.com.visitsafe.dto.unit.UnitAssociationCodeResponseDTO;
import br.com.visitsafe.model.enums.DocumentTypeEnum;
import br.com.visitsafe.model.unit.EnterpriseUnit;
import br.com.visitsafe.model.unit.ResidentialUnit;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.unit.UnitAssociationCode;
import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.model.user.EnterpriseOwnerUser;
import br.com.visitsafe.model.user.ResidentialOwnerUser;
import br.com.visitsafe.repository.unit.UnitAssociationCodeRepository;
import br.com.visitsafe.repository.unit.UnitRepository;
import br.com.visitsafe.service.user.EnterpriseOwnerUserReadService;
import br.com.visitsafe.service.user.EnterpriseOwnerUserUpdateService;
import br.com.visitsafe.service.user.ResidentialOwnerUserReadService;
import br.com.visitsafe.service.user.ResidentialOwnerUserUpdateService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UnitAssociationCodeService {

    private final UnitAssociationCodeRepository repository;

    private final ResidentialOwnerUserReadService residentialReadService;
    private final EnterpriseOwnerUserReadService enterpriseReadService;

    private final ResidentialOwnerUserUpdateService residentialUpdateService;
    private final EnterpriseOwnerUserUpdateService enterpriseUpdateService;

    private final UnitRepository unitRepository;

    public UnitAssociationCodeResponseDTO generateCodeByType(UUID unitId, AdminUser adminUser) {
        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new NoSuchElementException("Unidade não encontrada com ID: " + unitId));

        if (unit instanceof ResidentialUnit resUnit) {
            if (!resUnit.getCondominium().getId().equals(adminUser.getCondominium().getId())) {
                throw new SecurityException("Admin não pertence ao condomínio da unidade residencial.");
            }
        } else if (unit instanceof EnterpriseUnit entUnit) {
            if (!entUnit.getCondominium().getId().equals(adminUser.getCondominium().getId())) {
                throw new SecurityException("Admin não pertence ao condomínio da unidade empresarial.");
            }
        }

        return generateCode(unit, adminUser);
    }

    public UnitAssociationCodeResponseDTO generateCode(Unit unit, AdminUser adminUser) {
        Optional<UnitAssociationCode> existingOpt = repository.findTopByUnitOrderByCreatedAtDesc(unit);

        OffsetDateTime now = OffsetDateTime.now();

        if (existingOpt.isPresent()) {
            UnitAssociationCode existing = existingOpt.get();
            OffsetDateTime baseTime = existing.getUpdatedAt() != null ? existing.getUpdatedAt() : existing.getCreatedAt();
            boolean isValid = baseTime.plusHours(24).isAfter(now);
            boolean isUsed = existing.getUsedBy() != null;

            if (isValid && !isUsed) {
                return new UnitAssociationCodeResponseDTO(existing.getCode(), baseTime.plusHours(24));
            }

            if (!isValid && !isUsed) {
                String newCode = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
                existing.setCode(newCode);
                existing.setUpdatedAt(now);
                existing.setLastUpdatedByAdmin(adminUser);
                repository.save(existing);
                return new UnitAssociationCodeResponseDTO(newCode, now.plusHours(24));
            }
        }

        String code = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        UnitAssociationCode newCode = new UnitAssociationCode();
        newCode.setCode(code);
        newCode.setUnit(unit);
        newCode.setCreatedAt(now);
        newCode.setUpdatedAt(now);
        newCode.setLastUpdatedByAdmin(adminUser);
        repository.save(newCode);
        return new UnitAssociationCodeResponseDTO(code, now.plusHours(24));
    }

    @Transactional
    public void activateCode(String code, String email, DocumentTypeEnum docType) {
        UnitAssociationCode associationCode = repository.findByCode(code)
                .orElseThrow(() -> new NoSuchElementException("Código inválido"));

        if (associationCode.getUsedBy() != null) {
            throw new IllegalStateException("Este código já foi utilizado.");
        }

        OffsetDateTime baseTime = associationCode.getUpdatedAt() != null
                ? associationCode.getUpdatedAt()
                : associationCode.getCreatedAt();

        if (baseTime.plusHours(24).isBefore(OffsetDateTime.now())) {
            throw new IllegalStateException("Código expirado");
        }

        Unit unit = associationCode.getUnit();

        if (docType == DocumentTypeEnum.CPF && unit instanceof ResidentialUnit residentialUnit) {
            if (residentialUnit.getOwner() != null) {
                throw new IllegalStateException("Esta unidade já está associada a um proprietário. Remova a associação atual para continuar.");
            }
            ResidentialOwnerUser owner = residentialReadService.findByEmail(email);
            residentialUpdateService.addUnit(owner, residentialUnit);
            associationCode.setUsedBy(owner);

        } else if (docType == DocumentTypeEnum.CNPJ && unit instanceof EnterpriseUnit enterpriseUnit) {
            if (enterpriseUnit.getOwner() != null) {
                throw new IllegalStateException("Esta unidade já está associada a uma empresa. Remova a associação atual para continuar.");
            }
            EnterpriseOwnerUser owner = enterpriseReadService.findByEmail(email);
            enterpriseUpdateService.addUnit(owner, enterpriseUnit);
            associationCode.setUsedBy(owner);

        } else {
            throw new IllegalArgumentException("Tipo de documento e unidade não são compatíveis");
        }

        repository.save(associationCode);
    }
}
