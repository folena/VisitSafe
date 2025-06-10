package br.com.visitsafe.validation.impl.unit;

import br.com.visitsafe.model.unit.EnterpriseUnit;
import br.com.visitsafe.model.unit.ResidentialUnit;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.user.User;
import br.com.visitsafe.validation.Validator;
import org.springframework.stereotype.Component;

@Component
public class UnitOwnershipValidator implements Validator<UnitOwnershipValidator.OwnershipCheck> {

    @Override
    public void validate(OwnershipCheck check) {
        Unit unit = check.unit();
        User user = check.user();

        boolean isOwner = switch (unit) {
            case ResidentialUnit res -> res.getOwner() != null && res.getOwner().getId().equals(user.getId());
            case EnterpriseUnit ent -> ent.getOwner() != null && ent.getOwner().getId().equals(user.getId());
            default -> false;
        };

        if (!isOwner) {
            throw new IllegalArgumentException("Você não é o dono desta unidade.");
        }
    }

    public record OwnershipCheck(Unit unit, User user) {}
}
