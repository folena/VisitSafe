package br.com.visitsafe.model.release;

import br.com.visitsafe.model.visitor.DeliveryVisitor;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "delivery_releases")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class DeliveryRelease extends Release {

    @ManyToOne(optional = false)
    private DeliveryVisitor visitor;
}