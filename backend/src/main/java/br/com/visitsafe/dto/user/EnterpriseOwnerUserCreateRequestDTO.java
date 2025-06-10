package br.com.visitsafe.dto.user;

import br.com.visitsafe.model.Account;
import br.com.visitsafe.model.enums.DocumentTypeEnum;
import br.com.visitsafe.model.unit.EnterpriseUnit;
import lombok.Data;

import java.util.List;

@Data
public class EnterpriseOwnerUserCreateRequestDTO {
    private String name;
    private String rawDocumentNumber;
    private DocumentTypeEnum documentType;
    private Account account;
    private List<EnterpriseUnit> units;
}
