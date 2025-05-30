package br.com.visitsafe.dto.user;

import br.com.visitsafe.model.Account;
import br.com.visitsafe.model.condominium.Condominium;
import br.com.visitsafe.model.enums.DocumentTypeEnum;
import lombok.Data;

@Data
public class AdminUserCreateRequestDTO {
    private String name;
    private String rawDocumentNumber;
    private DocumentTypeEnum documentType;
    private Account account;
    private Condominium condominium;
}
