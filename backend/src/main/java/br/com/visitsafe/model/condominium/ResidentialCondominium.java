package br.com.visitsafe.model.condominium;
import br.com.visitsafe.model.enums.CondominiumTypeEnum;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "residential_condominiums")
@DiscriminatorValue("RESIDENTIAL")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true, exclude = "units")
public class ResidentialCondominium extends Condominium {
    public ResidentialCondominium(String name, String cnpj) {
        super(name, cnpj, CondominiumTypeEnum.RESIDENTIAL);
    }
}