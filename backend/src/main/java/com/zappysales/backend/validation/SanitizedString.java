package com.zappysales.backend.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Custom Jakarta Bean Validation annotation to validate that strings are sanitized.
 * Rejects strings with leading/trailing whitespaces, control characters, or script tags in strict mode.
 */
@Documented
@Constraint(validatedBy = SanitizedStringValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface SanitizedString {

    /**
     * The default validation message if the string is not sanitized.
     *
     * @return the default error message
     */
    String message() default "String must be trimmed and contain no control characters or unsafe HTML/JS patterns";

    /**
     * The validation groups.
     *
     * @return the groups
     */
    Class<?>[] groups() default {};

    /**
     * The payload metadata.
     *
     * @return the payload
     */
    Class<? extends Payload>[] payload() default {};

    /**
     * If true, strict validation mode is enabled, rejecting HTML tags and javascript URLs.
     *
     * @return true if strict mode is enabled, false otherwise
     */
    boolean strict() default false;
}
