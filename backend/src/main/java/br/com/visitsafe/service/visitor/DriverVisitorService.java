package br.com.visitsafe.service.visitor;

import br.com.visitsafe.dto.visitor.DriverVisitorDTO;
import br.com.visitsafe.model.visitor.DriverVisitor;
import br.com.visitsafe.repository.visitor.DriverVisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DriverVisitorService {

    private final DriverVisitorRepository repository;

    public DriverVisitor findOrCreate(DriverVisitorDTO dto) {
        return repository.findByDocument(dto.getDocument())
                .orElseGet(() -> {
                    DriverVisitor v = new DriverVisitor();
                    v.setName(dto.getName());
                    v.setPhone(dto.getPhone());
                    v.setDocument(dto.getDocument());
                    v.setHasCriminalBackgroundCheck(dto.getHasCriminalBackgroundCheck());
                    v.setVehicle(dto.getVehicle());
                    return repository.save(v);
                });
    }
}
