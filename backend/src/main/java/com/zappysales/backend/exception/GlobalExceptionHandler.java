package com.zappysales.backend.exception;

import com.zappysales.backend.dto.response.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.stream.Collectors;

/**
 * Global exception handler that translates server exceptions into standardized API error responses.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles ResourceNotFoundException and returns HTTP 404 (Not Found).
     *
     * @param ex      the exception thrown
     * @param request the http servlet request
     * @return the standardized error response
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleResourceNotFoundException(
            ResourceNotFoundException ex, HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        ApiErrorResponse error = new ApiErrorResponse(
                Instant.now().toString(),
                status.value(),
                status.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(status).body(error);
    }

    /**
     * Handles EmailAlreadyExistsException and returns HTTP 409 (Conflict).
     *
     * @param ex      the exception thrown
     * @param request the http servlet request
     * @return the standardized error response
     */
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ApiErrorResponse> handleEmailAlreadyExistsException(
            EmailAlreadyExistsException ex, HttpServletRequest request) {
        HttpStatus status = HttpStatus.CONFLICT;
        ApiErrorResponse error = new ApiErrorResponse(
                Instant.now().toString(),
                status.value(),
                status.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(status).body(error);
    }

    /**
     * Handles MethodArgumentNotValidException and returns HTTP 400 (Bad Request)
     * with detailed messages from validation failures.
     *
     * @param ex      the validation exception
     * @param request the http servlet request
     * @return the standardized error response containing validation messages
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException ex, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String detailedMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
                .collect(Collectors.joining(", "));

        ApiErrorResponse error = new ApiErrorResponse(
                Instant.now().toString(),
                status.value(),
                status.getReasonPhrase(),
                "Validation failed: " + detailedMessage,
                request.getRequestURI()
        );
        return ResponseEntity.status(status).body(error);
    }

    /**
     * Handles ConstraintViolationException and returns HTTP 400 (Bad Request).
     *
     * @param ex      the validation exception
     * @param request the http servlet request
     * @return the standardized error response containing validation messages
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiErrorResponse> handleConstraintViolationException(
            ConstraintViolationException ex, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String detailedMessage = ex.getConstraintViolations().stream()
                .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
                .collect(Collectors.joining(", "));

        ApiErrorResponse error = new ApiErrorResponse(
                Instant.now().toString(),
                status.value(),
                status.getReasonPhrase(),
                "Validation failed: " + detailedMessage,
                request.getRequestURI()
        );
        return ResponseEntity.status(status).body(error);
    }

    /**
     * Handles all generic unhandled exceptions and returns HTTP 500 (Internal Server Error).
     *
     * @param ex      the unhandled exception
     * @param request the http servlet request
     * @return the standardized error response
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGenericException(
            Exception ex, HttpServletRequest request) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        ApiErrorResponse error = new ApiErrorResponse(
                Instant.now().toString(),
                status.value(),
                status.getReasonPhrase(),
                "An unexpected error occurred: " + ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(status).body(error);
    }
}
