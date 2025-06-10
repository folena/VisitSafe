package br.com.visitsafe.service.release;

import br.com.visitsafe.dto.release.ServiceProviderReleaseCreateRequestDTO;
import br.com.visitsafe.model.enums.ReleaseApprovalStatusEnum;
import br.com.visitsafe.model.enums.ReleaseStatusEnum;
import br.com.visitsafe.model.release.ServiceProviderRelease;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.visitor.ServiceProviderVisitor;
import br.com.visitsafe.repository.unit.UnitRepository;
import br.com.visitsafe.repository.release.ServiceProviderReleaseRepository;
import br.com.visitsafe.service.visitor.ServiceProviderVisitorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServiceProviderReleaseCreateService {

    private final ServiceProviderReleaseRepository releaseRepo;
    private final UnitRepository unitRepo;
    private final ServiceProviderVisitorService visitorService;

    public ServiceProviderRelease create(ServiceProviderReleaseCreateRequestDTO dto) {
        if (!dto.getVisitor().getHasCriminalBackgroundCheck()) {
            throw new IllegalArgumentException(
                "Antecedente criminal obrigatório para prestadores de serviço"
            );
        }

        Unit unit = unitRepo.findById(dto.getUnitId())
            .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));

        ServiceProviderVisitor visitor = visitorService.findOrCreate(dto.getVisitor());

        ServiceProviderRelease release = new ServiceProviderRelease();
        release.setUnit(unit);
        release.setVisitor(visitor);
        release.setValidFrom(dto.getValidFrom());
        release.setValidUntil(dto.getValidUntil());
        release.setDailyStart(dto.getDailyStart());
        release.setDailyEnd(dto.getDailyEnd());

        release.setIsExceptional(dto.getVisitor().getIsExceptional());
        if (Boolean.TRUE.equals(release.getIsExceptional())) {
            release.setApprovalStatus(ReleaseApprovalStatusEnum.PENDING_APPROVAL);
            release.setStatus(ReleaseStatusEnum.UNAUTHORIZED);
        } else {
            release.setApprovalStatus(ReleaseApprovalStatusEnum.APPROVED);
            release.setStatus(ReleaseStatusEnum.PENDING_CHECKIN);
        }

        return releaseRepo.save(release);
    }
}