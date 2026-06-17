# ZappySales Project Summary & Highlights

This document provides a portfolio-level summary of the ZappySales User and Address Management application.

---

## Project Highlights

### 1. Clean Architecture & Modular Design
* Adheres to Separation of Concerns:
  * The backend maintains a strict layered architecture (`Controller` $\rightarrow$ `Service` $\rightarrow$ `Repository` $\rightarrow$ `In-memory Storage`).
  * The frontend organizes code into a feature-driven folder layout, isolating routes (`pages`), custom hooks, state stores (`Zustand`), and API services.

### 2. Modern Full-Stack Stack (Spring Boot + React)
* Powered by **Spring Boot 4.1.0** (with Java 21) on the backend and **React 19** (with TypeScript 6 and Vite 8) on the frontend.
* Integrated styling using Material UI (MUI v9) for rich, polished dashboard interface elements combined with TailwindCSS v4.0 for utility layout grids.

### 3. Full CRUD Capabilities
* Full administration dashboard support to view, create, edit, and delete user registration profiles.
* Full CRUD mapping for managing multiple shipping/billing addresses associated with each user (1-to-many relationship).

### 4. Server-Side Pagination and Search
* Optimized data fetching utilizing server-side pagination to restrict JSON payload sizes.
* Case-insensitive substring search matching email, first name, and last name fields directly at the repository layer.

### 5. Robust Security Measures
* Input validation constraints (`@Email`, `@NotBlank`, `@Size`) checked at the REST API boundary.
* Cross-Site Scripting (XSS) prevention using a custom `@SanitizedString` annotation checking control characters and script inject patterns.
* Browser clickjacking and MIME-sniffing protection using a servlet filter injecting custom HTTP security response headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`).
* In-memory sliding-window IP-based API rate limiting (100 requests per 60 seconds).

### 6. OpenAPI / Swagger Documentation
* Integrated interactive Swagger UI console at `http://localhost:8080/swagger-ui/index.html` using the `springdoc-openapi` starter, detailing all routes, parameter inputs, and DTO schemas.

### 7. Rich Automated Test Coverage
* **Backend:** 47 JUnit 5 + Mockito + MockMvc unit, service, controller, and integration tests passed.
* **Frontend:** 35 Vitest + React Testing Library component, form dialog, Zustand store, and page display tests passed.
