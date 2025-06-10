package br.com.visitsafe.service.unit;

import br.com.visitsafe.dto.unit.EnterpriseUnitResponseDTO;
import br.com.visitsafe.dto.unit.UnitCreateRequestDTO;
import br.com.visitsafe.model.Address;
import br.com.visitsafe.model.condominium.EnterpriseCondominium;
import br.com.visitsafe.model.unit.EnterpriseUnit;
import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.repository.unit.EnterpriseUnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnterpriseUnitCreateService {

    private final EnterpriseUnitRepository unitRepo;

    public EnterpriseUnitResponseDTO create(UnitCreateRequestDTO dto, AdminUser adminUser) {
        Address address = Address.builder()
                .street(dto.getAddress().getStreet())
                .neighborhood(dto.getAddress().getNeighborhood())
                .city(dto.getAddress().getCity())
                .state(dto.getAddress().getState())
                .zipCode(dto.getAddress().getZipCode())
                .complement(dto.getAddress().getComplement())
                .build();

        EnterpriseUnit unit = new EnterpriseUnit();
        unit.setLot(dto.getLot());
        unit.setBlock(dto.getBlock());
        unit.setAddress(address);
        unit.setCondominium((EnterpriseCondominium) adminUser.getCondominium());
        unit.setOwner(null);

        EnterpriseUnit saved = unitRepo.save(unit);
        return new EnterpriseUnitResponseDTO(saved);
    }
}
