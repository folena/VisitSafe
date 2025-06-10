package br.com.visitsafe.service.release;

import java.beans.Transient;
import java.util.UUID;

import org.springframework.stereotype.Service;

import br.com.visitsafe.dto.release.GuestReleaseUpdateRequestDTO;
import br.com.visitsafe.model.release.GuestRelease;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.repository.release.GuestReleaseRepository;
import br.com.visitsafe.repository.unit.UnitRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GuestReleaseUpdateService {

    private final GuestReleaseRepository releaseRepo;
    private final UnitRepository unitRepo;

    @Transient
    public GuestRelease update(UUID id, GuestReleaseUpdateRequestDTO dto) {
        GuestRelease release = releaseRepo.findById(id)
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

