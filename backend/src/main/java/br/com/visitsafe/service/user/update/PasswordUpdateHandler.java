package br.com.visitsafe.service.user.update;

import br.com.visitsafe.dto.user.UserUpdateRequestDTO;
import br.com.visitsafe.model.user.User;
import br.com.visitsafe.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PasswordUpdateHandler implements UserUpdateFieldHandler {

    private final Validator<String> passwordValidator;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void handle(User user, UserUpdateRequestDTO dto) {
        if (dto.getPassword() != null) {
            passwordValidator.validate(dto.getPassword());
            user.getAccount().setPassword(passwordEncoder.encode(dto.getPassword()));
        }
    }
}
