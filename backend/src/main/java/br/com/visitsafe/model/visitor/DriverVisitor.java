package br.com.visitsafe.model.visitor;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "driver_visitors")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class DriverVisitor extends Visitor {

    @Column(nullable = false)
    private boolean hasCriminalBackgroundCheck;
}
