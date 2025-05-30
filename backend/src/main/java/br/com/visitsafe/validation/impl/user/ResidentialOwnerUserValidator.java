package br.com.visitsafe.validation.impl.user;

import org.springframework.stereotype.Component;

import br.com.visitsafe.model.user.ResidentialOwnerUser;
import br.com.visitsafe.validation.Validator;
import br.com.visitsafe.validation.impl.document.DocumentValidatorHandler;

@Component
public class ResidentialOwnerUserValidator implements Validator<ResidentialOwnerUser> {

    private final Validator<String> nameValidator;
    private final Validator<String> emailValidator;
    private final Validator<String> passwordValidator;
    private final DocumentValidatorHandler documentValidatorHandler;

    public ResidentialOwnerUserValidator(
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
    public void validate(ResidentialOwnerUser user) {
        nameValidator.validate(user.getName());
        emailValidator.validate(user.getAccount().getEmail());
        passwordValidator.validate(user.getAccount().getPassword());

        documentValidatorHandler.validate(
            user.getDocumentType(),
            user.getRawDocumentNumber()
        );
    }
}
