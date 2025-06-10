package br.com.visitsafe.model.release;

import br.com.visitsafe.model.visitor.GuestVisitor;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "guest_releases")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class GuestRelease extends Release {

    @ManyToOne(optional = false)
    private GuestVisitor visitor;
}