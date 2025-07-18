# MomsCompanion Backend

This is the backend server for the MomsCompanion project, built with Node.js, Express, and MongoDB. It provides RESTful APIs for user management, books, exercises, and image classification via a Python model server.

## Features

- **User Authentication**: Register, login, logout, password change, JWT-based authentication.
- **User Profile**: Update avatar, account details, allergies, expected date, and fetch closest hospitals.
- **Books API**: Upload, fetch, and remove books with cover images.
- **Exercise API**: Upload, fetch, and remove exercises with images.
- **Image Classification**: Forwards uploaded images to a Python server for fetal brain classification.
- **Cloudinary Integration**: Handles image uploads for avatars, books, and exercises.
- **Secure Cookies**: Stores access and refresh tokens securely.

## Folder Structure

```
BackEnd/
  ├── public/           # Static files and temp uploads
  ├── src/
  │   ├── controller/   # Route controllers
  │   ├── database/     # DB connection
  │   ├── middleware/   # Middlewares (auth, multer)
  │   ├── models/       # Mongoose models
  │   ├── routes/       # Express routes
  │   ├── utils/        # Utility functions
  │   ├── app.js        # Main Express app
  │   ├── constant.js   # Constants
  │   └── index.js      # Entry point
  ├── uploads/          # Uploaded files
  ├── .env              # Environment variables
  └── package.json      # Dependencies and scripts
```

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in values for:
     - `MONGODB_URI`
     - `ACCESS_TOKEN_SECRET`
     - `REFRESH_TOKEN_SECRET`
     - `CORS_ORIGIN`
     - `GEMINI_API_KEY`
     - `GO_MAP_API_KEY`
     - etc.

3. **Run the server:**
   ```sh
   npm start
   ```

4. **Image Classification:**
   - Ensure the Python server is running at `http://127.0.0.1:5000`.

## API Endpoints

### User

- `POST /user/register` — Register new user (with avatar upload)
- `POST /user/login` — Login
- `POST /user/logout` — Logout
- `PATCH /user/updateUserAvatar` — Update avatar
- `PATCH /user/updateAccountDetailsTextBased` — Update age, weight, height
- `PATCH /user/acceptAllergiesAndMedicalCondition` — Add allergies
- `PATCH /user/acceptExpectedDate` — Set expected date
- `POST /user/acceptPromptAndGenerateRecipies` — Get AI-generated diet plan
- `POST /user/getClosestHospitals` — Find nearby hospitals
- `GET /user/getExpectedDate` — Get expected date

### Books

- `POST /book/uploadBooks` — Upload book and cover image
- `GET /book/fetchBooks` — Get all books
- `GET /book/fetchBookByName` — Get book by name
- `DELETE /book/removeBookFromStore` — Remove book

### Exercises

- `POST /exercise/createNewExercise` — Upload exercise image and details
- `GET /exercise/fetchAllExercise` — Get all exercises
- `POST /exercise/fetchExerciseByTrimester` — Get exercises by trimester
- `DELETE /exercise/removeExerciseFromStore` — Remove exercise

### Image Classification

- `POST /classify` — Upload image for classification (forwards to Python server)

## Notes

- Images are stored temporarily in `public/temp` before being uploaded to Cloudinary.
- JWT tokens are used for authentication and stored in secure cookies.
- Make sure MongoDB and the Python model server are running.
