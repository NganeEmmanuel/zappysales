# ZappySales

A lightweight full-stack administrative user management application built with **Spring Boot** and **React**. The application allows administrators to view and modify user profiles and manage multiple addresses associated with each user.

---

# Assessment Overview

This project was developed as part of a Full Stack Developer technical assessment.

The application demonstrates:

* Clean Architecture principles
* Separation of Concerns
* RESTful API design
* Feature-based frontend architecture
* State management using Zustand
* Reusable UI components
* Input validation and error handling
* Automated testing
* Professional project documentation

---

# Features

## User Management

* View all users
* View user details
* Update user profile information
* Email validation
* Form validation

## Address Management

* View user addresses
* Add new addresses
* Edit existing addresses
* Delete addresses
* One-to-many relationship support (User → Addresses)

## Technical Features

* Feature-based frontend architecture
* Service-based backend architecture
* DTO-based API contracts
* Global exception handling
* Environment-based configuration
* Automated tests
* Responsive Material UI interface

---

# Technology Stack

## Frontend

* React
* TypeScript
* Material UI (MUI)
* Zustand
* Axios
* React Router

## Backend

* Java 17+
* Spring Boot
* Spring Validation
* Spring Web
* JUnit 5
* Mockito

---

# Project Structure

```text
ZappySales/

├── frontend/
│
├── backend/
│
├── docs/
│   ├── architecture/
│   ├── api-contracts/
│   └── screenshots/
│
└── README.md
```

---

# User → Address Flow

The application follows a straightforward administrative workflow:

1. Administrator opens the User List page.
2. Administrator selects a user.
3. Administrator navigates to the User Details page.
4. Administrator can:

   * Update profile information
   * Add addresses
   * Edit addresses
   * Delete addresses
5. Changes are persisted in application memory and immediately reflected in the UI.

This flow was chosen because it mirrors common CRM and administrative systems where a user acts as the aggregate root and addresses are managed within the user's context.

---

# Environment Configuration

## Backend

Create:

```bash
backend/.env
```

Example:

```env
SERVER_PORT=8080

ALLOWED_ORIGINS=http://localhost:5173

RATE_LIMIT_REQUESTS=100

RATE_LIMIT_WINDOW_MINUTES=1
```

---

## Frontend

Create:

```bash
frontend/.env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

---

# Running the Backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies and start the application:

```bash
./mvnw spring-boot:run
```

Or:

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

# Running the Frontend

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Running Tests

## Backend

Run:

```bash
mvn test
```

Test coverage includes:

* Service layer tests
* Controller tests
* Integration tests

---

## Frontend

Run:

```bash
npm run test
```

Test coverage includes:

* Store tests
* Component tests
* Page tests

---

# API Documentation

The API contracts are documented in:

```text
docs/api-contracts/
```

Additional architectural documentation can be found in:

```text
docs/architecture/
```

---

# Design Decisions

## Why a Layered Backend?

The backend follows:

```text
Controller
    ↓
Service
    ↓
Repository
```

This structure improves maintainability, testability, and separation of concerns.

---

## Why DTOs?

DTOs isolate API contracts from internal domain models and provide a clear validation boundary.

---

## Why Zustand?

Zustand provides lightweight and scalable state management with minimal boilerplate while maintaining excellent developer experience.

---

## Why In-Memory Storage?

The assessment explicitly allows runtime storage without persistence.

An in-memory repository was chosen to keep the implementation lightweight while still demonstrating proper architecture and abstraction.

---

# Security Considerations

The application includes:

* Request validation
* Global exception handling
* CORS configuration
* Security response headers
* Basic request throttling

Authentication and authorization were intentionally excluded because they fall outside the scope of the assessment requirements.

---

# Future Improvements

Potential production enhancements include:

* Persistent database storage
* Authentication and authorization
* Audit logging
* Pagination and filtering
* Docker support
* CI/CD pipeline
* OpenAPI / Swagger documentation
* Role-based access control

---

# Author

Ngane Emmanuel
Full Stack Developer
