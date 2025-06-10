package br.com.visitsafe.model.unit;

import br.com.visitsafe.model.user.EnterpriseOwnerUser;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "enterprise_units")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class EnterpriseUnit extends Unit {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id")
    private EnterpriseOwnerUser owner;

}
