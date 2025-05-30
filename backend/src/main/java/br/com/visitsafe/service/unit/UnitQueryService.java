package br.com.visitsafe.service.unit;

import br.com.visitsafe.model.condominium.EnterpriseCondominium;
import br.com.visitsafe.model.condominium.ResidentialCondominium;
import br.com.visitsafe.model.unit.EnterpriseUnit;
import br.com.visitsafe.model.unit.ResidentialUnit;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.repository.unit.EnterpriseUnitRepository;
import br.com.visitsafe.repository.unit.ResidentialUnitRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable; // ✅ Correta
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UnitQueryService {

    private final ResidentialUnitRepository residentialRepo;
    private final EnterpriseUnitRepository enterpriseRepo;

    public List<Unit> findAllUnitsByOwnerEmail(String email) {
        List<Unit> units = new ArrayList<>();

        List<ResidentialUnit> residentialUnits = residentialRepo.findAllByOwner_Account_Email(email);
        List<EnterpriseUnit> enterpriseUnits = enterpriseRepo.findAllByOwner_Account_Email(email);

        units.addAll(residentialUnits);
        units.addAll(enterpriseUnits);

        return units;
    }

    public Page<Unit> findAllByAdminCondominium(AdminUser admin, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        if (admin.getCondominium() instanceof ResidentialCondominium residential) {
            return residentialRepo
                .findAllByCondominium(residential, pageable)
                .map(unit -> (Unit) unit);
        } else if (admin.getCondominium() instanceof EnterpriseCondominium enterprise) {
            return enterpriseRepo
                .findAllByCondominium(enterprise, pageable)
                .map(unit -> (Unit) unit);
        } else {
            throw new IllegalArgumentException("Condomínio do admin não é suportado.");
        }
    }
}
