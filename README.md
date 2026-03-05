# Collaborative Board API

A RESTful API for a collaborative board application built with Node.js, Express, and Prisma. This project provides endpoints for user authentication, board and card management, and real-time collaboration features.

## Features

- User registration and login with JWT authentication
- Board and card CRUD operations
- Data validation using Zod
- Secure password hashing with bcrypt
- PostgreSQL database managed via Prisma ORM

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/collaborative-board-api.git
   cd collaborative-board-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the root and add:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   JWT_SECRET="your_jwt_secret"
   ```

4. **Run migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

## Running the server

```bash
npm run dev
```

(This assumes you have a `dev` script configured with nodemon.)

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

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
