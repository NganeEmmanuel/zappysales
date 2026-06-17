# TECHNICAL ASSESSMENT REPORT
## Full Stack Developer Assessment — ZappySales Project

* **Candidate Name:** Ngane Emmanuel
* **Role:** Full Stack Developer Assessment
* **Project Name:** ZappySales User & Address Management
* **Date of Submission:** June 17, 2026

---

## 1. Overview

ZappySales is a full-stack, production-quality User and Address Management application built with Spring Boot and React. It acts as a lightweight administrative directory that allows system administrators to view, search, paginate, and modify user profiles and their associated shipping/billing addresses.

The application follows the **Aggregate Root** pattern: the `User` is the parent record, and multiple `Address` items are managed directly within the User's context (a 1-to-many relationship). 

This assessment implementation goes beyond a minimal proof-of-concept by introducing:
* **Server-side Pagination and Case-insensitive Substring Search** (supporting enterprise-scale data sets).
* **Environment-driven properties** with standard fallback defaults for cloud-native deployment.
* **IP-based in-memory Rate Limiting / Request Throttling** on the backend.
* **35 Vitest + React Testing Library (RTL) tests** on the frontend.
* **47 JUnit 5 + Mockito + MockMvc unit/integration tests** on the backend.
* **OpenAPI/Swagger Interactive Console** for easy endpoint verification.

---

## 2. Technologies

### Backend (Java 21 / Spring Boot)
The backend is structured around a clean, layered architectural design representing separation of concerns:
* **Language/Framework:** Java 21, Spring Boot v4.1.0.
* **Thread-safe Runtime Store:** Managed in-memory via `ConcurrentHashMap` with defensive cloning during reads and writes to isolate repository state.
* **Data Transfer Objects (DTOs):** Strong contracts (`CreateUserRequest`, `UserResponse`, `AddressResponse`, etc.) separate the external API model from internal domain models.
* **API Validation:** Jakarta Bean constraints (`@Email`, `@Size`, `@NotBlank`) integrated with custom HTML input sanitizers (`@SanitizedString`).
* **Security & Throttling:**
  * Custom servlet filter applying security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).
  * Lightweight IP-based rate limiting filter using a sliding-window tracker (`ConcurrentHashMap`).
  * OpenAPI/Swagger (`springdoc-openapi`) integration.

### Frontend (React 19 / TypeScript)
The client follows a feature-driven folder structure for scalability and modularity:
* **Framework & Tooling:** React 19, Vite 8, TypeScript 6.
* **Styling System:** TailwindCSS v4.0 for utility layout grids and layout properties combined with Material-UI (MUI) v9 for UI component blocks (Buttons, Tables, TextFields, Dialogs).
* **State Management:** Zustand state store (`userStore.ts`) providing reactive global flow with minimal boilerplate.
* **Data Fetching:** Standardized Axios client wrapper (`client.ts`) with custom request/response interceptors to map error codes and normalize response structures.
* **Component Testing:** Vitest and React Testing Library setup for modular UI verification.

---

## 3. Directory Layout

```text
ZappySales/
├── backend/                       # Spring Boot Project
│   ├── src/main/java/             # Core Source Code
│   ├── src/main/resources/        # application.properties
│   └── src/test/java/             # JUnit Test Suites
├── frontend/                      # React + TypeScript Client
│   ├── src/                       # Client Source Code
│   │   ├── api/                   # Centralized Axios Client
│   │   ├── app/routes/            # URL Routing Layouts
│   │   ├── features/users/        # Feature Pages, Components, Stores, and Hooks
│   │   ├── shared/                # Common Page Skeletons, Layouts, and Spinners
│   │   └── stores/                # Global Application Store
│   ├── test/                      # Vitest Setup Configs
│   └── vitest.config.ts           # Vitest Config File
├── docs/                          # API and System Design Documentation
└── README.md                      # Setup and Running Guide
```

---

## 4. Features

* **User CRUD** - Full capability to view, register, edit, and delete user profiles.
* **Address CRUD** - Management of multiple addresses associated with each user (1-to-many relationship).
* **Server-side Pagination** - Seamless pagination on data grids to support enterprise-scale databases.
* **Search** - Case-insensitive substring search matching email, first name, or last name.
* **Validation** - Input sanity checks (e.g. Email validity, field sizes, mandatory inputs).
* **Input Sanitization** - Custom `@SanitizedString` annotation to prevent XSS.
* **Rate Limiting** - In-memory sliding-window IP-based API throttling filter.
* **Security Headers** - Custom response headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).
* **Snackbar Notifications** - Clean user-facing success and error notifications.
* **Global Exception Handling** - Structured JSON error payloads on failures.
* **Swagger API Docs** - Automated interactive developer UI console.
* **Unit and Integration Tests** - Comprehensive test coverage (47 backend, 35 frontend).

