package br.com.visitsafe.model.user;

import br.com.visitsafe.model.unit.ResidentialUnit;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "residential_owner_users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class ResidentialOwnerUser extends User {

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResidentialUnit> units;

}
