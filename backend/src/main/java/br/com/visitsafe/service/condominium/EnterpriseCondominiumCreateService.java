package br.com.visitsafe.service.condominium;

import br.com.visitsafe.model.condominium.EnterpriseCondominium;
import br.com.visitsafe.repository.condominium.EnterpriseCondominiumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnterpriseCondominiumCreateService {

    private final EnterpriseCondominiumRepository repository;

    public EnterpriseCondominium create(String name, String cnpj) {
        EnterpriseCondominium condominium = new EnterpriseCondominium(name, cnpj);
        return repository.save(condominium);
    }
}
