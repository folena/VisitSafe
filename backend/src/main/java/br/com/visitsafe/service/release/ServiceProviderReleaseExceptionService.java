package br.com.visitsafe.service.release;

import br.com.visitsafe.dto.release.ServiceProviderReleaseJustificationDTO;
import br.com.visitsafe.model.enums.ReleaseStatusEnum;
import br.com.visitsafe.model.release.ServiceProviderRelease;
import br.com.visitsafe.repository.release.ServiceProviderReleaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Base64;

import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ServiceProviderReleaseExceptionService {

    private final ServiceProviderReleaseRepository releaseRepo;

    @Transactional
    public void recordEntry(UUID id) {
        ServiceProviderRelease release = releaseRepo.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Release not found"));

        if (release.getStatus() != ReleaseStatusEnum.PENDING_CHECKIN) {
            throw new IllegalStateException("Release is not in a valid state for check-in");
        }

        release.setActualEntryTime(OffsetDateTime.now());
        release.setStatus(ReleaseStatusEnum.CHECKED_IN);
        releaseRepo.save(release);
    }

    @Transactional
    public void recordExit(UUID id, ServiceProviderReleaseJustificationDTO justification) {
        ServiceProviderRelease release = releaseRepo.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Release not found"));

        if (release.getStatus() != ReleaseStatusEnum.CHECKED_IN) {
            throw new IllegalStateException("Release is not in a valid state for check-out");
        }

        OffsetDateTime now = OffsetDateTime.now();
        release.setActualExitTime(now);

        // Check if exit is after scheduled time
        LocalTime currentTime = now.toLocalTime();
        if (currentTime.isAfter(release.getDailyEnd())) {
            if (justification == null || justification.getJustification() == null) {
                throw new IllegalStateException("Justification is required for late exit");
            }
            release.setLateExitJustification(justification.getJustification());
            
            // Handle image data if present
            if (justification.getImageData() != null && justification.getImageType() != null) {
                try {
                    // Remove the data URL prefix if present (e.g., "data:image/jpeg;base64,")
                    String base64Data = justification.getImageData();
                    if (base64Data.contains(",")) {
                        base64Data = base64Data.split(",")[1];
                    }
                    
                    // Convert base64 to byte array
                    byte[] imageBytes = Base64.getDecoder().decode(base64Data);
                    release.setJustificationImage(imageBytes);
                    release.setJustificationImageType(justification.getImageType());
                } catch (IllegalArgumentException e) {
                    throw new IllegalStateException("Invalid image data format");
                }
            }
            
            // For late exits, we must notify the resident
            release.setResidentNotified(true);
            // Use the notification time from the DTO, or current time if not provided
            release.setResidentNotificationTime(
                justification.getNotificationTime() != null 
                    ? OffsetDateTime.parse(justification.getNotificationTime(), DateTimeFormatter.ISO_DATE_TIME)
                    : OffsetDateTime.now()
            );
            release.setStatus(ReleaseStatusEnum.PENDING_RESIDENT_APPROVAL);
        } else {
            release.setStatus(ReleaseStatusEnum.COMPLETED);
        }

        releaseRepo.save(release);
    }

    @Transactional
    public void notifyResident(UUID id) {
        ServiceProviderRelease release = releaseRepo.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Release not found"));

        if (release.getStatus() != ReleaseStatusEnum.PENDING_RESIDENT_APPROVAL) {
            throw new IllegalStateException("Release is not in a valid state for resident notification");
        }

        if (release.getResidentNotified()) {
            throw new IllegalStateException("Resident has already been notified");
        }

        release.setResidentNotified(true);
        release.setResidentNotificationTime(OffsetDateTime.now());
        releaseRepo.save(release);
    }

    @Transactional
    public void approveLateExit(UUID id, boolean approved) {
        ServiceProviderRelease release = releaseRepo.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Release not found"));

        if (release.getStatus() != ReleaseStatusEnum.PENDING_RESIDENT_APPROVAL) {
            throw new IllegalStateException("Release is not in a valid state for approval");
        }

        if (!release.getResidentNotified()) {
            throw new IllegalStateException("Resident must be notified before approval");
        }

        release.setStatus(approved ? ReleaseStatusEnum.COMPLETED : ReleaseStatusEnum.REJECTED);
        releaseRepo.save(release);
    }
} 