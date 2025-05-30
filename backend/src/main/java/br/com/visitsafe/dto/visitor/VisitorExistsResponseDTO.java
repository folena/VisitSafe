package br.com.visitsafe.dto.visitor;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VisitorExistsResponseDTO {

    @Schema(description = "Indica se o visitante existe ou nao", example = "true")
    private boolean exists;
}
