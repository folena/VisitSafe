package br.com.visitsafe.exception;

public class NameInvalidException extends RuntimeException {
    public NameInvalidException(String message) {
        super(message);
    }
}