package br.com.visitsafe.controller.condominium;

import br.com.visitsafe.dto.condominium.EnterpriseCondominiumCreateRequestDTO;
import br.com.visitsafe.dto.condominium.ResidentialCondominiumCreateRequestDTO;
import br.com.visitsafe.dto.condominium.CondominiumResponseDTO;
import br.com.visitsafe.model.condominium.EnterpriseCondominium;
import br.com.visitsafe.model.condominium.ResidentialCondominium;
import br.com.visitsafe.service.condominium.EnterpriseCondominiumCreateService;
import br.com.visitsafe.service.condominium.ResidentialCondominiumCreateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/condominiums/create")
@RequiredArgsConstructor
@Tag(name = "Condominium Creation", description = "Endpoints for creating Residential and Enterprise Condominiums")
public class CondominiumCreateController {

    private final EnterpriseCondominiumCreateService enterpriseService;
    private final ResidentialCondominiumCreateService residentialService;

    @PostMapping("/enterprise")
    @Operation(summary = "Create an Enterprise Condominium")
    @PreAuthorize("hasRole('ADMIN')")
    public CondominiumResponseDTO createEnterpriseCondominium(@RequestBody @Valid EnterpriseCondominiumCreateRequestDTO request) {
        EnterpriseCondominium created = enterpriseService.create(request.getName(), request.getCnpj());
        return new CondominiumResponseDTO(
                created.getId(),
                created.getName(),
                created.getCnpj(),
                created.getCondominiumType()
        );
    }

    @PostMapping("/residential")
    @Operation(summary = "Create a Residential Condominium")
    @PreAuthorize("hasRole('ADMIN')")
    public CondominiumResponseDTO createResidentialCondominium(@RequestBody @Valid ResidentialCondominiumCreateRequestDTO request) {
        ResidentialCondominium created = residentialService.create(request.getName(), request.getCnpj());
        return new CondominiumResponseDTO(
                created.getId(),
                created.getName(),
                created.getCnpj(),
                created.getCondominiumType()
        );
    }
}
