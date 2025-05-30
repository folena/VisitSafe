package br.com.visitsafe.controller;

import br.com.visitsafe.dto.AuthRequestDTO;
import br.com.visitsafe.dto.AuthResponseDTO;
import br.com.visitsafe.model.Account;
import br.com.visitsafe.repository.AccountRepository;
import br.com.visitsafe.security.JwtUtils;
import jakarta.validation.Valid;
import lombok.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtils jwt;
    private final AccountRepository accountRepo;

    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody @Valid AuthRequestDTO req) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));

        UserDetails userDetails = (UserDetails) auth.getPrincipal();

        Account acc = accountRepo.findByEmailAndIsActiveTrue(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Conta desativada ou inexistente"));

        String token = jwt.generate(acc.getEmail(), acc.getRole().name());

        return new AuthResponseDTO(token, acc.getRole().name(), acc.getEmail());
    }
}
