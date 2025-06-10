package br.com.visitsafe.dto.unit;

import br.com.visitsafe.dto.AddressDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class UnitUpdateRequestDTO {

    @NotNull
    private UUID id;

    @NotBlank
    private String block;

    @NotBlank
    private String lot;

    @NotNull
    @Valid
    private AddressDTO address;
}
