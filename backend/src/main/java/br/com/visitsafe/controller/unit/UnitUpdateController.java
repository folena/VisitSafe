package br.com.visitsafe.controller.unit;

import br.com.visitsafe.dto.AddressDTO;
import br.com.visitsafe.dto.unit.UnitResponseDTO;
import br.com.visitsafe.dto.unit.UnitUpdateRequestDTO;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.service.unit.UnitUpdateService;
import br.com.visitsafe.service.user.AdminUserReadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/units")
@RequiredArgsConstructor
public class UnitUpdateController {

    private final UnitUpdateService unitUpdateService;
    private final AdminUserReadService adminUserReadService;

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UnitResponseDTO> updateUnit(
            @RequestBody @Valid UnitUpdateRequestDTO dto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        AdminUser adminUser = adminUserReadService.findByEmail(userDetails.getUsername());
        Unit updated = unitUpdateService.updateUnit(dto, adminUser);
        return ResponseEntity.ok(
            new UnitResponseDTO(updated.getId(), updated.getLot(), updated.getBlock(), new AddressDTO(updated.getAddress()))
        );
    }
}