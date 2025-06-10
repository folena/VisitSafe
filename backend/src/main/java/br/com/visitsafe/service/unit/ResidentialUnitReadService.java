package br.com.visitsafe.service.unit;

import br.com.visitsafe.model.unit.ResidentialUnit;
import br.com.visitsafe.repository.unit.ResidentialUnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResidentialUnitReadService {

    private final ResidentialUnitRepository residentialUnitRepository;

    public ResidentialUnit findById(UUID id) {
        return residentialUnitRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Residential unit not found with ID: " + id));
    }
}
