package br.com.visitsafe.repository.release;

import br.com.visitsafe.model.release.FamilyRelease;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FamilyReleaseRepository extends JpaRepository<FamilyRelease, UUID> {
}
