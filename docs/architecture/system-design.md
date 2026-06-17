# ZappySales System Design

## Overview

ZappySales is a lightweight administrative user management application that allows administrators to:

- View users
- Update user profiles
- Manage multiple addresses per user
- Demonstrate clean frontend and backend architecture

---

## High-Level Architecture

```mermaid
flowchart TD

    FE["Frontend<br/>React + MUI"]
    
    API["REST API<br/>Spring Boot"]

    CONTROLLER["Controller Layer"]
    SERVICE["Service Layer"]
    REPOSITORY["Repository Layer"]

    STORAGE["In-Memory Storage"]

    FE -->|"HTTP / REST"| API

    API --> CONTROLLER
    CONTROLLER --> SERVICE
    SERVICE --> REPOSITORY
    REPOSITORY --> STORAGE
```

---

## Backend Architecture

```mermaid
flowchart TD

    REQUEST["HTTP Request"]

    CONTROLLER["Controller"]
    SERVICE["Service"]
    REPOSITORY["Repository"]

    DTO["DTO Layer"]

    MODEL["Domain Model"]

    RESPONSE["HTTP Response"]

    REQUEST --> CONTROLLER

    CONTROLLER --> DTO

    DTO --> SERVICE

    SERVICE --> REPOSITORY

    REPOSITORY --> MODEL

    MODEL --> REPOSITORY

    REPOSITORY --> SERVICE

    SERVICE --> DTO

    DTO --> RESPONSE
```

---

## Frontend Architecture

```mermaid
flowchart TD

    ROUTER["React Router"]

    USERS["Users Feature"]

    ADDRESSES["Addresses Feature"]

    STORE["Zustand Store"]

    API["Axios Service Layer"]

    BACKEND["Spring Boot API"]

    ROUTER --> USERS

    USERS --> ADDRESSES

    USERS --> STORE

    ADDRESSES --> STORE

    STORE --> API

    API --> BACKEND
```