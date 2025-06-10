package br.com.visitsafe.dto.release;

import br.com.visitsafe.model.enums.ReleaseStatusEnum;
import br.com.visitsafe.model.release.DeliveryRelease;
import br.com.visitsafe.model.release.DriverRelease;
import br.com.visitsafe.model.release.FamilyRelease;
import br.com.visitsafe.model.release.GuestRelease;
import br.com.visitsafe.model.release.Release;
import br.com.visitsafe.model.release.ServiceProviderRelease;
import br.com.visitsafe.model.visitor.Visitor;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReleaseSummaryResponseDTO {

    @Schema(description = "ID da liberação", required = true)
    private UUID id;

    @Schema(description = "Nome do visitante", required = true)
    private String visitorName;

    @Schema(description = "Documento do visitante", required = true)
    private String visitorDocument;

    @Schema(description = "Tipo da liberação (e.g. GUEST, FAMILY, DELIVERY)", required = true)
    private String releaseType;

    @Schema(description = "Status atual da liberação", required = true)
    private ReleaseStatusEnum status;

    @Schema(description = "Data inicial da validade da liberação", required = true)
    private LocalDate validFrom;

    @Schema(description = "Data final da validade da liberação", required = true)
    private LocalDate validUntil;

    @Schema(description = "Horário permitido de entrada por dia", required = true)
    private LocalTime dailyStart;

    @Schema(description = "Horário permitido de saída por dia", required = true)
    private LocalTime dailyEnd;

    public static ReleaseSummaryResponseDTO fromEntity(Release release) {
        Visitor visitor = null;

        if (release instanceof GuestRelease r) {
            visitor = r.getVisitor();
        } else if (release instanceof FamilyRelease r) {
            visitor = r.getVisitor();
        } else if (release instanceof DriverRelease r) {
            visitor = r.getVisitor();
        } else if (release instanceof DeliveryRelease r) {
            visitor = r.getVisitor();
        } else if (release instanceof ServiceProviderRelease r) {
            visitor = r.getVisitor();
        }

        return ReleaseSummaryResponseDTO.builder()
                .id(release.getId())
                .visitorName(visitor != null ? visitor.getName() : null)
                .visitorDocument(visitor != null ? visitor.getDocument() : null)
                .releaseType(release.getClass().getSimpleName().replace("Release", "").toUpperCase())
                .status(release.getStatus())
                .validFrom(release.getValidFrom())
                .validUntil(release.getValidUntil())
                .dailyStart(release.getDailyStart())
                .dailyEnd(release.getDailyEnd())
                .build();
    }
}
