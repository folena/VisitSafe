package br.com.visitsafe.service.release;

import br.com.visitsafe.dto.release.DriverReleaseCreateRequestDTO;
import br.com.visitsafe.model.release.DriverRelease;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.enums.ReleaseStatusEnum;
import br.com.visitsafe.model.visitor.DriverVisitor;
import br.com.visitsafe.repository.release.DriverReleaseRepository;
import br.com.visitsafe.service.visitor.DriverVisitorService;
import br.com.visitsafe.repository.unit.UnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DriverReleaseCreateService {

    private final DriverReleaseRepository releaseRepo;
    private final UnitRepository unitRepo;
    private final DriverVisitorService visitorService;

    public DriverRelease create(DriverReleaseCreateRequestDTO dto) {
        if (!dto.getVisitor().getHasCriminalBackgroundCheck()) {
            throw new IllegalArgumentException("Antecedente criminal obrigatório para motoristas");
        }

        Unit unit = unitRepo.findById(dto.getUnitId())
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));

        DriverVisitor visitor = visitorService.findOrCreate(dto.getVisitor());

        DriverRelease release = new DriverRelease();
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
