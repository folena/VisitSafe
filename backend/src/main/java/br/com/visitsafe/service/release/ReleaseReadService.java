package br.com.visitsafe.service.release;

import br.com.visitsafe.dto.release.ReleaseSummaryResponseDTO;
import br.com.visitsafe.model.condominium.Condominium;
import br.com.visitsafe.model.enums.ReleaseStatusEnum;
import br.com.visitsafe.model.release.Release;
import br.com.visitsafe.model.unit.Unit;
import br.com.visitsafe.model.user.EmployeeUser;
import br.com.visitsafe.model.user.User;
import br.com.visitsafe.repository.release.ReleaseRepository;
import br.com.visitsafe.repository.unit.UnitRepository;
import br.com.visitsafe.validation.impl.unit.UnitOwnershipValidator;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReleaseReadService {

    private final ReleaseRepository releaseRepository;
    private final UnitRepository unitRepository;
    private final UnitOwnershipValidator unitOwnershipValidator;

    public List<ReleaseSummaryResponseDTO> findByOwnerAndPeriod(User user, UUID propertyId, LocalDate startDate, LocalDate endDate) {
        Unit unit = unitRepository.findById(propertyId)
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));

        unitOwnershipValidator.validate(new UnitOwnershipValidator.OwnershipCheck(unit, user));

        return releaseRepository.findAllByUnitIdAndValidFromBetween(unit.getId(), startDate, endDate)
                .stream()
                .map(ReleaseSummaryResponseDTO::fromEntity)
                .toList();
    }
    
    public Page<ReleaseSummaryResponseDTO> findAllTodayByCondominiumAndStatus(EmployeeUser employee, ReleaseStatusEnum status, Pageable pageable) {
        Condominium condominium = employee.getCondominium();
        LocalDate today = LocalDate.now();
        LocalTime startOfDay = LocalTime.MIN;
        LocalTime endOfDay = LocalTime.MAX;

        Page<Release> releases = releaseRepository.findByUnit_CondominiumAndStatusAndCreatedAtBetween(
                condominium, 
                status, 
                today.atTime(startOfDay).atOffset(ZoneOffset.UTC),
                today.atTime(endOfDay).atOffset(ZoneOffset.UTC),
                pageable
        );

        return releases.map(ReleaseSummaryResponseDTO::fromEntity);
    }
}
