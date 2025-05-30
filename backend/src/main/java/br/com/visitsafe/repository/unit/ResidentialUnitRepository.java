package br.com.visitsafe.repository.unit;

import br.com.visitsafe.model.condominium.ResidentialCondominium;
import br.com.visitsafe.model.unit.ResidentialUnit;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ResidentialUnitRepository extends JpaRepository<ResidentialUnit, UUID> {
    List<ResidentialUnit> findAllByOwner_Account_Email(String email);

    Page<ResidentialUnit> findAllByCondominium(ResidentialCondominium condominium, Pageable pageable);

}
