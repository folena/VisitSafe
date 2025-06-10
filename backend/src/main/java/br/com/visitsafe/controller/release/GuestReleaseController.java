package br.com.visitsafe.controller.release;

import br.com.visitsafe.dto.release.GuestReleaseCreateRequestDTO;
import br.com.visitsafe.dto.release.GuestReleaseUpdateRequestDTO;
import br.com.visitsafe.dto.release.ReleaseResponseDTO;
import br.com.visitsafe.model.enums.ReleaseTypeEnum;
import br.com.visitsafe.model.release.GuestRelease;
import br.com.visitsafe.service.release.GuestReleaseCreateService;
import br.com.visitsafe.service.release.GuestReleaseUpdateService;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/releases/guest")
@RequiredArgsConstructor
public class GuestReleaseController {

    private final GuestReleaseCreateService releaseService;
    private final GuestReleaseUpdateService  updateService;

    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public ReleaseResponseDTO createGuestRelease(@RequestBody GuestReleaseCreateRequestDTO dto) {
        GuestRelease guestRelease = releaseService.create(dto);
        return new ReleaseResponseDTO(
            guestRelease.getId(),
            guestRelease.getValidFrom(),
            guestRelease.getValidUntil(),
            guestRelease.getDailyStart(),
            guestRelease.getDailyEnd(),
            ReleaseTypeEnum.GUEST
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ReleaseResponseDTO updateGuestRelease(@PathVariable UUID id,
                                     @RequestBody GuestReleaseUpdateRequestDTO dto) {
        GuestRelease updatedGuestRelease = updateService.update(id, dto);
        return new ReleaseResponseDTO(
            updatedGuestRelease.getId(),
            updatedGuestRelease.getValidFrom(),
            updatedGuestRelease.getValidUntil(),
            updatedGuestRelease.getDailyStart(),
            updatedGuestRelease.getDailyEnd(),
            ReleaseTypeEnum.GUEST
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public void deleteGuestRelease(@PathVariable UUID id) {
        updateService.delete(id);
    }
}
