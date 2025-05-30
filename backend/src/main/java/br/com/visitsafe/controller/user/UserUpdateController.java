package br.com.visitsafe.controller.user;

import br.com.visitsafe.dto.user.UserUpdateRequestDTO;
import br.com.visitsafe.dto.user.UserUpdateResponseDTO;
import br.com.visitsafe.service.user.UserUpdateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/users/update")
@RequiredArgsConstructor
@Tag(name = "User Update", description = "Endpoints for updating user data")
public class UserUpdateController {

    private final UserUpdateService userUpdateService;

    @PatchMapping("/{id}")
    @Operation(summary = "Update user information")
    public UserUpdateResponseDTO updateUser(
            @PathVariable UUID id,
            @RequestBody UserUpdateRequestDTO requestDTO
    ) {
        return userUpdateService.updateUser(id, requestDTO);
    }
}
