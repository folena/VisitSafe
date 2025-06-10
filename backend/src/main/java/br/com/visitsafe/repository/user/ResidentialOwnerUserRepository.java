package br.com.visitsafe.repository.user;

import br.com.visitsafe.model.user.ResidentialOwnerUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ResidentialOwnerUserRepository extends JpaRepository<ResidentialOwnerUser, UUID> {
    Optional<ResidentialOwnerUser> findByAccountEmail(String email);
}
