package br.com.visitsafe.controller.release;

import br.com.visitsafe.dto.release.FamilyReleaseCreateRequestDTO;
import br.com.visitsafe.dto.release.FamilyReleaseUpdateRequestDTO;
import br.com.visitsafe.dto.release.ReleaseResponseDTO;
import br.com.visitsafe.model.enums.ReleaseTypeEnum;
import br.com.visitsafe.model.release.FamilyRelease;
import br.com.visitsafe.service.release.FamilyReleaseCreateService;
import br.com.visitsafe.service.release.FamilyReleaseUpdateService;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/releases/family")
@RequiredArgsConstructor
public class FamilyReleaseController {

    private final FamilyReleaseCreateService releaseService;
    private final FamilyReleaseUpdateService  updateService;

    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public ReleaseResponseDTO createFamilyRelease(@RequestBody FamilyReleaseCreateRequestDTO dto) {
        FamilyRelease familyRelease = releaseService.create(dto);
        return new ReleaseResponseDTO(
            familyRelease.getId(),
            familyRelease.getValidFrom(),
            familyRelease.getValidUntil(),
            familyRelease.getDailyStart(),
            familyRelease.getDailyEnd(),
            ReleaseTypeEnum.FAMILY
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ReleaseResponseDTO updateFamilyRelease(@PathVariable UUID id,
                                     @RequestBody FamilyReleaseUpdateRequestDTO dto) {
        FamilyRelease updatedFamilyRelease = updateService.update(id, dto);
        return new ReleaseResponseDTO(
            updatedFamilyRelease.getId(),
            updatedFamilyRelease.getValidFrom(),
            updatedFamilyRelease.getValidUntil(),
            updatedFamilyRelease.getDailyStart(),
            updatedFamilyRelease.getDailyEnd(),
            ReleaseTypeEnum.FAMILY
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public void deleteFamilyRelease(@PathVariable UUID id) {
        updateService.delete(id);
    }
}
