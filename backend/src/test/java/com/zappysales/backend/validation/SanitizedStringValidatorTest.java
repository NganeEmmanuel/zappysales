package com.zappysales.backend.validation;

import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Unit tests for {@link SanitizedStringValidator}.
 */
class SanitizedStringValidatorTest {

    private SanitizedStringValidator validator;
    private ConstraintValidatorContext context;

    @BeforeEach
    void setUp() {
        validator = new SanitizedStringValidator();
        context = Mockito.mock(ConstraintValidatorContext.class);
    }

    private void initializeValidator(boolean strict) {
        SanitizedString annotation = Mockito.mock(SanitizedString.class);
        Mockito.when(annotation.strict()).thenReturn(strict);
        validator.initialize(annotation);
    }

    @Test
    void isValid_NullInput_ReturnsTrue() {
        initializeValidator(false);
        assertTrue(validator.isValid(null, context));
    }

    @Test
    void isValid_TrimmedNormalString_ReturnsTrue() {
        initializeValidator(false);
        assertTrue(validator.isValid("John Doe", context));
        assertTrue(validator.isValid("john.doe@example.com", context));
    }

    @Test
    void isValid_UnTrimmedString_ReturnsFalse() {
        initializeValidator(false);
        assertFalse(validator.isValid(" John Doe", context));
        assertFalse(validator.isValid("John Doe ", context));
        assertFalse(validator.isValid(" John Doe ", context));
    }

    @Test
    void isValid_ControlCharacters_ReturnsFalse() {
        initializeValidator(false);
        // ASCII 0 (NUL)
        assertFalse(validator.isValid("John\u0000Doe", context));
        // ASCII 7 (BEL)
        assertFalse(validator.isValid("John\u0007Doe", context));
        // ASCII 127 (DEL)
        assertFalse(validator.isValid("John" + (char) 127 + "Doe", context));
    }

    @Test
    void isValid_ScriptingInNonStrict_ReturnsTrue() {
        initializeValidator(false);
        assertTrue(validator.isValid("<script>alert('hack')</script>", context));
        assertTrue(validator.isValid("javascript:void(0)", context));
    }

    @Test
    void isValid_ScriptingInStrict_ReturnsFalse() {
        initializeValidator(true);
        assertFalse(validator.isValid("<script>alert('hack')</script>", context));
        assertFalse(validator.isValid("</script>", context));
        assertFalse(validator.isValid("javascript:void(0)", context));
        // Case insensitivity check
        assertFalse(validator.isValid("<SCRIPT>", context));
        assertFalse(validator.isValid("JavaScript:alert(1)", context));
    }
}
