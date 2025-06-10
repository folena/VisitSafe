package br.com.visitsafe.service.visitor;

import br.com.visitsafe.dto.visitor.ServiceProviderVisitorDTO;
import br.com.visitsafe.model.visitor.ServiceProviderVisitor;
import br.com.visitsafe.repository.visitor.ServiceProviderVisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServiceProviderVisitorService {

    private final ServiceProviderVisitorRepository repository;

    public ServiceProviderVisitor findOrCreate(ServiceProviderVisitorDTO dto) {
        return repository.findByDocument(dto.getDocument())
                .orElseGet(() -> {
                    ServiceProviderVisitor v = new ServiceProviderVisitor();
                    v.setName(dto.getName());
                    v.setPhone(dto.getPhone());
                    v.setDocument(dto.getDocument());
                    v.setHasCriminalBackgroundCheck(dto.getHasCriminalBackgroundCheck());
                    return repository.save(v);
                });
    }
}
