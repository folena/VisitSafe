package br.com.visitsafe.service.user.update;

import br.com.visitsafe.dto.user.UserUpdateRequestDTO;
import br.com.visitsafe.model.user.User;
import br.com.visitsafe.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NameUpdateHandler implements UserUpdateFieldHandler {

    private final Validator<String> nameValidator;

    @Override
    public void handle(User user, UserUpdateRequestDTO dto) {
        if (dto.getName() != null) {
            nameValidator.validate(dto.getName());
            user.setName(dto.getName());
        }
    }
}
