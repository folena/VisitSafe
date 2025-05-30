package br.com.visitsafe.model.condominium;

import br.com.visitsafe.model.enums.CondominiumTypeEnum;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "enterprise_condominiums")
@DiscriminatorValue("BUSINESS")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true, exclude = "units")
public class EnterpriseCondominium extends Condominium {

    public EnterpriseCondominium(String name, String cnpj) {
        super(name, cnpj, CondominiumTypeEnum.BUSINESS);
   }
   
}
