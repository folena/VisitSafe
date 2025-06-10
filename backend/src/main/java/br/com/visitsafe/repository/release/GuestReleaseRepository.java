package br.com.visitsafe.repository.release;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.visitsafe.model.release.GuestRelease;

public interface GuestReleaseRepository extends JpaRepository<GuestRelease, UUID> {
}
