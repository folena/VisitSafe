package br.com.visitsafe.repository.condominium;

import br.com.visitsafe.model.condominium.ResidentialCondominium;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ResidentialCondominiumRepository extends JpaRepository<ResidentialCondominium, UUID> {
    Optional<ResidentialCondominium> findByCnpj(String cnpj);
}
