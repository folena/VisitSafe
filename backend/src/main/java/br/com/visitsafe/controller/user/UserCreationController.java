package br.com.visitsafe.controller.user;

import br.com.visitsafe.dto.user.AdminUserCreateRequestDTO;
import br.com.visitsafe.dto.user.AdminUserResponseDTO;
import br.com.visitsafe.dto.user.EmployeeUserCreateRequestDTO;
import br.com.visitsafe.dto.user.EmployeeUserResponseDTO;
import br.com.visitsafe.dto.user.EnterpriseOwnerUserCreateRequestDTO;
import br.com.visitsafe.dto.user.EnterpriseOwnerUserResponseDTO;
import br.com.visitsafe.dto.user.ResidentialOwnerUserCreateRequestDTO;
import br.com.visitsafe.dto.user.ResidentialOwnerUserResponseDTO;
import br.com.visitsafe.model.user.*;
import br.com.visitsafe.service.user.UserCreateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/create")
@RequiredArgsConstructor
@Tag(name = "User Creation", description = "Endpoints for creating different types of users")
public class UserCreationController {

    private final UserCreateService userCreationService;

    @PostMapping("/admin")
    @Operation(summary = "Create an Admin User")
    @PreAuthorize("hasRole('ADMIN')")
    public AdminUserResponseDTO createAdmin(@RequestBody AdminUserCreateRequestDTO request) {
        AdminUser user = userCreationService.createAdminUser(
                request.getName(),
                request.getRawDocumentNumber(),
                request.getDocumentType(),
                request.getAccount(),
                request.getCondominium()
        );
        return new AdminUserResponseDTO(user.getName(), user.getAccount().getEmail());
    }

    @PostMapping("/employee")
    @Operation(summary = "Create an Employee User")
    @PreAuthorize("hasRole('ADMIN')")
    public EmployeeUserResponseDTO createEmployee(@RequestBody EmployeeUserCreateRequestDTO request) {
        EmployeeUser user = userCreationService.createEmployeeUser(
                request.getName(),
                request.getRawDocumentNumber(),
                request.getDocumentType(),
                request.getAccount(),
                request.getCondominium()
        );
        return new EmployeeUserResponseDTO(user.getName(), user.getAccount().getEmail());
    }

    @PostMapping("/enterprise-owner")
    @Operation(summary = "Create an Enterprise Owner User")
    public EnterpriseOwnerUserResponseDTO createEnterpriseOwner(@RequestBody EnterpriseOwnerUserCreateRequestDTO request) {
        EnterpriseOwnerUser user = userCreationService.createEnterpriseOwnerUser(
                request.getName(),
                request.getRawDocumentNumber(),
                request.getDocumentType(),
                request.getAccount()
        );
        return new EnterpriseOwnerUserResponseDTO(user.getName(), user.getAccount().getEmail());
    }

    @PostMapping("/residential-owner")
    @Operation(summary = "Create a Residential Owner User")
    public ResidentialOwnerUserResponseDTO createResidentialOwner(@RequestBody ResidentialOwnerUserCreateRequestDTO request) {
        ResidentialOwnerUser user = userCreationService.createResidentialOwnerUser(
                request.getName(),
                request.getRawDocumentNumber(),
                request.getDocumentType(),
                request.getAccount()
        );
        return new ResidentialOwnerUserResponseDTO(user.getName(), user.getAccount().getEmail());
    }
} 
