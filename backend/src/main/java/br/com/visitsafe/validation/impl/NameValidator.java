package br.com.visitsafe.validation.impl;

import br.com.visitsafe.exception.NameInvalidException;
import br.com.visitsafe.validation.Validator;
import org.springframework.stereotype.Component;

@Component
public class NameValidator implements Validator<String> {

    @Override
    public void validate(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new NameInvalidException("Nome não pode estar vazio.");
        }
    }
}
