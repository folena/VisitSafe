package br.com.visitsafe.controller.release;

import br.com.visitsafe.dto.release.ReleaseResponseDTO;
import br.com.visitsafe.dto.release.ServiceProviderReleaseCreateRequestDTO;
import br.com.visitsafe.dto.release.ServiceProviderReleaseUpdateRequestDTO;
import br.com.visitsafe.dto.release.ReleaseSummaryResponseDTO;
import br.com.visitsafe.model.enums.ReleaseTypeEnum;
import br.com.visitsafe.model.release.ServiceProviderRelease;
import br.com.visitsafe.service.release.ServiceProviderReleaseApprovalService;
import br.com.visitsafe.service.release.ServiceProviderReleaseCreateService;
import br.com.visitsafe.service.release.ServiceProviderReleaseUpdateService;
import br.com.visitsafe.service.release.ServiceProviderReleaseReadService;
import lombok.RequiredArgsConstructor;

import java.util.UUID;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/releases/service-provider")
@RequiredArgsConstructor
public class ServiceProviderReleaseController {

    private final ServiceProviderReleaseCreateService releaseService;
    private final ServiceProviderReleaseUpdateService updateService;
    private final ServiceProviderReleaseApprovalService approvalService;
    private final ServiceProviderReleaseReadService readService;

    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public ReleaseResponseDTO createServiceProviderRelease(@RequestBody ServiceProviderReleaseCreateRequestDTO dto) {
        ServiceProviderRelease serviceProviderRelease = releaseService.create(dto);
        return new ReleaseResponseDTO(
            serviceProviderRelease.getId(),
            serviceProviderRelease.getValidFrom(),
            serviceProviderRelease.getValidUntil(),
            serviceProviderRelease.getDailyStart(),
            serviceProviderRelease.getDailyEnd(),
            ReleaseTypeEnum.SERVICEPROVIDER
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ReleaseResponseDTO updateServiceProviderRelease(@PathVariable UUID id,
                                     @RequestBody ServiceProviderReleaseUpdateRequestDTO dto) {
        ServiceProviderRelease updatServiceProviderRelease = updateService.update(id, dto);
        return new ReleaseResponseDTO(
            updatServiceProviderRelease.getId(),
            updatServiceProviderRelease.getValidFrom(),
            updatServiceProviderRelease.getValidUntil(),
            updatServiceProviderRelease.getDailyStart(),
            updatServiceProviderRelease.getDailyEnd(),
            ReleaseTypeEnum.SERVICEPROVIDER
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public void deleteServiceProviderRelease(@PathVariable UUID id) {
        updateService.delete(id);
    }

    // Aprovação pelo morador (OWNER)
    @PutMapping("/{id}/approval")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Void> approveServiceProviderRelease(
        @PathVariable UUID id,
        @RequestParam boolean approve
    ) {
        approvalService.approve(id, approve);
        return ResponseEntity.ok().build();
    }

    // Justificativa pelo prestador (SERVICE_PROVIDER)
    @PutMapping("/{id}/justification")
    @PreAuthorize("hasRole('SERVICE_PROVIDER')")
    public ResponseEntity<Void> justifyServiceProviderRelease(
        @PathVariable UUID id,
        @RequestBody String justification
    ) {
        approvalService.submitJustification(id, justification);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('OWNER', 'EMPLOYEE', 'SERVICE_PROVIDER')")
    public ReleaseSummaryResponseDTO getServiceProviderRelease(@PathVariable UUID id) {
        return readService.findById(id);
    }

    @PostMapping("/{id}/entry")
    @PreAuthorize("hasRole('SERVICE_PROVIDER')")
    public ResponseEntity<Void> recordEntry(@PathVariable UUID id) {
        approvalService.recordEntry(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/exit")
    @PreAuthorize("hasRole('SERVICE_PROVIDER')")
    public ResponseEntity<Void> recordExit(
        @PathVariable UUID id,
        @RequestBody(required = false) Map<String, String> data
    ) {
        approvalService.recordExit(id, data);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/notify")
    @PreAuthorize("hasRole('SERVICE_PROVIDER')")
    public ResponseEntity<Void> notifyResident(@PathVariable UUID id) {
        approvalService.notifyResident(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/approve")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Void> approveLateExit(
        @PathVariable UUID id,
        @RequestParam boolean approve
    ) {
        approvalService.approveLateExit(id, approve);
        return ResponseEntity.ok().build();
    }
}
