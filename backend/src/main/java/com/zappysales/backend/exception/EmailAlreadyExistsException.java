package com.zappysales.backend.exception;

/**
 * Exception thrown when a user operation fails because the email is already in use.
 */
public class EmailAlreadyExistsException extends RuntimeException {

    /**
     * Constructs a new EmailAlreadyExistsException with the specified detail message.
     *
     * @param message the detail message
     */
    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
