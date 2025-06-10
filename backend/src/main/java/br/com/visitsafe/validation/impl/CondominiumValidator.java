package br.com.visitsafe.validation.impl;

import br.com.visitsafe.exception.CondominiumInvalidException;
import br.com.visitsafe.model.condominium.Condominium;
import br.com.visitsafe.validation.Validator;
import org.springframework.stereotype.Component;

@Component
public class CondominiumValidator implements Validator<Condominium> {

    @Override
    public void validate(Condominium condominium) {
        if (condominium == null) {
            throw new CondominiumInvalidException("O condomínio associado é obrigatório.");
        }
    }
}
