package br.com.visitsafe.dto.unit;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
public class UnitAssociationCodeResponseDTO {

    @Schema(description = "Código de associação", required = true, example = "AB12CD34")
    private String code;

    @Schema(description = "Data e hora de expiração do código", required = true, example = "2025-05-12T18:00:00Z")
    private OffsetDateTime expiresAt;
}