---

## 5. Architecture

### Backend Architectural Layer
```text
Controller (REST API Endpoints & Request Validation)
       ↓
Service (Business Logic, Pagination, and DTO Mappings)
       ↓
Repository (Data Access Abstraction)
       ↓
In-memory storage (Thread-safe ConcurrentHashMap Store)
```

### Frontend Architectural Layer
```text
Pages (Route views, e.g., Directory List, Details Dashboard)
  ↓
Hooks (Custom React hooks, binding UI to stores)
  ↓
Store (Zustand State Store)
  ↓
Services (API Service modules)
  ↓
Axios Client (HTTP instance, request/response interceptors)
  ↓
REST API (Backend server)
```

---

## 6. Environment & Prerequisites

### Prerequisites
1. **Java Development Kit (JDK) 21**
2. **Node.js (v18 or higher)** and **npm**
3. **Apache Maven** (or use the packaged `./mvnw` wrapper)

### Configuration

#### Backend Environment Variables
Configure backend settings via system environment variables or command-line properties:

| Environment Variable | Description | Default Value |
| :--- | :--- | :---: |
| `PORT` | The HTTP port the backend server listens on | `8080` |
| `ALLOWED_ORIGINS` | Comma-separated list of permitted CORS origins | `http://localhost:3000,http://localhost:5173` |
| `RATE_LIMIT_CAPACITY` | Max API requests allowed per client IP within the window | `100` |
| `RATE_LIMIT_TIME_WINDOW_SECONDS` | Throttling time window in seconds | `60` |

#### Frontend Configuration
Create a `frontend/.env` file with the following variable to link React to the backend server:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

---

## 7. Setup Instructions

### Backend Setup
1. Navigate to the `backend/` folder:
   ```bash
   cd backend
   ```
2. Build the project and install dependencies:
   ```bash
   mvn clean install
   ```
3. Start the application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
   *(Or `mvn spring-boot:run`)*

### Frontend Setup
1. Navigate to the `frontend/` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build the production application bundle:
   ```bash
   npm run build
   ```

---

## 8. Testing Instructions

### Backend Tests
Navigate to the `backend/` folder and execute the test command:
```bash
mvn test
```

### Frontend Tests
Navigate to the `frontend/` folder and execute the test command:
```bash
npm run test
```

---

## 9. Swagger Documentation

The interactive Swagger UI API documentation console is available when the backend server is running locally:
* **Swagger UI URL:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
* **OpenAPI Specs (JSON):** [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

---

## 10. Design Choices: "User → Address" Flow

Our user-to-address flow was structured to follow administrative best practices:
1. **Aggregate Root UI:**
   * Administrators open the main user directory list page.
   * Basic search and pagination rows render users quickly.
   * Clicking **"View Details"** navigates to a dedicated profile page.
2. **In-Context Modifications (Modals):**
   * Instead of redirecting administrators to separate creation pages (which disrupts navigation), all CRUD modifications (edit profile, add address, edit address, delete address) open inline **MUI Dialogs** on the detail page.
   * This provides a clean single-page dashboard experience and minimizes navigation steps.
3. **State Sync & Centralized Store:**
   * All API requests are centralized. On successful address modifications, the store updates the user profile record locally in memory rather than forcing a full page refetch, optimizing network traffic.

---

## 11. Test Suite Validation Results

### Backend Validation (JUnit 5 + Mockito + MockMvc)
**47 backend tests passed successfully** covering:
* `InMemoryUserRepositoryTest`: Validates CRUD, deep cloning boundary conditions, pagination offsets, and case-insensitive keyword searches.
* `UserServiceImplTest`: Verifies business logic mapping, exception handling, and pagination calculations.
* `UserControllerTest`: Tests request mapping, query parameters, DTO validations, and HTTP error code responses.
* `UserIntegrationTest`: Verifies full end-to-end user and address lifecycle workflows.

### Frontend Validation (Vitest + React Testing Library)
**35 frontend tests passed successfully** covering:
* **Components:** `UserTable`, `UserProfileCard`, `AddressCard`, `UserFormDialog`, and `AddressFormDialog` validation and callback logic.
* **Stores:** `userStore` action state transitions, loader spinners, and backend error states.
* **Pages:** `UsersPage` (search, pagination) and `UserDetailPage` (profile cards, address grids, and dialog toggles).

---

**Ngane Emmanuel**  
Full Stack Developer  
*Camerounian administrative and user management profile application setup.*
