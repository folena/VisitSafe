package br.com.visitsafe.dto.user;

import br.com.visitsafe.model.Account;
import br.com.visitsafe.model.enums.DocumentTypeEnum;
import br.com.visitsafe.model.unit.ResidentialUnit;
import lombok.Data;

import java.util.List;

@Data
public class ResidentialOwnerUserCreateRequestDTO {
    private String name;
    private String rawDocumentNumber;
    private DocumentTypeEnum documentType;
    private Account account;
    private List<ResidentialUnit> units;
}
