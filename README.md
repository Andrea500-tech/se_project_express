# WTWR (What to Wear?): Back End

This project is the back end for the WTWR application. It provides a RESTful API for managing users and clothing items, including features like user authorization, item creation/deletion, and the ability to like/unlike items. The goal is to build a secure, tested, and deployed server that integrates with the WTWR frontend.

---

## Technologies and Techniques Used

- **Express.js** — framework for building the server and handling routes.
- **MongoDB + Mongoose** — database and ODM for storing users and clothing items.
- **Validator** — input validation (e.g., checking valid URLs).
- **ESLint (Airbnb config)** — enforces consistent code style and best practices.
- **Nodemon** — enables hot reload during development.
- **Error Handling** — custom error codes (400, 404, 500) with CastError and DocumentNotFoundError checks.
- **Authorization** — routes secured with user ownership checks.
- **REST API Design** — endpoints for users and clothing items (`/users`, `/items`).

### Notable Implementation Details

- Clothing items router mounted at `/items` to match frontend/tests.
- `likes` field defaults to `[]` at the field level for consistent like/unlike behavior.
- Centralized error handling ensures invalid IDs return **400 Bad Request** instead of **500 Internal Server Error**.
- Validation rules enforce proper name length, weather enum values, and valid image URLs.

---

## Running the Project

```bash
npm run start   # Launch the server
npm run dev     # Launch the server with hot reload
```
