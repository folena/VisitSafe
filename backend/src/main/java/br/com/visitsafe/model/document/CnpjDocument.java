package br.com.visitsafe.model.document;

import lombok.Getter;

@Getter
public class CnpjDocument implements Document {

    private final String raw;

    public CnpjDocument(String raw) {
        this.raw = raw.replaceAll("\\D", "");
    }

    @Override
    public String getFormatted() {
        return raw.replaceFirst("(\\d{2})(\\d{3})(\\d{3})(\\d{4})(\\d{2})", "$1.$2.$3/$4-$5");
    }

    @Override
    public boolean isValid() {
        return raw.length() == 14;
    }
}
