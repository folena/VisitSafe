package br.com.visitsafe.dto.release;

import br.com.visitsafe.dto.visitor.FamilyVisitorDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
public class FamilyReleaseCreateRequestDTO {

    @NotNull
    @Schema(description = "ID da unidade", required = true)
    private UUID unitId;

    @NotNull
    @Schema(description = "Data inicial da liberação", required = true)
    private LocalDate validFrom;

    @NotNull
    @Schema(description = "Data final da liberação", required = true)
    private LocalDate validUntil;

    @NotNull
    @Schema(description = "Horário de entrada permitido por dia", required = true)
    private LocalTime dailyStart;

    @NotNull
    @Schema(description = "Horário de saída permitido por dia", required = true)
    private LocalTime dailyEnd;

    @NotNull
    @Schema(description = "Dados do visitante", required = true)
    private FamilyVisitorDTO visitor;
}
