package br.com.visitsafe.service.user;

import br.com.visitsafe.model.user.ResidentialOwnerUser;
import br.com.visitsafe.repository.user.ResidentialOwnerUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ResidentialOwnerUserReadService {

    private final ResidentialOwnerUserRepository repository;

    public ResidentialOwnerUser findByEmail(String email) {
        return repository.findByAccountEmail(email)
                .orElseThrow(() -> new NoSuchElementException("Residential owner not found for email: " + email));
    }
}
