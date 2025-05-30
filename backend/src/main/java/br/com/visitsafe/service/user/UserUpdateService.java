package br.com.visitsafe.service.user;

import br.com.visitsafe.dto.user.UserUpdateRequestDTO;
import br.com.visitsafe.dto.user.UserUpdateResponseDTO;
import br.com.visitsafe.model.user.User;
import br.com.visitsafe.service.user.update.UserUpdateFieldHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserUpdateService {

    private final UserQueryService userQueryService;
    private final List<UserUpdateFieldHandler> fieldHandlers;

    public UserUpdateResponseDTO updateUser(UUID id, UserUpdateRequestDTO dto) {
        User user = userQueryService.findById(id);

        fieldHandlers.forEach(handler -> handler.handle(user, dto));

        return new UserUpdateResponseDTO(user.getName(), user.getAccount().getEmail());
    }
}
