package br.com.visitsafe.repository.user;

import br.com.visitsafe.model.user.EnterpriseOwnerUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EnterpriseOwnerUserRepository extends JpaRepository<EnterpriseOwnerUser, UUID> {
    Optional<EnterpriseOwnerUser> findByAccountEmail(String email);
}
