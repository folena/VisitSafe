package br.com.visitsafe.config;

import br.com.visitsafe.model.enums.DocumentTypeEnum;
import br.com.visitsafe.model.document.Document;
import br.com.visitsafe.validation.Validator;
import br.com.visitsafe.validation.impl.document.CnpjValidator;
import br.com.visitsafe.validation.impl.document.CpfValidator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class DocumentValidatorConfig {

    @Bean
    public Map<DocumentTypeEnum, Validator<Document>> documentValidatorMap(
            CpfValidator cpfValidator,
            CnpjValidator cnpjValidator
    ) {
        return Map.of(
                DocumentTypeEnum.CPF, cpfValidator,
                DocumentTypeEnum.CNPJ, cnpjValidator
        );
    }
}
