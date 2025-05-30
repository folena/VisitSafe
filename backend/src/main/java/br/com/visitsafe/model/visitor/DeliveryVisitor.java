package br.com.visitsafe.model.visitor;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "delivery_visitors")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class DeliveryVisitor extends Visitor {

    @Column(nullable = false)
    private boolean hasCriminalBackgroundCheck;
}