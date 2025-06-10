package br.com.visitsafe.repository.release;

import br.com.visitsafe.model.release.DriverRelease;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DriverReleaseRepository extends JpaRepository<DriverRelease, UUID> {
}
