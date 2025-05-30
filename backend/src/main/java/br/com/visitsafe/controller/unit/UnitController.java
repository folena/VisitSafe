package br.com.visitsafe.controller.unit;

import br.com.visitsafe.dto.AddressDTO;
import br.com.visitsafe.dto.unit.UnitResponseDTO;
import br.com.visitsafe.model.Address;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.service.unit.UnitQueryService;
import br.com.visitsafe.service.user.AdminUserReadService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/units")
@RequiredArgsConstructor
public class UnitController {

    private final UnitQueryService unitQueryService;
    private final AdminUserReadService adminUserReadService;

    @GetMapping
    @PreAuthorize("hasRole('OWNER')")
    public List<UnitResponseDTO> listMyUnits(@AuthenticationPrincipal UserDetails user) {
        String email = user.getUsername();
        List<Unit> units = unitQueryService.findAllUnitsByOwnerEmail(email);
        
        return units.stream()
                .map(this::toUnitResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<UnitResponseDTO> listAllUnitsFromMyCondominium(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        AdminUser adminUser = adminUserReadService.findByEmail(userDetails.getUsername());

        if (adminUser == null || adminUser.getCondominium() == null) {
            throw new IllegalArgumentException("Admin inválido ou sem condomínio associado.");
        }

        Page<Unit> units = unitQueryService.findAllByAdminCondominium(adminUser, page, size);

        return units.map(this::toUnitResponseDTO);
    }

    private UnitResponseDTO toUnitResponseDTO(Unit unit) {
        Address address = unit.getAddress();
        AddressDTO addressDTO = AddressDTO.builder()
                .street(address.getStreet())
                .neighborhood(address.getNeighborhood())
                .city(address.getCity())
                .state(address.getState())
                .zipCode(address.getZipCode())
                .complement(address.getComplement())
                .build();

        return new UnitResponseDTO(unit.getId(), unit.getLot(), unit.getBlock(), addressDTO);
    }
}
