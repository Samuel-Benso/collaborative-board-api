# Collaborative Board API

A RESTful API for a collaborative board application built with Node.js, Express, and Prisma. This project provides endpoints for user authentication, board and card management, and real-time collaboration features.

---

### Folder Structure & Architecture Reasoning

I implemented a **Layered Architecture** to ensure a clean separation of concerns. This structure makes the API scalable and easier to test.

- **`src/config/`**: Centralizes external configurations like the database connection (Prisma 7 Adapter).
- **`src/routes/`**: The entry point for requests; it handles routing but contains no business logic.
- **`src/controllers/`**: Acts as a bridge. It extracts data from requests and sends back standardized JSON responses.
- **`src/services/`**: The **"Brain"** of the application. All Prisma queries and business logic live here, keeping controllers lean.
- **`src/middleware/`**: Handles cross-cutting concerns like JWT Authentication and Global Error Handling.
- **`src/validators/`**: Uses **Zod** to enforce strict data schemas before requests reach the service layer.

---

### Key Engineering Decisions

#### 1. Prisma 7 Driver Adapters

I utilized the new **Prisma 7 Adapter** pattern (`@prisma/adapter-pg`). By moving away from the heavy Rust-based engine to a native JavaScript driver (`pg`), the application is more lightweight and follows modern Node.js best practices for performance.

#### 2. Security & Authentication

- **Password Hashing**: Implemented `bcryptjs` for one-way salting and hashing.
- **JWT Authorization**: Implemented a `protect` middleware that decodes tokens and attaches the `userId` to the request, ensuring users can only modify their own boards.

#### 3. Global Error Handler

To prevent the server from crashing and to provide a professional user experience, I implemented a centralized error-handling middleware. It catches database constraints (like unique email violations) and sends back consistent, human-readable JSON.

#### 4. Input Validation with Zod

Instead of allowing the database to catch errors, I used **Zod** to validate request bodies (e.g., email format, password length) at the edge. This reduces unnecessary database hits and provides instant feedback to the client.

---

### Database Modeling & Relationships

The schema is designed to maintain **Referential Integrity**:

- **User ↔ Board**: One-to-Many. A board must have an owner.
- **Board ↔ Column**: One-to-Many. Deleting a board handles its columns via relational constraints.
- **Column ↔ Card**: One-to-Many. Cards are nested within columns to represent workflow states.

---

## Project Structure

```
collaborative-board-api/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validators/
├── prisma/
│   └── schema.prisma
├── package.json
└── README.md
```

erDiagram
USER ||--o{ BOARD : owns
BOARD ||--o{ COLUMN : contains
COLUMN ||--o{ CARD : holds
CARD }o--o{ TAG : has

    USER {
        string id PK
        string email UK
        string password
        string name
    }
    BOARD {
        string id PK
        string name
        string userId FK
    }
    COLUMN {
        string id PK
        string title
        string boardId FK
    }
    CARD {
        string id PK
        string title
        string description
        datetime dueDate
        string columnId FK
    }

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
