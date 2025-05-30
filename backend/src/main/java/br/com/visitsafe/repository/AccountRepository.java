package br.com.visitsafe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.visitsafe.model.Account;

import java.util.Optional;
import java.util.UUID;

public interface AccountRepository extends JpaRepository<Account, UUID> {
    Optional<Account> findByEmail(String email);
    Optional<Account> findByEmailAndIsActiveTrue(String email);
}
