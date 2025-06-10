package br.com.visitsafe.exception;

public class ReleaseStatusTransitionException extends RuntimeException {
    public ReleaseStatusTransitionException(String message) {
        super(message);
    }
}
