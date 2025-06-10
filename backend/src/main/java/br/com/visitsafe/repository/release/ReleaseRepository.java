package br.com.visitsafe.repository.release;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.visitsafe.model.condominium.Condominium;
import br.com.visitsafe.model.enums.ReleaseStatusEnum;
import br.com.visitsafe.model.release.Release;

@Repository
public interface ReleaseRepository extends JpaRepository<Release, UUID> {
    List<Release> findAllByUnitIdAndValidFromBetween(UUID unitId, LocalDate start, LocalDate end);

    Page<Release> findByUnit_CondominiumAndStatusAndCreatedAtBetween(
        Condominium condominium,
        ReleaseStatusEnum status,
        OffsetDateTime from,
        OffsetDateTime to,
        Pageable pageable
    );
}
