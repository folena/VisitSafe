package br.com.visitsafe.controller.release;

import br.com.visitsafe.dto.release.DriverReleaseCreateRequestDTO;
import br.com.visitsafe.dto.release.DriverReleaseUpdateRequestDTO;
import br.com.visitsafe.dto.release.ReleaseResponseDTO;
import br.com.visitsafe.model.enums.ReleaseTypeEnum;
import br.com.visitsafe.model.release.DriverRelease;
import br.com.visitsafe.service.release.DriverReleaseCreateService;
import br.com.visitsafe.service.release.DriverReleaseUpdateService;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/releases/driver")
@RequiredArgsConstructor
public class DriverReleaseController {

    private final DriverReleaseCreateService releaseService;
    private final DriverReleaseUpdateService updateService;

    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public ReleaseResponseDTO createDriverRelease(@RequestBody DriverReleaseCreateRequestDTO dto) {
        DriverRelease driverRelease = releaseService.create(dto);
        return new ReleaseResponseDTO(
            driverRelease.getId(),
            driverRelease.getValidFrom(),
            driverRelease.getValidUntil(),
            driverRelease.getDailyStart(),
            driverRelease.getDailyEnd(),
            ReleaseTypeEnum.DRIVER
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ReleaseResponseDTO updateDriverRelease(@PathVariable UUID id,
                                     @RequestBody DriverReleaseUpdateRequestDTO dto) {
        DriverRelease updatedDriverRelease = updateService.update(id, dto);
        return new ReleaseResponseDTO(
            updatedDriverRelease.getId(),
            updatedDriverRelease.getValidFrom(),
            updatedDriverRelease.getValidUntil(),
            updatedDriverRelease.getDailyStart(),
            updatedDriverRelease.getDailyEnd(),
            ReleaseTypeEnum.DRIVER
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public void deleteDriverRelease(@PathVariable UUID id) {
        updateService.delete(id);
    }
}
