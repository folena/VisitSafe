package br.com.visitsafe.dto.unit;

import java.util.UUID;

import br.com.visitsafe.dto.user.UserResponseDTO;
import br.com.visitsafe.model.Address;
import br.com.visitsafe.model.unit.EnterpriseUnit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnterpriseUnitResponseDTO {
    private UUID id;
    private String lot;
    private String block;
    private Address address;
    private UserResponseDTO owner;

    public EnterpriseUnitResponseDTO(String lot, String block, Address address) {
        this.lot = lot;
        this.block = block;
        this.address = address;
        this.owner = null;
    }

    public EnterpriseUnitResponseDTO(EnterpriseUnit unit) {
        this.id = unit.getId();
        this.lot = unit.getLot();
        this.block = unit.getBlock();
        this.address = unit.getAddress();
        this.owner = unit.getOwner() != null
                ? new UserResponseDTO(unit.getOwner().getName(), unit.getOwner().getAccount().getEmail())
                : null;
    }
}
