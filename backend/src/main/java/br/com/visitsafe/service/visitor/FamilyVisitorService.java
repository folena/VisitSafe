package br.com.visitsafe.service.visitor;

import br.com.visitsafe.dto.visitor.FamilyVisitorDTO;
import br.com.visitsafe.model.visitor.FamilyVisitor;
import br.com.visitsafe.repository.visitor.FamilyVisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FamilyVisitorService {

    private final FamilyVisitorRepository repository;

    public FamilyVisitor findOrCreate(FamilyVisitorDTO dto) {
        return repository.findByDocument(dto.getDocument())
                .orElseGet(() -> {
                    FamilyVisitor v = new FamilyVisitor();
                    v.setName(dto.getName());
                    v.setPhone(dto.getPhone());
                    v.setDocument(dto.getDocument());
                    return repository.save(v);
                });
    }
}
