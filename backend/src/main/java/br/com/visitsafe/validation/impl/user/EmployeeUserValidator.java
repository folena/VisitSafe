package br.com.visitsafe.validation.impl.user;

import org.springframework.stereotype.Component;

import br.com.visitsafe.model.condominium.Condominium;
import br.com.visitsafe.model.user.EmployeeUser;
import br.com.visitsafe.validation.Validator;
import br.com.visitsafe.validation.impl.document.DocumentValidatorHandler;

@Component
public class EmployeeUserValidator implements Validator<EmployeeUser> {

    private final Validator<String> nameValidator;
    private final Validator<String> emailValidator;
    private final Validator<String> passwordValidator;
    private final Validator<Condominium> condominiumValidator;
    private final DocumentValidatorHandler documentValidatorHandler;

    public EmployeeUserValidator(
        Validator<String> nameValidator,
        Validator<String> emailValidator,
        Validator<String> passwordValidator,
        Validator<Condominium> condominiumValidator,
        DocumentValidatorHandler documentValidatorHandler
    ) {
        this.nameValidator = nameValidator;
        this.emailValidator = emailValidator;
        this.passwordValidator = passwordValidator;
        this.condominiumValidator = condominiumValidator;
        this.documentValidatorHandler = documentValidatorHandler;
    }

    @Override
    public void validate(EmployeeUser user) {
        nameValidator.validate(user.getName());
        emailValidator.validate(user.getAccount().getEmail());
        passwordValidator.validate(user.getAccount().getPassword());
        condominiumValidator.validate(user.getCondominium());

        documentValidatorHandler.validate(
            user.getDocumentType(),
            user.getRawDocumentNumber()
        );
    }
}
