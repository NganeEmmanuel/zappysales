package com.zappysales.backend.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Standard DTO representing API error response payloads.
 */
@Schema(description = "Response payload representing details of an API error")
public class ApiErrorResponse {

    @Schema(description = "ISO-8601 timestamp representing when the exception was raised", example = "2026-06-17T05:47:00.000Z")
    private String timestamp;

    @Schema(description = "HTTP status code representing the error category", example = "400")
    private int status;

    @Schema(description = "HTTP status code description category name", example = "Bad Request")
    private String error;

    @Schema(description = "Detailed explanation message detailing why the error was thrown", example = "Email is required")
    private String message;

    @Schema(description = "The target request path that initiated the transaction", example = "/api/v1/users")
    private String path;

    /**
     * Default constructor for ApiErrorResponse.
     */
    public ApiErrorResponse() {
    }

    /**
     * Constructs a new ApiErrorResponse with specified fields.
     *
     * @param timestamp the ISO-8601 timestamp when the error occurred
     * @param status    the HTTP status code
     * @param error     the short name of the HTTP error
     * @param message   the detail message explaining the error
     * @param path      the request path that caused the error
     */
    public ApiErrorResponse(String timestamp, int status, String error, String message, String path) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    /**
     * Gets the timestamp.
     *
     * @return the timestamp
     */
    public String getTimestamp() {
        return timestamp;
    }

    /**
     * Sets the timestamp.
     *
     * @param timestamp the timestamp to set
     */
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    /**
     * Gets the HTTP status code.
     *
     * @return the status
     */
    public int getStatus() {
        return status;
    }

    /**
     * Sets the HTTP status code.
     *
     * @param status the status to set
     */
    public void setStatus(int status) {
        this.status = status;
    }

    /**
     * Gets the HTTP error reason phrase.
     *
     * @return the error
     */
    public String getError() {
        return error;
    }

    /**
     * Sets the HTTP error reason phrase.
     *
     * @param error the error to set
     */
    public void setError(String error) {
        this.error = error;
    }

    /**
     * Gets the detail message.
     *
     * @return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the detail message.
     *
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * Gets the request path.
     *
     * @return the path
     */
    public String getPath() {
        return path;
    }

    /**
     * Sets the request path.
     *
     * @param path the path to set
     */
    public void setPath(String path) {
        this.path = path;
    }
}
