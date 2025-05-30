package br.com.visitsafe.model.document;

import lombok.Getter;

@Getter
public class CpfDocument implements Document {

    private final String raw;

    public CpfDocument(String raw) {
        this.raw = raw.replaceAll("\\D", "");
    }

    @Override
    public String getFormatted() {
        return raw.replaceFirst("(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4");
    }

    @Override
    public boolean isValid() {
        return raw.length() == 11;
    }
}
