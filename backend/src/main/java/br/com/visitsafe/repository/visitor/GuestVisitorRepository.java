package br.com.visitsafe.repository.visitor;

import br.com.visitsafe.model.visitor.GuestVisitor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface GuestVisitorRepository extends JpaRepository<GuestVisitor, UUID> {
    Optional<GuestVisitor> findByDocument(String document);
    boolean existsByDocument(String document);
}
