package br.com.visitsafe.model.unit;

import br.com.visitsafe.model.user.ResidentialOwnerUser;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "residential_units")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class ResidentialUnit extends Unit {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id")
    private ResidentialOwnerUser owner;

}
