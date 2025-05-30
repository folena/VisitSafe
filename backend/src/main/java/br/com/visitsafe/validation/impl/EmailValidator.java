package br.com.visitsafe.validation.impl;

import br.com.visitsafe.exception.EmailInvalidException;
import br.com.visitsafe.validation.Validator;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class EmailValidator implements Validator<String> {

    private static final Pattern EMAIL_REGEX = Pattern.compile(
            "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
    );

    @Override
    public void validate(String email) {
        if (email == null || !EMAIL_REGEX.matcher(email).matches()) {
            throw new EmailInvalidException("E-mail inválido.");
        }
    }
}
