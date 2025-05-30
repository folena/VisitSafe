package br.com.visitsafe.repository.visitor;

import br.com.visitsafe.model.visitor.DriverVisitor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DriverVisitorRepository extends JpaRepository<DriverVisitor, UUID> {
    Optional<DriverVisitor> findByDocument(String document);
    boolean existsByDocument(String document);
}
