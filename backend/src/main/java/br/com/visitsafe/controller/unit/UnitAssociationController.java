package br.com.visitsafe.controller.unit;

import br.com.visitsafe.dto.unit.UnitAssociationCodeResponseDTO;
import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.model.user.User;
import br.com.visitsafe.service.unit.UnitAssociationCodeService;
import br.com.visitsafe.service.user.AdminUserReadService;
import br.com.visitsafe.service.user.UserQueryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/units/associate")
@RequiredArgsConstructor
@Tag(name = "Unit Association", description = "Endpoints for generating and activating unit association codes")
public class UnitAssociationController {

    private final UnitAssociationCodeService associationService;
    private final AdminUserReadService adminUserReadService;
    private final UserQueryService userQueryService;

    @PostMapping("/activate")
    @Operation(summary = "Activate a unit association code", description = "Link a unit to an owner using a code and email")
    public ResponseEntity<Void> activateUnitAssociationCode(
        @RequestParam String code,
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        User user = userQueryService.findByEmail(userDetails.getUsername());
        associationService.activateCode(code, user.getAccount().getEmail(), user.getDocumentType());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/generate/{unitId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Generate or retrieve an active association code for a unit",
               description = "Returns a valid code to associate a unit. If one already exists and is valid, it will be returned.")
    public ResponseEntity<UnitAssociationCodeResponseDTO> generateUnitAssociationCode(
        @PathVariable UUID unitId,
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        AdminUser adminUser = adminUserReadService.findByEmail(userDetails.getUsername());
        UnitAssociationCodeResponseDTO response = associationService.generateCodeByType(unitId, adminUser);
        return ResponseEntity.ok(response);
    }

    
}
