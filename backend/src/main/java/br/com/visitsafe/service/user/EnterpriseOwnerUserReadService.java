package br.com.visitsafe.service.user;

import br.com.visitsafe.model.user.EnterpriseOwnerUser;
import br.com.visitsafe.repository.user.EnterpriseOwnerUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class EnterpriseOwnerUserReadService {

    private final EnterpriseOwnerUserRepository repository;

    public EnterpriseOwnerUser findByEmail(String email) {
        return repository.findByAccountEmail(email)
                .orElseThrow(() -> new NoSuchElementException("Enterprise owner not found for email: " + email));
    }
}
