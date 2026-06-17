# Security Configuration and Best Practices

This document describes the security controls and policies implemented in the ZappySales full-stack application.

---

## 1. Request Input Validation

To ensure data integrity and guard against invalid inputs, the application leverages Jakarta Validation constraints (integrated with Spring Boot's validation module):
* **`@NotBlank`**: Enforces that fields (e.g. Email, Names, Street, City) are not null and contain at least one non-whitespace character.
* **`@Size`**: Defines character limits on input fields to prevent buffer overload or massive database insertions (e.g. 100 characters for email, 50 characters for names).
* **`@Email`**: Asserts that the email input conforms to a standard, valid RFC 5322 email syntax.

---

## 2. Custom `@SanitizedString` Annotation

Cross-Site Scripting (XSS) is prevented at the serialization boundary using a custom validation annotation `@SanitizedString` validated by `SanitizedStringValidator`:
* **Trim Checks**: Rejects any inputs containing leading or trailing whitespaces to maintain clean data.
* **Control Characters**: Rejects strings containing ASCII control characters (ASCII < 32 or DEL 127).
* **Strict Mode (`strict = true`)**: Parses inputs for script injection patterns (e.g. `<script`, `</script`, or `javascript:`) and rejects them if found.

---

## 3. AOP Sanitization and Interception

Jakarta validation acts at the controller method level. Using Spring's standard controller argument binding and method interception mechanisms (acting as Aspect-Oriented method interceptors), any request payload annotated with `@Valid` is intercepted before executing the controller code. If validations fail, a `MethodArgumentNotValidException` is thrown and handled globally.

---

## 4. HTTP Security Response Headers

The application appends safety headers to all HTTP responses via `SecurityHeadersFilter` to protect client browsers:
* **`X-Content-Type-Options: nosniff`**: Prevents the browser from MIME-sniffing responses away from the declared content-type.
* **`X-Frame-Options: DENY`**: Protects the application from clickjacking attempts by forbidding the browser from rendering the app inside an iframe.
* **`Referrer-Policy: no-referrer`**: Prevents sensitive client-side context from being leaked in the HTTP Referer header on outbound links.

---

## 5. IP-Based Rate Limiting (Throttling)

API abuse and Denial of Service (DoS) attacks are controlled at the servlet filter layer via `RateLimitingFilter`:
* **Sliding-Window tracking**: Request history is tracked per unique IP address in a concurrent in-memory cache.
* **Configuration defaults**: Restricts clients to `100` requests per `60` seconds by default.
* **HTTP 429 Too Many Requests**: Returns a structured JSON error body with a `429` status code and explanatory payload when the limit is breached.

---

## 6. Environment Variables

To adhere to the Twelve-Factor App principles, settings are isolated from the code using configurable environment properties in `application.properties`:
* **`PORT`**: Customizes the HTTP port (default `8080`).
* **`ALLOWED_ORIGINS`**: Explicitly defines authorized CORS origins to restrict cross-origin browser scripting.
* **`RATE_LIMIT_CAPACITY`** and **`RATE_LIMIT_TIME_WINDOW_SECONDS`**: Customizes rate limiting thresholds.

---

## 7. Global Exception Handling

Exceptions are trapped at a central boundary using the `GlobalExceptionHandler` controller advice:
* Converts system, validation, and custom business exceptions into a standardized JSON response format (`ApiErrorResponse`).
* Prevents leaking raw java stack traces to the client.
