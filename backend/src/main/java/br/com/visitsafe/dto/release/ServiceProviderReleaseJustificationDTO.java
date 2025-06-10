package br.com.visitsafe.dto.release;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.OffsetDateTime;

@Data
public class ServiceProviderReleaseJustificationDTO {

    @NotNull
    @Schema(description = "Justification for late exit", required = true)
    private String justification;

    @Schema(description = "Base64 encoded image data")
    private String imageData;

    @Schema(description = "Image MIME type (e.g., image/jpeg, image/png)")
    private String imageType;

    @Schema(description = "Time when the resident was notified about the late exit")
    private String notificationTime;
} 