package br.com.visitsafe.repository.unit;

import br.com.visitsafe.model.unit.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UnitRepository extends JpaRepository<Unit, UUID> { 
}
