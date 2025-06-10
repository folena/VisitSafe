package br.com.visitsafe.model.visitor;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "service_provider_visitors")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ServiceProviderVisitor extends Visitor {

    @Column(nullable = false)
    private boolean hasCriminalBackgroundCheck;
}