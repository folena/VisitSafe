package br.com.visitsafe.model.document;

public interface Document {
    String getFormatted();
    String getRaw();
    boolean isValid();
}
