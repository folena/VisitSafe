package br.com.visitsafe.repository.visitor;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.visitsafe.model.visitor.ServiceProviderVisitor;

public interface ServiceProviderVisitorRepository extends JpaRepository<ServiceProviderVisitor, UUID> {
    Optional<ServiceProviderVisitor> findByDocument(String document);
    boolean existsByDocument(String document);
}
