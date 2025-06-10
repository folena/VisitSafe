package br.com.visitsafe.model.release;

import br.com.visitsafe.model.visitor.DriverVisitor;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "driver_releases")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class DriverRelease extends Release {

    @ManyToOne(optional = false)
    private DriverVisitor visitor;
}
