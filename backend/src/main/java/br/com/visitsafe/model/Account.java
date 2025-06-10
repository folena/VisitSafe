package br.com.visitsafe.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import br.com.visitsafe.model.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

/**
 * A autenticação acontece sempre por Account.  Se o campo
 * {@code isActive} estiver em false, o usuário não consegue logar.
 */
@Entity
@Table(name = "accounts")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Account {

    @Id @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleEnum role;

    @Column(nullable = false)
    private boolean isActive;
}
