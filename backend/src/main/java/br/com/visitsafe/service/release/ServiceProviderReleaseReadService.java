package br.com.visitsafe.service.release;

import br.com.visitsafe.dto.release.ReleaseSummaryResponseDTO;
import br.com.visitsafe.model.release.ServiceProviderRelease;
import br.com.visitsafe.repository.release.ServiceProviderReleaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ServiceProviderReleaseReadService {

    private final ServiceProviderReleaseRepository releaseRepo;

    public ReleaseSummaryResponseDTO findById(UUID id) {
        ServiceProviderRelease release = releaseRepo.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Release not found"));
        return ReleaseSummaryResponseDTO.fromEntity(release);
    }
} 