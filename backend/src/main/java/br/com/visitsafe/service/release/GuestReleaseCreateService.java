package br.com.visitsafe.service.release;

import br.com.visitsafe.dto.release.GuestReleaseCreateRequestDTO;
import br.com.visitsafe.model.release.GuestRelease;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.enums.ReleaseStatusEnum;
import br.com.visitsafe.model.visitor.GuestVisitor;
import br.com.visitsafe.repository.release.GuestReleaseRepository;
import br.com.visitsafe.service.visitor.GuestVisitorService;
import br.com.visitsafe.repository.unit.UnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GuestReleaseCreateService {

    private final GuestReleaseRepository releaseRepo;
    private final UnitRepository unitRepo;
    private final GuestVisitorService visitorService;

    public GuestRelease create(GuestReleaseCreateRequestDTO dto) {
        Unit unit = unitRepo.findById(dto.getUnitId())
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));

        GuestVisitor visitor = visitorService.findOrCreate(dto.getVisitor());

        GuestRelease release = new GuestRelease();
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
