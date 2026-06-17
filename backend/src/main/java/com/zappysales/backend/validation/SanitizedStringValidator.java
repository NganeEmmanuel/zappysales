package com.zappysales.backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * Validator implementation for {@link SanitizedString} constraint.
 * Verifies that a string is trimmed, contains no control characters, and does
 * not contain scripting patterns if strict validation is enabled.
 */
public class SanitizedStringValidator implements ConstraintValidator<SanitizedString, String> {

    private boolean strict;

    @Override
    public void initialize(SanitizedString constraintAnnotation) {
        this.strict = constraintAnnotation.strict();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Null values are valid (delegated to @NotNull/@NotBlank)
        if (value == null) {
            return true;
        }

        // Trim check: string must not contain leading or trailing whitespaces
        if (!value.equals(value.trim())) {
            return false;
        }

        // Control characters check: string must not contain control characters (ASCII < 32 or DEL 127)
        for (int i = 0; i < value.length(); i++) {
            char c = value.charAt(i);
            if (c < 32 || c == 127) {
                return false;
            }
        }

        // Strict mode check: reject scripting injection patterns (case-insensitive)
        if (strict) {
            String lowerValue = value.toLowerCase();
            if (lowerValue.contains("<script")
                    || lowerValue.contains("</script")
                    || lowerValue.contains("javascript:")) {
                return false;
            }
        }

        return true;
    }
}
