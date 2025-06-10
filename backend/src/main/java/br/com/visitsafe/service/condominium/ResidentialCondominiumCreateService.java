package br.com.visitsafe.service.condominium;

import br.com.visitsafe.model.condominium.ResidentialCondominium;
import br.com.visitsafe.repository.condominium.ResidentialCondominiumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResidentialCondominiumCreateService {

    private final ResidentialCondominiumRepository repository;

    public ResidentialCondominium create(String name, String cnpj) {
        ResidentialCondominium condominium = new ResidentialCondominium(name, cnpj);
        return repository.save(condominium);
    }
}
