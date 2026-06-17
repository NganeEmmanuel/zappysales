# Performance Optimization and Efficiency

This document details the optimizations and performance decisions integrated into ZappySales to ensure lightness, scalability, and responsiveness.

---

## 1. Server-Side Pagination

Instead of fetching the entire user directory database on load (which degrades performance on enterprise-scale data sets), the application delegates pagination to the backend:
* The client passes `page` and `size` parameters.
* The repository streams records and slices them using Java streams `.skip((long) page * size).limit(size)` dynamically.
* Reduces network payload sizes and speeds up browser DOM rendering.

---

## 2. Server-Side Search Filtering

Searching is processed directly at the repository layer using case-insensitive substring matches:
* Filters user rows by First Name, Last Name, or Email.
* Resets the page index to `0` when initiating a search.
* Minimizes data volume returned over HTTP.

---

## 3. Zustand Local Mutations

Instead of triggering a full page reload or forcing a complete table refetch after modifying a user's address (Add, Edit, Delete), ZappySales updates the client state store locally:
* When an address action completes successfully, the response returns the updated aggregate `UserResponse`.
* The Zustand store merges this user object into the local state arrays.
* Offers instantaneous user feedback and eliminates redundant HTTP GET refetch requests.

---

## 4. Reduced Network Utilization

* Address data is nested directly within the User aggregate DTO.
* Modifying user details or addresses returns the updated User aggregate directly.
* Eliminates the need for multiple round-trips to retrieve sub-entities.

---

## 5. Axios Client Interceptors

* Standardizes API transaction configurations.
* Handles global token additions or headers.
* Parses server errors centrally to prevent browser runtime hangs.
