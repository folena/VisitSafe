package br.com.visitsafe.service.unit;

import br.com.visitsafe.dto.unit.ResidentialUnitResponseDTO;
import br.com.visitsafe.dto.unit.UnitCreateRequestDTO;
import br.com.visitsafe.model.Address;
import br.com.visitsafe.model.condominium.ResidentialCondominium;
import br.com.visitsafe.model.unit.ResidentialUnit;
import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.repository.unit.ResidentialUnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResidentialUnitCreateService {

    private final ResidentialUnitRepository residentialUnitRepository;

    public ResidentialUnitResponseDTO create(UnitCreateRequestDTO dto, AdminUser adminUser) {
        Address address = Address.builder()
                .street(dto.getAddress().getStreet())
                .neighborhood(dto.getAddress().getNeighborhood())
                .city(dto.getAddress().getCity())
                .state(dto.getAddress().getState())
                .zipCode(dto.getAddress().getZipCode())
                .complement(dto.getAddress().getComplement())
                .build();

        ResidentialUnit unit = new ResidentialUnit();
        unit.setLot(dto.getLot());
        unit.setBlock(dto.getBlock());
        unit.setAddress(address);
        unit.setCondominium((ResidentialCondominium) adminUser.getCondominium());
        unit.setOwner(null);

        ResidentialUnit saved = residentialUnitRepository.save(unit);
        return new ResidentialUnitResponseDTO(saved);
    }
}
