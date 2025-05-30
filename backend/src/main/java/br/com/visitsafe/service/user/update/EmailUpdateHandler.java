package br.com.visitsafe.service.user.update;

import br.com.visitsafe.dto.user.UserUpdateRequestDTO;
import br.com.visitsafe.model.user.User;
import br.com.visitsafe.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailUpdateHandler implements UserUpdateFieldHandler {

    private final Validator<String> emailValidator;

    @Override
    public void handle(User user, UserUpdateRequestDTO dto) {
        if (dto.getEmail() != null) {
            emailValidator.validate(dto.getEmail());
            user.getAccount().setEmail(dto.getEmail());
        }
    }
}
