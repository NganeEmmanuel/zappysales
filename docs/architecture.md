# High-Level Architecture Documentation

This document describes the design layers and responsibilities of the ZappySales application stack.

## High-Level Architecture Flow

The data flow travels through the following layers, adhering to separation of concerns:

```text
       [FRONTEND]
         Pages
           ↓
         Hooks
           ↓
     Zustand Store
           ↓
     Axios Client
           ↓
======================= [NETWORK / REST API]
           ↓
   Spring Boot Controller
           ↓
     Service Layer
           ↓
    Repository Layer
           ↓
    In-Memory Storage
       [BACKEND]
```

---

## Layer Responsibilities

### 1. Frontend Layers

#### Pages
* **Responsibility:** Define the overall route layouts (e.g. `UsersPage` and `UserDetailPage`). They are responsible for high-level structure, connecting components, and managing dialog toggle states.

#### Hooks
* **Responsibility:** Connect UI components to global Zustand state stores. Encapsulate data fetching triggering logic, error states, and operation dispatching (e.g. `useUsers`).

#### Zustand Store
* **Responsibility:** Manage global client-side application state reactively. Holds variables like `users`, `selectedUser`, `loading`, and `error`, and handles synchronous updates upon successful server API actions.

#### Axios Client
* **Responsibility:** Standardized Axios client wrapper. Configured with a default base URL and response/request interceptors to handle response normalization, request headers, and centralize API exception parsing.

---

### 2. Backend Layers

#### REST Controller (`UserController`)
* **Responsibility:** Exposes HTTP endpoints. Validates incoming request payloads using Jakarta Bean Validation constraints (`@Valid`), maps HTTP verbs and routes, and formats standard JSON response packages.

#### Service Layer (`UserService`, `UserServiceImpl`)
* **Responsibility:** Implements business rule requirements. Acts as a bridge between controllers and repositories, manages mapping domain models to DTOs, performs calculations (like page bounds), and implements transaction workflows.

#### Repository Layer (`UserRepository`, `InMemoryUserRepository`)
* **Responsibility:** Abstracts data access operations. Exposes standard CRUD methods, pagination calculations, case-insensitive substring searching logic, and isolates internal domain states via defensive cloning.

#### In-Memory Storage
* **Responsibility:** Thread-safe collection store. Implemented using a `ConcurrentHashMap` to maintain active records during runtime without requiring a persistent database.
