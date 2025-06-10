package br.com.visitsafe.service.user;

import br.com.visitsafe.model.user.EmployeeUser;
import br.com.visitsafe.repository.user.EmployeeUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeUserReadService {

    private final EmployeeUserRepository repository;

    public EmployeeUser findByEmail(String email) {
        return repository.findByAccountEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado para o e-mail: " + email));
    }
}
