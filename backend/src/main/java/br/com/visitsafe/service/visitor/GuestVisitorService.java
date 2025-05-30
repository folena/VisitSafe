package br.com.visitsafe.service.visitor;

import br.com.visitsafe.dto.visitor.GuestVisitorDTO;
import br.com.visitsafe.model.visitor.GuestVisitor;
import br.com.visitsafe.repository.visitor.GuestVisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GuestVisitorService {

    private final GuestVisitorRepository repository;

    public GuestVisitor findOrCreate(GuestVisitorDTO dto) {
        return repository.findByDocument(dto.getDocument())
                .orElseGet(() -> {
                    GuestVisitor v = new GuestVisitor();
                    v.setName(dto.getName());
                    v.setPhone(dto.getPhone());
                    v.setDocument(dto.getDocument());
                    return repository.save(v);
                });
    }
}
