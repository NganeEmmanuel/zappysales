# ZappySales Backend REST API Documentation

This document describes the REST API endpoints and integration of OpenAPI/Swagger documentation for the ZappySales backend.

## 1. OpenAPI & Swagger Integration

OpenAPI/Swagger documentation has been integrated into the ZappySales Spring Boot backend application using the **Springdoc OpenAPI** starter library.

### Dependency Added
The following dependency was integrated in `pom.xml`:
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.8.5</version>
</dependency>
```

### Swagger UI Endpoint URL
When running the backend application locally, the interactive API documentation console is accessible at:
* **Swagger UI HTML Console:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
* **OpenAPI Specs (JSON):** [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

---

## 2. Screenshots Section

*(Place screenshot images of the Swagger UI dashboard here to visualize endpoints)*

* **Dashboard View:**
  ![Swagger UI Dashboard Placeholder](../../docs/screenshots/swagger_ui_dashboard.png)
  
* **Schema Definition View:**
  ![Swagger UI Schema Definition Placeholder](../../docs/screenshots/swagger_ui_schemas.png)

---

## 3. Endpoints Overview

The following table summarizes all REST endpoints exposed by the ZappySales API:

| HTTP Method | Request Path | Description | Success Code | Error Codes |
| :--- | :--- | :--- | :---: | :---: |
| **GET** | `/api/v1/users` | Retrieve paginated users matching optional search query | `200 OK` | `400` |
| **GET** | `/api/v1/users/{userId}` | Retrieve details of a specific user profile and addresses | `200 OK` | `404` |
| **POST** | `/api/v1/users` | Create a new user profile registration | `201 Created` | `400` |
| **PUT** | `/api/v1/users/{userId}` | Update basic user profile data (first name/last name) | `200 OK` | `400`, `404` |
| **POST** | `/api/v1/users/{userId}/addresses` | Add a new address to a user profile | `201 Created` | `400`, `404` |
| **PUT** | `/api/v1/users/{userId}/addresses/{addressId}` | Update details of an existing user address | `200 OK` | `400`, `404` |
| **DELETE** | `/api/v1/users/{userId}/addresses/{addressId}` | Delete a specific address from a user profile | `200 OK` | `404` |

---

## 4. DTO Schemas documented
All core API payloads are documented with OpenAPI schemas containing description fields and real-world examples:
* **CreateUserRequest** - Payload to register a new user.
* **UpdateUserRequest** - Payload to edit basic name details.
* **CreateAddressRequest** - Payload to append a new address.
* **UpdateAddressRequest** - Payload to update address details.
* **UserResponse** - Detailed representation of a user and their address records.
* **AddressResponse** - Representation of a single address.
* **UserPageResponse** - Paginated response payload container.
* **ApiErrorResponse** - Standard payload details returned on failures.
