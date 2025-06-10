package br.com.visitsafe.controller.unit;

import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.service.unit.UnitDeleteService;
import br.com.visitsafe.service.user.AdminUserReadService;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/units")
@RequiredArgsConstructor
public class UnitDeleteController {

    private final UnitDeleteService unitDeleteService;
    private final AdminUserReadService adminUserReadService;

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUnit(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        AdminUser adminUser = adminUserReadService.findByEmail(userDetails.getUsername());
        unitDeleteService.deleteUnit(id, adminUser);
        return ResponseEntity.noContent().build();
    }
}
