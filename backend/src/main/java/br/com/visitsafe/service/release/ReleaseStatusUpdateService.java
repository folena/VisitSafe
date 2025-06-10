package br.com.visitsafe.service.release;

import br.com.visitsafe.model.enums.ReleaseStatusEnum;
import br.com.visitsafe.model.release.Release;
import br.com.visitsafe.model.user.EmployeeUser;
import br.com.visitsafe.repository.release.ReleaseRepository;
import br.com.visitsafe.validation.impl.release.ReleaseStatusTransitionValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.time.OffsetDateTime;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class ReleaseStatusUpdateService {

    private final ReleaseRepository releaseRepo;
    private final ReleaseStatusTransitionValidator transitionValidator;

    @Transient
    public Release checkin(UUID releaseId, EmployeeUser employee) {
        Release release = releaseRepo.findById(releaseId)
                .orElseThrow(() -> new IllegalArgumentException("Liberação não encontrada"));

        release.setStatus(ReleaseStatusEnum.CHECKED_IN);
        release.setCheckinAt(OffsetDateTime.now());
        release.setCheckinBy(employee);

        return releaseRepo.save(release);
    }

    @Transient
    public Release checkout(UUID releaseId, EmployeeUser employee) {
        Release release = releaseRepo.findById(releaseId)
                .orElseThrow(() -> new IllegalArgumentException("Liberação não encontrada"));

        release.setStatus(ReleaseStatusEnum.COMPLETED);
        release.setCheckoutAt(OffsetDateTime.now());
        release.setCheckoutBy(employee);

        return releaseRepo.save(release);
    }

    @Transient
    public void cancel(UUID releaseId, EmployeeUser employee) {
        Release release = releaseRepo.findById(releaseId)
                .orElseThrow(() -> new IllegalArgumentException("Liberação não encontrada"));

        transitionValidator.validate(new ReleaseStatusTransitionValidator.Transition(release, ReleaseStatusEnum.PENDING_CHECKIN));

        release.setStatus(ReleaseStatusEnum.UNAUTHORIZED);
        release.setCheckoutAt(OffsetDateTime.now());
        release.setCheckoutBy(employee);

        releaseRepo.save(release);
    }
}
