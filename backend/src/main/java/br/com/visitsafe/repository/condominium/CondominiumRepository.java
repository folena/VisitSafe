package br.com.visitsafe.repository.condominium;

import br.com.visitsafe.model.condominium.Condominium;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CondominiumRepository extends JpaRepository<Condominium, UUID> {
    Optional<Condominium> findByCnpj(String cnpj);
}
