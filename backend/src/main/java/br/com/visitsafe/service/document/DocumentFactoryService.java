package br.com.visitsafe.service.document;

import br.com.visitsafe.model.document.CnpjDocument;
import br.com.visitsafe.model.document.CpfDocument;
import br.com.visitsafe.model.document.Document;
import br.com.visitsafe.model.enums.DocumentTypeEnum;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DocumentFactoryService {

    public Document create(DocumentTypeEnum type, String value) {
        return switch (type) {
            case CPF -> new CpfDocument(value);
            case CNPJ -> new CnpjDocument(value);
        };
    }
}