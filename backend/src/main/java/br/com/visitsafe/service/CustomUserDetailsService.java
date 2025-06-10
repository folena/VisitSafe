package br.com.visitsafe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import br.com.visitsafe.model.Account;
import br.com.visitsafe.repository.AccountRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Account acc = accountRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Account disabled: " + email));

        if (!acc.isActive()) {
            throw new DisabledException("Account disabled");
        }

        return User.withUsername(acc.getEmail())
                .password(acc.getPassword())
                .authorities(new SimpleGrantedAuthority("ROLE_" + acc.getRole().name()))
                .disabled(!acc.isActive())
                .build();
    }
}
