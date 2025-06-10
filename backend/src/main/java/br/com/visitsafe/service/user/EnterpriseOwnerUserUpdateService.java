package br.com.visitsafe.service.user;

import br.com.visitsafe.model.unit.EnterpriseUnit;
import br.com.visitsafe.model.user.EnterpriseOwnerUser;
import br.com.visitsafe.repository.user.EnterpriseOwnerUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EnterpriseOwnerUserUpdateService {

    private final EnterpriseOwnerUserRepository repository;

    @Transactional
    public void addUnit(EnterpriseOwnerUser owner, EnterpriseUnit unit) {
        owner.getUnits().add(unit);
        unit.setOwner(owner);
        repository.save(owner);
    }
}
