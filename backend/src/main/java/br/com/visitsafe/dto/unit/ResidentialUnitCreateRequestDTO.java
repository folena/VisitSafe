package br.com.visitsafe.dto.unit;

import br.com.visitsafe.model.Address;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResidentialUnitCreateRequestDTO {
    @NotBlank
    private String lot;

    @NotBlank
    private String block;
    
    @NotNull
    private Address address;
}
