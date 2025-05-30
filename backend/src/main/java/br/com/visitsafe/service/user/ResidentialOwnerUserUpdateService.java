package br.com.visitsafe.service.user;

import br.com.visitsafe.model.unit.ResidentialUnit;
import br.com.visitsafe.model.user.ResidentialOwnerUser;
import br.com.visitsafe.repository.user.ResidentialOwnerUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ResidentialOwnerUserUpdateService {

    private final ResidentialOwnerUserRepository repository;

    @Transactional
    public void addUnit(ResidentialOwnerUser owner, ResidentialUnit unit) {
        owner.getUnits().add(unit);
        unit.setOwner(owner);
        repository.save(owner);
    }
}
