package br.com.visitsafe.repository.unit;

import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.unit.UnitAssociationCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UnitAssociationCodeRepository extends JpaRepository<UnitAssociationCode, UUID> {

    Optional<UnitAssociationCode> findByCode(String code);

    Optional<UnitAssociationCode> findTopByUnitOrderByCreatedAtDesc(Unit unit);

    void deleteAllByUnit(Unit unit);
}
