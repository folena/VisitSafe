package br.com.visitsafe.service.unit;

import br.com.visitsafe.dto.unit.UnitUpdateRequestDTO;
import br.com.visitsafe.model.Address;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.repository.unit.UnitRepository;
import br.com.visitsafe.validation.impl.AdminBelongsToCondoValidator;
import br.com.visitsafe.validation.impl.UnitWithoutOwnerValidator;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UnitUpdateService {

    private final UnitRepository unitRepository;
    private final AdminBelongsToCondoValidator adminCondoValidator;
    private final UnitWithoutOwnerValidator    ownerValidator;
    
    @Transactional
    public Unit updateUnit(UnitUpdateRequestDTO dto, AdminUser adminUser) {
        Unit unit = unitRepository.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Unidade não encontrada"));

        adminCondoValidator.validate(new AdminBelongsToCondoValidator.Context(unit, adminUser));
        ownerValidator.validate(unit);

        unit.setBlock(dto.getBlock());
        unit.setLot(dto.getLot());
        unit.setAddress(new Address(
            dto.getAddress().getStreet(),
            dto.getAddress().getNeighborhood(),
            dto.getAddress().getCity(),
            dto.getAddress().getState(),
            dto.getAddress().getZipCode(),
            dto.getAddress().getComplement()
        ));

        return unitRepository.save(unit);
    }

}
