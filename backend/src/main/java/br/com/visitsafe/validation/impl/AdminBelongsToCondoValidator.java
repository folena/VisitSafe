package br.com.visitsafe.validation.impl;

import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.validation.Validator;
import org.springframework.stereotype.Component;

@Component
public class AdminBelongsToCondoValidator
        implements Validator<AdminBelongsToCondoValidator.Context> { // <- T = Context

    public record Context(Unit unit, AdminUser admin) {}

    @Override
    public void validate(Context ctx) {
        if (!ctx.unit().getCondominium().getId()
                   .equals(ctx.admin().getCondominium().getId())) {
            throw new SecurityException("Admin não pertence ao mesmo condomínio da unidade.");
        }
    }
}
