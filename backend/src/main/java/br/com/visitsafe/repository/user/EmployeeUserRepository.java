package br.com.visitsafe.repository.user;

import br.com.visitsafe.model.user.EmployeeUser;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EmployeeUserRepository extends JpaRepository<EmployeeUser, UUID> {
    @EntityGraph(attributePaths = "account")
    Optional<EmployeeUser> findByAccountEmail(String email);
}
