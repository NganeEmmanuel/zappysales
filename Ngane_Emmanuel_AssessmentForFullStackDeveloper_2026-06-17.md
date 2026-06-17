# TECHNICAL ASSESSMENT REPORT
## Full Stack Developer Assessment — ZappySales Project

* **Candidate Name:** Ngane Emmanuel
* **Role:** Full Stack Developer Assessment
* **Project Name:** ZappySales User & Address Management
* **Date of Submission:** June 17, 2026

---

## 1. Executive Summary

ZappySales is a production-quality, lightweight full-stack administrative application designed to allow system administrators to view, search, paginate, and modify user registration profiles and their associated shipping/billing addresses.

The application follows the **Aggregate Root** pattern: the `User` is the parent record, and multiple `Address` items are managed directly within the User's context (a 1-to-many relationship). 

This assessment implementation goes beyond a minimal proof-of-concept by introducing:
* **Server-side Pagination and Case-insensitive Substring Search** (supporting enterprise-scale data sets).
* **Environment-driven properties** with standard fallback defaults for cloud-native deployment.
* **IP-based in-memory Rate Limiting / Request Throttling** on the backend.
* **35 Vitest + React Testing Library (RTL) tests** on the frontend.
* **47 JUnit 5 + Mockito + MockMvc unit/integration tests** on the backend.

---

## 2. Technical Stack & Architecture

### Backend (Java / Spring Boot)
The backend is structured around a clean, layered architectural design (**Separation of Concerns**):
```text
UserController (REST API endpoints & Validation check)
       ↓
UserService / UserServiceImpl (Business logic, pagination state, and DTO mappings)
       ↓
UserRepository / InMemoryUserRepository (Thread-safe ConcurrentHashMap storage)
```
* **Language/Framework:** Java 21, Spring Boot v4.1.0.
* **Thread-safe Runtime Store:** Managed in-memory via `ConcurrentHashMap` with defensive cloning during reads and writes to isolate repository state.
* **Data Transfer Objects (DTOs):** Strong contracts (`CreateUserRequest`, `UserResponse`, `AddressResponse`, etc.) separate the external API model from internal domain models.
* **API Validation:** Jakarta Bean constraints (`@Email`, `@Size`, `@NotBlank`) integrated with custom HTML input sanitizers (`@SanitizedString`).
* **Security & Throttling:**
  * Custom servlet filter applying security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).
  * Lightweight IP-based rate limiting filter using a sliding-window tracker (`ConcurrentHashMap`).

### Frontend (React / TypeScript)
The client follows a feature-driven folder structure for scalability and modularity:
* **Framework & Tooling:** React 19, Vite 8, TypeScript 6.
* **Styling System:** TailwindCSS v4.0 for utility layout grids and layout properties combined with Material-UI (MUI) v9 for UI component blocks (Buttons, Tables, TextFields, Dialogs).
* **State Management:** Zustand state store (`userStore.ts`) providing reactive global flow with minimal boilerplate.
* **Data Fetching:** Standardized Axios client wrapper (`client.ts`) with custom request/response interceptors to map error codes and normalize response structures.

---

## 3. Directory Layout

### Root Structure
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

## 4. Environment & Prerequisites

### Prerequisites
1. **Java Development Kit (JDK) 21**
2. **Node.js (v18 or higher)** and **npm**
3. **Apache Maven** (or use the packaged `./mvnw` wrapper)

### Configuration

#### Backend
Configure backend settings (Port, CORS, and Rate Limiting) via environment variables or command-line properties:
* `PORT` (Default: `8080`)
* `ALLOWED_ORIGINS` (Default: `http://localhost:3000,http://localhost:5173`)
* `RATE_LIMIT_CAPACITY` (Default: `100` requests per window)
* `RATE_LIMIT_TIME_WINDOW_SECONDS` (Default: `60` seconds)

#### Frontend
Create a `frontend/.env` file with the following variable to link React to the backend server:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

---

## 5. Build, Test, and Execution Instructions

### Backend Commands
Navigate to the `backend/` folder:
```bash
cd backend
```
* **Run Tests:**
  ```bash
  mvn test
  ```
* **Start Application:**
  ```bash
  ./mvnw spring-boot:run
  ```

### Frontend Commands
Navigate to the `frontend/` folder:
```bash
cd frontend
```
* **Install Dependencies:**
  ```bash
  npm install
  ```
* **Run Tests:**
  ```bash
  npm run test
  ```
* **Production Build:**
  ```bash
  npm run build
  ```
* **Start Dev Server:**
  ```bash
  npm run dev
  ```

---

## 6. Design Choices: "User → Address" Flow

Our user-to-address flow was structured to follow administrative best practices:
1. **Aggregate Root UI:**
   * Administrators open the main user directory list page.
   * Basic search and pagination rows render users quickly.
   * Clicking **"View Details"** navigates to a dedicated profile page.
2. **In-Context Modifications (Modals):**
   * Instead of redirecting administrators to separate creation pages (which disrupts navigation), all CRUD modifications (edit profile, add address, edit address, delete address) open inline **MUI Dialogs** on the detail page.
   * This provides a clean single-page dashboard experience and minimizes navigation steps.
3. **State Sync & Centralized Store:**
   * The custom hook `useUsers.ts` wraps the Zustand `userStore.ts` store.
   * All API requests are centralized. On successful address modifications, the store updates the user profile record locally in memory rather than forcing a full page refetch, optimizing network traffic.

---

## 7. Test Suite Validation Results

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

## 8. Candidate Signature

**Ngane Emmanuel**  
Full Stack Developer  
*Camerounian administrative and user management profile application setup.*
