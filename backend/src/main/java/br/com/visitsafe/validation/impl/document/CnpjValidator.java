package br.com.visitsafe.validation.impl.document;

import br.com.visitsafe.exception.InvalidCnpjException;
import br.com.visitsafe.model.document.CnpjDocument;
import br.com.visitsafe.model.document.Document;
import br.com.visitsafe.validation.Validator;
import org.springframework.stereotype.Component;

@Component
public class CnpjValidator implements Validator<Document> {

    @Override
    public void validate(Document document) {
        if (document instanceof CnpjDocument cnpj && !cnpj.isValid()) {
            throw new InvalidCnpjException("CNPJ inválido: " + cnpj.getRaw());
        }
    }
}
