package br.com.visitsafe.dto.condominium;

import br.com.visitsafe.model.enums.CondominiumTypeEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class CondominiumCreateRequestDTO {

    @NotBlank(message = "O nome do condomínio é obrigatório.")
    private String name;

    @NotBlank(message = "O CNPJ é obrigatório.")
    @Pattern(regexp = "\\d{14}", message = "O CNPJ deve conter 14 dígitos numéricos.")
    private String cnpj;

    @NotNull(message = "O tipo de condomínio é obrigatório.")
    private CondominiumTypeEnum condominiumType;
}
