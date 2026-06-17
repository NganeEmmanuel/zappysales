# Testing Strategy and Execution Guide

This document describes the validation strategy, testing layers, and execution instructions for the ZappySales project.

---

## 1. Backend Testing Suite

The backend utilizes JUnit 5, Mockito, and Spring Boot's MockMvc testing tools to cover 47 validation scenarios.

### Test Categories

#### Repository Tests (`InMemoryUserRepositoryTest`)
* **Focus:** Tests CRUD operations, deep cloning boundaries (isolation), page offsets, and case-insensitive keyword searches.
* **Scope:** Unit testing the runtime storage layer directly.

#### Service Tests (`UserServiceImplTest`)
* **Focus:** Verifies business logic, pagination data transformation calculations, mapping between domains and DTOs, and exception throwing.
* **Scope:** Mocking repositories using Mockito to test service layer calculations in isolation.

#### Controller Tests (`UserControllerTest`)
* **Focus:** Tests request parameter binding, Jakarta validation constraints validation, custom SanitizedString validator behavior, and error response payload formatting.
* **Scope:** Testing HTTP endpoints using MockMvc without launching a servlet container.

#### Integration Tests (`UserIntegrationTest`)
* **Focus:** Verifies full end-to-end user and address lifecycle workflows (creation, profile updates, multiple address modifications, and deletes).
* **Scope:** Integration testing across controllers, services, and repositories.

### Execution Command
Navigate to the `backend/` folder and run Maven test:
```bash
cd backend
mvn test
```

---

## 2. Frontend Testing Suite

The frontend uses Vitest, React Testing Library (RTL), and jsdom to cover 35 test cases.

### Test Categories

#### Components
* **UserTable.test.tsx**: Verifies that user collections render correctly, checks empty states, and row details click callbacks.
* **UserProfileCard.test.tsx**: Confirms name and email rendering.
* **AddressCard.test.tsx**: Verifies address detail fields and checks edit/delete callbacks.

#### Dialogs
* **UserFormDialog.test.tsx**: Verifies creation and edit form layouts, input bindings, and validation checking (disabling the save button on invalid emails).
* **AddressFormDialog.test.tsx**: Asserts address field validation constraints and callback submission.

#### Store
* **userStore.test.ts**: Verifies Zustand state mutations, loading states, error states, and local mutations on success.

#### Routing & Pages
* **UsersPage.test.tsx** and **UserDetailPage.test.tsx**: Verifies layout renders, navigation callbacks, loading spinner displays, error dialog displays, and routing transitions.

### Execution Commands
Navigate to the `frontend/` folder:
```bash
cd frontend

# Run test suite once
npm run test

# Run tests in watch mode
npm run test:watch
```
