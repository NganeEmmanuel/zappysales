# Backend Design Decisions

## Why DTOs?

DTOs isolate API contracts from domain models.

Benefits:

- Safer API evolution
- Better validation
- Cleaner responses

---

## Why Repository Layer?

Although data is stored in memory, a repository abstraction allows future migration to:

- PostgreSQL
- MySQL
- MongoDB

without affecting business logic.

---

## Why Service Layer?

Encapsulates business rules and keeps controllers lightweight.

---

## Why In-Memory Storage?

Assessment requirements explicitly allow non-persistent storage.

This approach keeps the solution lightweight while demonstrating architecture principles.