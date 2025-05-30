package br.com.visitsafe.dto;

import br.com.visitsafe.model.Address;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDTO {

    @Schema(description = "Rua", required = true, example = "Rua das Flores")
    @NotBlank
    private String street;

    @Schema(description = "Bairro", required = true, example = "Centro")
    @NotBlank
    private String neighborhood;

    @Schema(description = "Cidade", required = true, example = "São Paulo")
    @NotBlank
    private String city;

    @Schema(description = "Estado (UF)", required = true, example = "SP")
    @NotBlank
    private String state;

    @Schema(description = "CEP", required = true, example = "01000-000")
    @NotBlank
    private String zipCode;

    @Schema(description = "Complemento (opcional)", required = false, example = "Apto 12")
    private String complement;

    public AddressDTO(Address address) {
        this.street = address.getStreet();
        this.neighborhood = address.getNeighborhood();
        this.city = address.getCity();
        this.state = address.getState();
        this.zipCode = address.getZipCode();
        this.complement = address.getComplement();
    }

}
