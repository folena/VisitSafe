package br.com.visitsafe.dto.condominium;

import br.com.visitsafe.model.enums.CondominiumTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class CondominiumResponseDTO {
    private UUID id;
    private String name;
    private String cnpj;
    private CondominiumTypeEnum condominiumType;
}
