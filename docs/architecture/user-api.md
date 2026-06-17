# Domain Models

## User

```json
{
  "id": "uuid",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "addresses": []
}
```

---

## Address

```json
{
  "id": "uuid",
  "street": "123 Main Street",
  "city": "Yaounde",
  "state": "Centre",
  "country": "Cameroon",
  "postalCode": "1000"
}
```

---

# Endpoints

## Get All Users

```http
GET /api/v1/users
```

Response:

```json
[
  {
    "id": "uuid",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
]
```

---

## Get User By Id

```http
GET /api/v1/users/{id}
```

Response:

```json
{
  "id": "uuid",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "addresses": []
}
```

---

## Update User

```http
PUT /api/v1/users/{id}
```

Request:

```json
{
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

---

## Create Address

```http
POST /api/v1/users/{id}/addresses
```

Request:

```json
{
  "street": "123 Main Street",
  "city": "Yaounde",
  "state": "Centre",
  "country": "Cameroon",
  "postalCode": "1000"
}
```

---

## Update Address

```http
PUT /api/v1/users/{id}/addresses/{addressId}
```

---

## Delete Address

```http
DELETE /api/v1/users/{id}/addresses/{addressId}
```

---

# Error Format

```json
{
  "timestamp": "2026-06-16T10:00:00",
  "status": 400,
  "message": "Validation failed",
  "path": "/api/v1/users"
}
```

---

# Validation Rules

## User

| Field     | Rules                 |
| --------- | --------------------- |
| email     | required, valid email |
| firstName | required, max 100     |
| lastName  | required, max 100     |

---

## Address

| Field      | Rules    |
| ---------- | -------- |
| street     | required |
| city       | required |
| state      | required |
| country    | required |
| postalCode | required |
