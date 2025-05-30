package br.com.visitsafe.service.user.update;

import br.com.visitsafe.dto.user.UserUpdateRequestDTO;
import br.com.visitsafe.model.user.User;

public interface UserUpdateFieldHandler {
    void handle(User user, UserUpdateRequestDTO dto);
}
