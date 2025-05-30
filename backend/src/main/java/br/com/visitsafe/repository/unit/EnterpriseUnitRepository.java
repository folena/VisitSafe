package br.com.visitsafe.repository.unit;

import br.com.visitsafe.model.condominium.EnterpriseCondominium;
import br.com.visitsafe.model.unit.EnterpriseUnit;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface EnterpriseUnitRepository extends JpaRepository<EnterpriseUnit, UUID> {
    List<EnterpriseUnit> findAllByOwner_Account_Email(String email);

    Page<EnterpriseUnit> findAllByCondominium(EnterpriseCondominium condominium, Pageable pageable);

}
