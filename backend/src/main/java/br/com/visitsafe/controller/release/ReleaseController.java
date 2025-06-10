package br.com.visitsafe.controller.release;

import br.com.visitsafe.dto.release.ReleaseSummaryResponseDTO;
import br.com.visitsafe.model.enums.ReleaseStatusEnum;
import br.com.visitsafe.model.user.EmployeeUser;
import br.com.visitsafe.model.user.User;
import br.com.visitsafe.service.release.ReleaseReadService;
import br.com.visitsafe.service.release.ReleaseStatusUpdateService;
import br.com.visitsafe.service.user.UserQueryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/releases")
@RequiredArgsConstructor
public class ReleaseController {

    private final ReleaseStatusUpdateService releaseStatusUpdateService;
    private final ReleaseReadService releaseReadService;
    private final UserQueryService userQueryService;

    @GetMapping("/my")
    @Operation(summary = "Listar liberações da minha unidade por período")
    @PreAuthorize("hasRole('OWNER')")
    public List<ReleaseSummaryResponseDTO> listMyReleasesByPeriod(
            @RequestParam UUID propertyId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User owner = userQueryService.findByEmail(userDetails.getUsername());
        return releaseReadService.findByOwnerAndPeriod(owner, propertyId, startDate, endDate);
    }

    @PostMapping("/{id}/checkin")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Void> checkinRelease(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        EmployeeUser employee = (EmployeeUser) userQueryService.findByEmail(userDetails.getUsername());
        releaseStatusUpdateService.checkin(id, employee);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/checkout")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Void> checkoutRelease(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        EmployeeUser employee = (EmployeeUser) userQueryService.findByEmail(userDetails.getUsername());
        releaseStatusUpdateService.checkout(id, employee);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/cancel")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Void> cancelRelease(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        EmployeeUser employee = (EmployeeUser) userQueryService.findByEmail(userDetails.getUsername());
        releaseStatusUpdateService.cancel(id, employee);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/today/pending")
    @Operation(summary = "Listar liberações PENDENTES de hoje do meu condomínio")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public Page<ReleaseSummaryResponseDTO> getAllPendingToday(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        EmployeeUser employee = (EmployeeUser) userQueryService.findByEmail(userDetails.getUsername());
        return releaseReadService.findAllTodayByCondominiumAndStatus(
                employee, ReleaseStatusEnum.PENDING_CHECKIN, PageRequest.of(page, size)
        );
    }

    @GetMapping("/today/checked-in")
    @Operation(summary = "Listar liberações CHECKED-IN de hoje do meu condomínio")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public Page<ReleaseSummaryResponseDTO> getAllCheckedInToday(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        EmployeeUser employee = (EmployeeUser) userQueryService.findByEmail(userDetails.getUsername());
        return releaseReadService.findAllTodayByCondominiumAndStatus(
                employee, ReleaseStatusEnum.CHECKED_IN, PageRequest.of(page, size)
        );
    }

    @GetMapping("/today/checked-out")
    @Operation(summary = "Listar liberações FINALIZADAS de hoje do meu condomínio")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public Page<ReleaseSummaryResponseDTO> getAllCheckedOutToday(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        EmployeeUser employee = (EmployeeUser) userQueryService.findByEmail(userDetails.getUsername());
        return releaseReadService.findAllTodayByCondominiumAndStatus(
                employee, ReleaseStatusEnum.COMPLETED, PageRequest.of(page, size)
        );
    }

    @GetMapping("/today/canceled")
    @Operation(summary = "Listar liberações CANCELADAS de hoje do meu condomínio")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public Page<ReleaseSummaryResponseDTO> getAllCanceledToday(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        EmployeeUser employee = (EmployeeUser) userQueryService.findByEmail(userDetails.getUsername());
        return releaseReadService.findAllTodayByCondominiumAndStatus(
                employee, ReleaseStatusEnum.UNAUTHORIZED, PageRequest.of(page, size)
        );
    }
}
