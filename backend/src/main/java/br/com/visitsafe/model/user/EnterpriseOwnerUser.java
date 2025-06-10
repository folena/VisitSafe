package br.com.visitsafe.model.user;

import br.com.visitsafe.model.unit.EnterpriseUnit;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "enterprise_owner_users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class EnterpriseOwnerUser extends User {

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EnterpriseUnit> units;

}
