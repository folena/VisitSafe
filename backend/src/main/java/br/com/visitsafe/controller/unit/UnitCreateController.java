package br.com.visitsafe.controller.unit;

import br.com.visitsafe.dto.unit.UnitCreateRequestDTO;
import br.com.visitsafe.model.condominium.EnterpriseCondominium;
import br.com.visitsafe.model.condominium.ResidentialCondominium;
import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.service.unit.EnterpriseUnitCreateService;
import br.com.visitsafe.service.unit.ResidentialUnitCreateService;
import br.com.visitsafe.service.user.AdminUserReadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/units")
@RequiredArgsConstructor
public class UnitCreateController {

    private final ResidentialUnitCreateService residentialService;
    private final EnterpriseUnitCreateService enterpriseService;
    private final AdminUserReadService adminUserReadService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createUnit(
            @Valid @RequestBody UnitCreateRequestDTO dto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        AdminUser adminUser = adminUserReadService.findByEmail(userDetails.getUsername());

        if (adminUser == null || adminUser.getCondominium() == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Admin inválido ou sem condomínio associado.");
        }

        var condominium = adminUser.getCondominium();

        if (condominium instanceof ResidentialCondominium) {
            var unit = residentialService.create(dto, adminUser);
            return ResponseEntity.ok(unit);
        } else if (condominium instanceof EnterpriseCondominium) {
            var unit = enterpriseService.create(dto, adminUser);
            return ResponseEntity.ok(unit);
        } else {
            return ResponseEntity.badRequest().body("Tipo de condomínio não suportado.");
        }
    }
}
