package br.com.visitsafe.service.unit;

import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.repository.unit.UnitAssociationCodeRepository;
import br.com.visitsafe.repository.unit.UnitRepository;
import br.com.visitsafe.validation.impl.AdminBelongsToCondoValidator;
import br.com.visitsafe.validation.impl.UnitWithoutOwnerValidator;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UnitDeleteService {

    private final UnitRepository unitRepo;
    private final UnitAssociationCodeRepository codeRepo;

    private final UnitWithoutOwnerValidator ownerValidator;
    private final AdminBelongsToCondoValidator adminCondoValidator;

    @Transactional
    public void deleteUnit(UUID id, AdminUser adminUser) {
        Unit unit = unitRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Unidade não encontrada"));

        adminCondoValidator.validate(new AdminBelongsToCondoValidator.Context(unit, adminUser));
        ownerValidator.validate(unit);

        unit.getCondominium().getUnits().remove(unit);
        unit.setCondominium(null);

        codeRepo.deleteAllByUnit(unit);
        unitRepo.delete(unit);
    }
}
