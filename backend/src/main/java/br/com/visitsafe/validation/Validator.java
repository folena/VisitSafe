package br.com.visitsafe.validation;

public interface Validator<T> {
    void validate(T value);
}
