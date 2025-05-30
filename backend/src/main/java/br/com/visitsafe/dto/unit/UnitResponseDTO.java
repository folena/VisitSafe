package br.com.visitsafe.dto.unit;

import br.com.visitsafe.dto.AddressDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class UnitResponseDTO {

    @Schema(description = "ID da unidade", required = true)
    private UUID id;

    @Schema(description = "Lote da unidade", required = true)
    private String lot;

    @Schema(description = "Bloco da unidade", required = true)
    private String block;

    @Schema(description = "Endereço completo da unidade", required = true)
    private AddressDTO address;
}
