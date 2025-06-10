package br.com.visitsafe.repository.release;

import br.com.visitsafe.model.release.DeliveryRelease;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DeliveryReleaseRepository extends JpaRepository<DeliveryRelease, UUID> {
}
