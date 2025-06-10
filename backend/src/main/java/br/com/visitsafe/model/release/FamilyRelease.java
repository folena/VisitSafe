package br.com.visitsafe.model.release;

import br.com.visitsafe.model.visitor.FamilyVisitor;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "family_releases")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class FamilyRelease extends Release {

    @ManyToOne(optional = false)
    private FamilyVisitor visitor;
}
