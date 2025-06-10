package br.com.visitsafe.validation.impl.document;

import br.com.visitsafe.exception.InvalidCpfException;
import br.com.visitsafe.model.document.CpfDocument;
import br.com.visitsafe.model.document.Document;
import br.com.visitsafe.validation.Validator;
import org.springframework.stereotype.Component;

@Component
public class CpfValidator implements Validator<Document> {

    @Override
    public void validate(Document document) {
        if (document instanceof CpfDocument cpf && !cpf.isValid()) {
            throw new InvalidCpfException("CPF inválido: " + cpf.getRaw());
        }
    }
}
