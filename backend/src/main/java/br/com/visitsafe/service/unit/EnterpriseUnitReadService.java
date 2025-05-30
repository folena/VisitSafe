package br.com.visitsafe.service.unit;

import br.com.visitsafe.model.unit.EnterpriseUnit;
import br.com.visitsafe.repository.unit.EnterpriseUnitRepository;
import lombok.RequiredArgsConstructor;

import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class EnterpriseUnitReadService {

    private final EnterpriseUnitRepository repository;

    public EnterpriseUnit findById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Enterprise unit not found with ID: " + id));
    }
}
