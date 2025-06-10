package br.com.visitsafe.validation.impl;

import br.com.visitsafe.model.unit.EnterpriseUnit;
import br.com.visitsafe.model.unit.ResidentialUnit;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.validation.Validator;
import org.springframework.stereotype.Component;

@Component
public class UnitWithoutOwnerValidator implements Validator<Unit> { // <- T = Unit

    @Override
    public void validate(Unit unit) {
        boolean hasOwner =
                (unit instanceof ResidentialUnit ru && ru.getOwner() != null)
             || (unit instanceof EnterpriseUnit eu && eu.getOwner() != null);

        if (hasOwner) {
            throw new IllegalStateException("A unidade já possui um proprietário associado.");
        }
    }
}
