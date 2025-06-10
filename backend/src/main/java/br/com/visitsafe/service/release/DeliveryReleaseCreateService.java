package br.com.visitsafe.service.release;

import br.com.visitsafe.dto.release.DeliveryReleaseCreateRequestDTO;
import br.com.visitsafe.model.release.DeliveryRelease;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.visitor.DeliveryVisitor;
import br.com.visitsafe.model.enums.ReleaseStatusEnum;
import br.com.visitsafe.repository.release.DeliveryReleaseRepository;
import br.com.visitsafe.service.visitor.DeliveryVisitorService;
import br.com.visitsafe.repository.unit.UnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class DeliveryReleaseCreateService {

    private final DeliveryReleaseRepository releaseRepo;
    private final UnitRepository unitRepo;
    private final DeliveryVisitorService deliveryVisitorService;

    public DeliveryRelease create(DeliveryReleaseCreateRequestDTO dto) {
        if (!dto.getVisitor().getHasCriminalBackgroundCheck()) {
            throw new IllegalArgumentException("Antecedente criminal obrigatório para entregadores");
        }

        Unit unit = unitRepo.findById(dto.getUnitId())
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));

        DeliveryVisitor visitor = deliveryVisitorService.findOrCreate(dto.getVisitor());

        DeliveryRelease release = new DeliveryRelease();
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