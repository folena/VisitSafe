package br.com.visitsafe.controller.release;

import br.com.visitsafe.dto.release.ServiceProviderReleaseJustificationDTO;
import br.com.visitsafe.service.release.ServiceProviderReleaseExceptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/releases/service-provider-exception")
@RequiredArgsConstructor
@Tag(name = "Service Provider Release Exception", description = "Endpoints for handling exceptional cases in service provider releases")
public class ServiceProviderReleaseExceptionController {

    private final ServiceProviderReleaseExceptionService exceptionService;

    @PostMapping("/{id}/entry")
    @PreAuthorize("hasRole('EMPLOYEE')")
    @Operation(summary = "Record service provider entry")
    public ResponseEntity<Void> recordEntry(@PathVariable UUID id) {
        exceptionService.recordEntry(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/exit")
    @PreAuthorize("hasRole('EMPLOYEE')")
    @Operation(summary = "Record service provider exit")
    public ResponseEntity<Void> recordExit(
        @PathVariable UUID id,
        @RequestBody(required = false) ServiceProviderReleaseJustificationDTO justification
    ) {
        exceptionService.recordExit(id, justification);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/notify-resident")
    @PreAuthorize("hasRole('EMPLOYEE')")
    @Operation(summary = "Notify resident about late exit")
    public ResponseEntity<Void> notifyResident(@PathVariable UUID id) {
        exceptionService.notifyResident(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/approve-late-exit")
    @PreAuthorize("hasRole('OWNER')")
    @Operation(summary = "Approve or reject late exit")
    public ResponseEntity<Void> approveLateExit(
        @PathVariable UUID id,
        @RequestParam boolean approve
    ) {
        exceptionService.approveLateExit(id, approve);
        return ResponseEntity.ok().build();
    }
} 