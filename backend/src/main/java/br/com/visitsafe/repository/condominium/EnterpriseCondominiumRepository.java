package br.com.visitsafe.repository.condominium;

import br.com.visitsafe.model.condominium.EnterpriseCondominium;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EnterpriseCondominiumRepository extends JpaRepository<EnterpriseCondominium, UUID> {
    Optional<EnterpriseCondominium> findByCnpj(String cnpj);
}
