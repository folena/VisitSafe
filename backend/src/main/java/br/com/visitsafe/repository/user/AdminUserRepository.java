package br.com.visitsafe.repository.user;

import br.com.visitsafe.model.user.AdminUser;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {
    @EntityGraph(attributePaths = "condominium")
    Optional<AdminUser> findByAccountEmail(String email);
}
