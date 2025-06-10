package br.com.visitsafe.service.user;

import br.com.visitsafe.model.Account;
import br.com.visitsafe.model.condominium.Condominium;
import br.com.visitsafe.model.document.Document;
import br.com.visitsafe.model.enums.DocumentTypeEnum;
import br.com.visitsafe.model.user.*;
import br.com.visitsafe.repository.user.*;
import br.com.visitsafe.service.document.DocumentFactoryService;
import br.com.visitsafe.validation.Validator;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCreateService {

    private final AdminUserRepository adminUserRepo;
    private final EmployeeUserRepository employeeUserRepo;
    private final EnterpriseOwnerUserRepository enterpriseUserRepo;
    private final ResidentialOwnerUserRepository residentialUserRepo;
    private final DocumentFactoryService documentFactory;

    private final Validator<AdminUser> adminValidator;
    private final Validator<EmployeeUser> employeeValidator;
    private final Validator<EnterpriseOwnerUser> enterpriseValidator;
    private final Validator<ResidentialOwnerUser> residentialValidator;
    
    private final PasswordEncoder encoder;

    public AdminUser createAdminUser(String name, String rawDoc, DocumentTypeEnum type, Account account, Condominium condominium) {
        Document doc = documentFactory.create(type, rawDoc);
        AdminUser user = new AdminUser();
        
        account.setPassword(encoder.encode(account.getPassword()));

        user.setName(name);
        user.setRawDocumentNumber(doc.getRaw());
        user.setDocumentType(type);
        user.setAccount(account);
        user.setCondominium(condominium);

        adminValidator.validate(user);
        return adminUserRepo.save(user);
    }

    public EmployeeUser createEmployeeUser(String name, String rawDoc, DocumentTypeEnum type, Account account, Condominium condominium) {
        Document doc = documentFactory.create(type, rawDoc);
        EmployeeUser user = new EmployeeUser();
        
        account.setPassword(encoder.encode(account.getPassword()));

        user.setName(name);
        user.setRawDocumentNumber(doc.getRaw());
        user.setDocumentType(type);
        user.setAccount(account);
        user.setCondominium(condominium);

        employeeValidator.validate(user);
        return employeeUserRepo.save(user);
    }

    public EnterpriseOwnerUser createEnterpriseOwnerUser(String name, String rawDoc, DocumentTypeEnum type, Account account) {
        Document doc = documentFactory.create(type, rawDoc);
        EnterpriseOwnerUser user = new EnterpriseOwnerUser();

        account.setPassword(encoder.encode(account.getPassword()));

        user.setName(name);
        user.setRawDocumentNumber(doc.getRaw());
        user.setDocumentType(type);
        user.setAccount(account);
        user.setUnits(null);

        enterpriseValidator.validate(user);
        return enterpriseUserRepo.save(user);
    }

    public ResidentialOwnerUser createResidentialOwnerUser(String name, String rawDoc, DocumentTypeEnum type, Account account) {
        Document doc = documentFactory.create(type, rawDoc);
        ResidentialOwnerUser user = new ResidentialOwnerUser();

        account.setPassword(encoder.encode(account.getPassword()));
        
        user.setName(name);
        user.setRawDocumentNumber(doc.getRaw());
        user.setDocumentType(type);
        user.setAccount(account);
        user.setUnits(null);

        residentialValidator.validate(user);
        return residentialUserRepo.save(user);
    }
    
}
