package br.com.visitsafe.service.user;

import br.com.visitsafe.exception.UserNotFoundException;
import br.com.visitsafe.model.user.User;
import br.com.visitsafe.repository.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserQueryService {

    private final UserRepository userRepository;

    public User findById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> UserNotFoundException.withId(id.toString()));
    }

    public User findByEmail(String email) {
        return userRepository.findByAccount_Email(email)
            .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
    }
}
