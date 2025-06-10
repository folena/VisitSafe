package br.com.visitsafe.controller.release;

import br.com.visitsafe.dto.release.DeliveryReleaseCreateRequestDTO;
import br.com.visitsafe.dto.release.DeliveryReleaseUpdateRequestDTO;
import br.com.visitsafe.dto.release.ReleaseResponseDTO;
import br.com.visitsafe.model.enums.ReleaseTypeEnum;
import br.com.visitsafe.model.release.DeliveryRelease;
import br.com.visitsafe.service.release.DeliveryReleaseCreateService;
import br.com.visitsafe.service.release.DeliveryReleaseUpdateService;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/releases/delivery")
@RequiredArgsConstructor
public class DeliveryReleaseController {

    private final DeliveryReleaseCreateService releaseService;
    private final DeliveryReleaseUpdateService  updateService;

    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public ReleaseResponseDTO createDeliveryRelease(@RequestBody DeliveryReleaseCreateRequestDTO dto) {
        DeliveryRelease deliveryRelease = releaseService.create(dto);
        return new ReleaseResponseDTO(
            deliveryRelease.getId(),
            deliveryRelease.getValidFrom(),
            deliveryRelease.getValidUntil(),
            deliveryRelease.getDailyStart(),
            deliveryRelease.getDailyEnd(),
            ReleaseTypeEnum.DELIVERY
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ReleaseResponseDTO updateDeliveryRelease(@PathVariable UUID id,
                                     @RequestBody DeliveryReleaseUpdateRequestDTO dto) {
        DeliveryRelease updatDeliveryRelease = updateService.update(id, dto);
        return new ReleaseResponseDTO(
            updatDeliveryRelease.getId(),
            updatDeliveryRelease.getValidFrom(),
            updatDeliveryRelease.getValidUntil(),
            updatDeliveryRelease.getDailyStart(),
            updatDeliveryRelease.getDailyEnd(),
            ReleaseTypeEnum.DELIVERY
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public void deleteDeliveryRelease(@PathVariable UUID id) {
        updateService.delete(id);
    }

}
