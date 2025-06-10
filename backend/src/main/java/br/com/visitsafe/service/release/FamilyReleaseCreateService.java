package br.com.visitsafe.service.release;

import br.com.visitsafe.dto.release.FamilyReleaseCreateRequestDTO;
import br.com.visitsafe.model.release.FamilyRelease;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.enums.ReleaseStatusEnum;
import br.com.visitsafe.model.visitor.FamilyVisitor;
import br.com.visitsafe.repository.release.FamilyReleaseRepository;
import br.com.visitsafe.service.visitor.FamilyVisitorService;
import br.com.visitsafe.repository.unit.UnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class FamilyReleaseCreateService {

    private final FamilyReleaseRepository releaseRepo;
    private final UnitRepository unitRepo;
    private final FamilyVisitorService visitorService;

    public FamilyRelease create(FamilyReleaseCreateRequestDTO dto) {
        Unit unit = unitRepo.findById(dto.getUnitId())
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));

        FamilyVisitor visitor = visitorService.findOrCreate(dto.getVisitor());

        FamilyRelease release = new FamilyRelease();
        release.setUnit(unit);
        release.setVisitor(visitor);
        release.setValidFrom(dto.getValidFrom());
        release.setValidUntil(dto.getValidUntil());
        release.setDailyStart(dto.getDailyStart());
        release.setDailyEnd(dto.getDailyEnd());
        release.setStatus(ReleaseStatusEnum.PENDING_CHECKIN);

        return releaseRepo.save(release);
    }
}
