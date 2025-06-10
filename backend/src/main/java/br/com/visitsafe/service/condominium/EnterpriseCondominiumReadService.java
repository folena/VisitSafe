package br.com.visitsafe.service.condominium;

import br.com.visitsafe.model.condominium.EnterpriseCondominium;
import br.com.visitsafe.repository.condominium.EnterpriseCondominiumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class EnterpriseCondominiumReadService {

    private final EnterpriseCondominiumRepository repository;

    public EnterpriseCondominium findByCnpj(String cnpj) {
        return repository.findByCnpj(cnpj)
                .orElseThrow(() -> new NoSuchElementException("Enterprise Condominium not found for CNPJ: " + cnpj));
    }
}
