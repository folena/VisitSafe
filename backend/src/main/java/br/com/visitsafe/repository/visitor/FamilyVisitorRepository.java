package br.com.visitsafe.repository.visitor;

import br.com.visitsafe.model.visitor.FamilyVisitor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface FamilyVisitorRepository extends JpaRepository<FamilyVisitor, UUID> {
    Optional<FamilyVisitor> findByDocument(String document);
    boolean existsByDocument(String document);
}
