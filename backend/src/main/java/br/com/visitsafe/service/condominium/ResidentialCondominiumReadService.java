package br.com.visitsafe.service.condominium;

import br.com.visitsafe.model.condominium.ResidentialCondominium;
import br.com.visitsafe.repository.condominium.ResidentialCondominiumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ResidentialCondominiumReadService {

    private final ResidentialCondominiumRepository repository;

    public ResidentialCondominium findByCnpj(String cnpj) {
        return repository.findByCnpj(cnpj)
                .orElseThrow(() -> new NoSuchElementException("Residential Condominium not found for CNPJ: " + cnpj));
    }
}
