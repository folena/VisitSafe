package br.com.visitsafe.dto.release;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import br.com.visitsafe.model.enums.ReleaseTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReleaseResponseDTO {
    UUID id;
    LocalDate validFrom;
    LocalDate validUntil;
    LocalTime dailyStart;
    LocalTime dailyEnd;
    ReleaseTypeEnum releaseType;
}
