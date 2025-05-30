package br.com.visitsafe.model.unit;

import java.util.UUID;

import br.com.visitsafe.model.user.User;

import java.time.OffsetDateTime;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "unit_association_codes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnitAssociationCode {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String code;

    @ManyToOne
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "used_by_id")
    private User usedBy;

    @ManyToOne
    @JoinColumn(name = "last_updated_by_admin_id")
    private User lastUpdatedByAdmin;
}
