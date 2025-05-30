package br.com.visitsafe.model.condominium;

import br.com.visitsafe.model.enums.CondominiumTypeEnum;
import br.com.visitsafe.model.unit.Unit;
import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "condominiums")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class Condominium {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String cnpj;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, updatable = false)
    private CondominiumTypeEnum condominiumType;

    @Column(nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(nullable = false)
    private OffsetDateTime updatedAt;

    protected Condominium(String name, String cnpj, CondominiumTypeEnum type) {
        this.name = name;
        this.cnpj = cnpj;
        this.condominiumType = type;
    }

    @OneToMany(mappedBy = "condominium",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Unit> units = new ArrayList<>();

    @PrePersist
    private void onCreate() {
        createdAt = updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    private void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }
}
