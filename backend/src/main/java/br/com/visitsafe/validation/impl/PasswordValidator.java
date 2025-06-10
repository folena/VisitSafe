package br.com.visitsafe.validation.impl;

import br.com.visitsafe.exception.PasswordInvalidException;
import br.com.visitsafe.validation.Validator;
import org.springframework.stereotype.Component;

@Component
public class PasswordValidator implements Validator<String> {

    @Override
    public void validate(String password) {
        if (password == null || password.length() < 6) {
            throw new PasswordInvalidException("A senha deve ter ao menos 6 caracteres.");
        }
    }
}
