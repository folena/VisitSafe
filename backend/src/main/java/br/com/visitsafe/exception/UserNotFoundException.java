package br.com.visitsafe.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }

    public static UserNotFoundException withId(String id) {
        return new UserNotFoundException("User with ID " + id + " was not found.");
    }
}
