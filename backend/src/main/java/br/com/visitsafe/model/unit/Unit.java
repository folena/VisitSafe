package br.com.visitsafe.model.unit;

import br.com.visitsafe.model.Address;
import br.com.visitsafe.model.condominium.Condominium;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Table(
    name = "units",
    uniqueConstraints = @UniqueConstraint(columnNames = {"lot", "block", "condominium_id"})
)
public abstract class Unit {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String lot;

    @Column(nullable = false)
    private String block;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "condominium_id", nullable = false)
    private Condominium condominium;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "street", column = @Column(nullable = false)),
        @AttributeOverride(name = "neighborhood", column = @Column(nullable = false)),
        @AttributeOverride(name = "city", column = @Column(nullable = false)),
        @AttributeOverride(name = "state", column = @Column(nullable = false)),
        @AttributeOverride(name = "postalCode", column = @Column(nullable = false)),
        @AttributeOverride(name = "complement", column = @Column)
    })
    private Address address;

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UnitAssociationCode> associationCodes = new ArrayList<>();
}
