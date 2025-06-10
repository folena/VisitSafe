package br.com.visitsafe.service.release;

import java.beans.Transient;
import java.util.UUID;

import org.springframework.stereotype.Service;

import br.com.visitsafe.dto.release.ServiceProviderReleaseUpdateRequestDTO;
import br.com.visitsafe.model.release.ServiceProviderRelease;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.repository.release.ServiceProviderReleaseRepository;
import br.com.visitsafe.repository.unit.UnitRepository;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class ServiceProviderReleaseUpdateService {

    private final ServiceProviderReleaseRepository releaseRepo;
    private final UnitRepository unitRepo;

    @Transient
    public ServiceProviderRelease update(UUID id, ServiceProviderReleaseUpdateRequestDTO dto) {
        ServiceProviderRelease release = releaseRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Release não encontrado"));

        Unit unit = unitRepo.findById(dto.getUnitId())
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));

        release.setUnit(unit);
        release.setValidFrom(dto.getValidFrom());
        release.setValidUntil(dto.getValidUntil());
        release.setDailyStart(dto.getDailyStart());
        release.setDailyEnd(dto.getDailyEnd());

        return releaseRepo.save(release);
    }

    @Transient
    public void delete(UUID id) {
        if (!releaseRepo.existsById(id)) {
            throw new IllegalArgumentException("Release com ID " + id + " não encontrado para exclusão.");
        }
        releaseRepo.deleteById(id);
    }
}
