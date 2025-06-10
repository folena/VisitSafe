package br.com.visitsafe.service.visitor;

import br.com.visitsafe.dto.visitor.DeliveryVisitorDTO;
import br.com.visitsafe.model.document.Document;
import br.com.visitsafe.model.enums.DocumentTypeEnum;
import br.com.visitsafe.model.visitor.DeliveryVisitor;
import br.com.visitsafe.repository.visitor.DeliveryVisitorRepository;
import br.com.visitsafe.service.document.DocumentFactoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeliveryVisitorService {

    private final DeliveryVisitorRepository repository;
    private final DocumentFactoryService documentFactory;

    public DeliveryVisitor findOrCreate(DeliveryVisitorDTO dto) {
        Document doc = documentFactory.create(DocumentTypeEnum.CPF, dto.getDocument());
        
        return repository.findByDocument(doc.getRaw())
                .orElseGet(() -> {
                    DeliveryVisitor v = new DeliveryVisitor();
                    v.setName(dto.getName());
                    v.setPhone(dto.getPhone());
                    v.setDocument(doc.getRaw());
                    v.setHasCriminalBackgroundCheck(dto.getHasCriminalBackgroundCheck());
                    v.setVehicle(dto.getVehicle());
                    return repository.save(v);
                });
    }
}
