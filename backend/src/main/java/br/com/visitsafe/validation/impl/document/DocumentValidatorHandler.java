package br.com.visitsafe.validation.impl.document;

import br.com.visitsafe.model.document.CnpjDocument;
import br.com.visitsafe.model.document.CpfDocument;
import br.com.visitsafe.model.document.Document;
import br.com.visitsafe.model.enums.DocumentTypeEnum;
import br.com.visitsafe.validation.Validator;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class DocumentValidatorHandler {

    private final Map<DocumentTypeEnum, Validator<Document>> validatorMap;

    public DocumentValidatorHandler(Map<DocumentTypeEnum, Validator<Document>> validatorMap) {
        this.validatorMap = validatorMap;
    }

    public Document validate(DocumentTypeEnum type, String rawValue) {
        Document document = switch (type) {
            case CPF -> new CpfDocument(rawValue);
            case CNPJ -> new CnpjDocument(rawValue);
        };

        Validator<Document> validator = validatorMap.get(type);
        if (validator == null) {
            throw new IllegalArgumentException("No validator found for type: " + type);
        }

        validator.validate(document);
        return document;
    }
}
