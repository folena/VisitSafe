package br.com.visitsafe.service.user;

import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.repository.user.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AdminUserReadService {

    private final AdminUserRepository repository;

    public AdminUser findByEmail(String email) {
        return repository.findByAccountEmail(email)
                .orElseThrow(() -> new NoSuchElementException("Admin user not found for email: " + email));
    }
}
