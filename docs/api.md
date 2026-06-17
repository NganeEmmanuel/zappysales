# ZappySales API Contracts and Swagger Documentation

This document describes the ZappySales REST API endpoints, DTO payload schemas, and Swagger UI interactive console.

---

## 1. Swagger UI and OpenAPI URLs

When running the backend application locally, the interactive documentation console and OpenAPI spec schemas are accessible at:
* **Swagger UI HTML Console:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
* **OpenAPI Spec (JSON):** [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

---

## 2. API Endpoints Overview

The ZappySales REST API exposes the following endpoints under the `/api/v1/users` path:

### User Endpoints

#### GET `/api/v1/users`
* **Description:** Retrieves a paginated and filtered list of user profiles matching search criteria.
* **Query Parameters:**
  * `page` (default: `0`): 0-based page index.
  * `size` (default: `10`): Number of records per page.
  * `search` (default: `""`): Substring search filter (checks first name, last name, and email).
* **Response:** `200 OK` with a `UserPageResponse` JSON body.

#### GET `/api/v1/users/{userId}`
* **Description:** Retrieves details for a specific user and all their addresses.
* **Path Parameters:**
  * `userId`: Unique UUID of the user profile.
* **Response:** `200 OK` with a `UserResponse` JSON body, or `404 Not Found` if user does not exist.

#### POST `/api/v1/users`
* **Description:** Registers a new user profile.
* **Request Body:** JSON payload matching `CreateUserRequest`.
* **Response:** `201 Created` with a `UserResponse` JSON body, or `400 Bad Request` if validations fail or email is in use.

#### PUT `/api/v1/users/{userId}`
* **Description:** Updates the first name and last name fields of an existing user profile.
* **Path Parameters:**
  * `userId`: Unique UUID of the user.
* **Request Body:** JSON payload matching `UpdateUserRequest`.
* **Response:** `200 OK` with a `UserResponse` JSON body, or `400` / `404` error payload.

---

### Address Endpoints

#### POST `/api/v1/users/{userId}/addresses`
* **Description:** Appends a new shipping or billing address to a user profile.
* **Path Parameters:**
  * `userId`: Unique UUID of the user.
* **Request Body:** JSON payload matching `CreateAddressRequest`.
* **Response:** `201 Created` with the updated `UserResponse` JSON body, or `400` / `404` error payload.

#### PUT `/api/v1/users/{userId}/addresses/{addressId}`
* **Description:** Modifies details of an existing user address.
* **Path Parameters:**
  * `userId`: Unique UUID of the user.
  * `addressId`: Unique UUID of the address.
* **Request Body:** JSON payload matching `UpdateAddressRequest`.
* **Response:** `200 OK` with the updated `UserResponse` JSON body, or `400` / `404` error payload.

#### DELETE `/api/v1/users/{userId}/addresses/{addressId}`
* **Description:** Deletes a specific address from a user profile.
* **Path Parameters:**
  * `userId`: Unique UUID of the user.
  * `addressId`: Unique UUID of the address to delete.
* **Response:** `200 OK` with the updated `UserResponse` JSON body, or `404 Not Found` error payload.
