package br.com.visitsafe.validation.impl.user;

import org.springframework.stereotype.Component;

import br.com.visitsafe.model.user.EnterpriseOwnerUser;
import br.com.visitsafe.validation.Validator;
import br.com.visitsafe.validation.impl.document.DocumentValidatorHandler;

@Component
public class EnterpriseOwnerUserValidator implements Validator<EnterpriseOwnerUser> {

    private final Validator<String> nameValidator;
    private final Validator<String> emailValidator;
    private final Validator<String> passwordValidator;
    private final DocumentValidatorHandler documentValidatorHandler;

    public EnterpriseOwnerUserValidator(
        Validator<String> nameValidator,
        Validator<String> emailValidator,
        Validator<String> passwordValidator,
        DocumentValidatorHandler documentValidatorHandler
    ) {
        this.nameValidator = nameValidator;
        this.emailValidator = emailValidator;
        this.passwordValidator = passwordValidator;
        this.documentValidatorHandler = documentValidatorHandler;
    }

    @Override
    public void validate(EnterpriseOwnerUser user) {
        nameValidator.validate(user.getName());
        emailValidator.validate(user.getAccount().getEmail());
        passwordValidator.validate(user.getAccount().getPassword());

        documentValidatorHandler.validate(
            user.getDocumentType(),
            user.getRawDocumentNumber()
        );
    }
}
