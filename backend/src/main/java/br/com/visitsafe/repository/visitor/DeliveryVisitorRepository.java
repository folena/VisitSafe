package br.com.visitsafe.repository.visitor;

import br.com.visitsafe.model.visitor.DeliveryVisitor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DeliveryVisitorRepository extends JpaRepository<DeliveryVisitor, UUID> {
    Optional<DeliveryVisitor> findByDocument(String document);
    boolean existsByDocument(String document);
}
