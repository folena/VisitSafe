package br.com.visitsafe.service.visitor;

import br.com.visitsafe.model.enums.ReleaseTypeEnum;
import br.com.visitsafe.repository.visitor.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VisitorLookupService {

    private final GuestVisitorRepository guestRepo;
    private final FamilyVisitorRepository familyRepo;
    private final ServiceProviderVisitorRepository serviceRepo;
    private final DeliveryVisitorRepository deliveryRepo;
    private final DriverVisitorRepository driverRepo;

    public boolean existsByDocumentAndType(String document, ReleaseTypeEnum releaseTypeEnum) {
        return switch (releaseTypeEnum) {
            case ReleaseTypeEnum.GUEST -> guestRepo.existsByDocument(document);
            case ReleaseTypeEnum.FAMILY -> familyRepo.existsByDocument(document);
            case ReleaseTypeEnum.SERVICEPROVIDER -> serviceRepo.existsByDocument(document);
            case ReleaseTypeEnum.DELIVERY -> deliveryRepo.existsByDocument(document);
            case ReleaseTypeEnum.DRIVER -> driverRepo.existsByDocument(document);
            default -> false;
        };
    }
}