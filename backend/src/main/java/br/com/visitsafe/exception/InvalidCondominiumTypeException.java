package br.com.visitsafe.exception;

public class InvalidCondominiumTypeException extends RuntimeException {
    public InvalidCondominiumTypeException(String message) {
        super(message);
    }
}
