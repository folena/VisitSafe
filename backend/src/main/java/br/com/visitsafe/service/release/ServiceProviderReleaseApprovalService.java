package br.com.visitsafe.service.release;

import br.com.visitsafe.model.enums.ReleaseApprovalStatusEnum;
import br.com.visitsafe.model.enums.ReleaseStatusEnum;
import br.com.visitsafe.model.release.ServiceProviderRelease;
import br.com.visitsafe.repository.release.ServiceProviderReleaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ServiceProviderReleaseApprovalService {

    private final ServiceProviderReleaseRepository repository;

    public void approve(UUID id, boolean approve) {
        ServiceProviderRelease release = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Liberação não encontrada"));

        if (!Boolean.TRUE.equals(release.getIsExceptional())) {
            throw new IllegalStateException(
                "Somente liberações excepcionais requerem aprovação."
            );
        }

        release.setApprovalStatus(
            approve ? ReleaseApprovalStatusEnum.APPROVED : ReleaseApprovalStatusEnum.REJECTED
        );
        release.setStatus(
            approve ? ReleaseStatusEnum.PENDING_CHECKIN : ReleaseStatusEnum.UNAUTHORIZED
        );
        repository.save(release);
    }

    public void submitJustification(UUID id, String justification) {
        ServiceProviderRelease release = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Liberação não encontrada"));

        if (release.getApprovalStatus() != ReleaseApprovalStatusEnum.REJECTED) {
            throw new IllegalStateException(
                "Somente liberações rejeitadas aceitam justificativa"
            );
        }

        release.setRejectionJustification(justification);
        repository.save(release);
    }

    public void recordEntry(UUID id) {
        ServiceProviderRelease release = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Release not found"));
        
        release.setActualEntryTime(OffsetDateTime.now());
        release.setStatus(ReleaseStatusEnum.CHECKED_IN);
        repository.save(release);
    }

    public void recordExit(UUID id, Map<String, String> data) {
        ServiceProviderRelease release = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Release not found"));
        
        OffsetDateTime now = OffsetDateTime.now();
        release.setActualExitTime(now);
        
        if (data != null) {
            release.setLateExitJustification(data.get("justification"));
        }
        
        if (now.toLocalTime().isAfter(release.getDailyEnd())) {
            if (data != null && data.get("justification") != null) {
                release.setStatus(ReleaseStatusEnum.COMPLETED);
            } else {
                release.setStatus(ReleaseStatusEnum.COMPLETED);
            }
        } else {
            release.setStatus(ReleaseStatusEnum.COMPLETED);
        }
        
        repository.save(release);
    }

    public void notifyResident(UUID id) {
        ServiceProviderRelease release = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Release not found"));
        
        release.setResidentNotified(true);
        repository.save(release);
    }

    public void approveLateExit(UUID id, boolean approve) {
        ServiceProviderRelease release = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Release not found"));
        
        if (approve) {
            release.setStatus(ReleaseStatusEnum.COMPLETED);
        } else {
            release.setStatus(ReleaseStatusEnum.REJECTED);
        }
        
        repository.save(release);
    }
}