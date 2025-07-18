# MomsCompanion Frontend

This is the frontend for MomsCompanion, a pregnancy support platform for expecting mothers. Built with React, Vite, and TailwindCSS, it provides a modern, responsive user interface for accessing personalized health resources, hospital finder, book library, exercise plans, and sonography report analysis.

## Features

- **User Authentication:** Register, login, logout, and manage profile with avatar upload.
- **Personalized Dashboard:** Countdown to delivery, user profile, and quick access to main features.
- **Location-Based Hospital Finder:** Search for nearby hospitals using address input.
- **Diet Plan Generator:** Get trimester-specific diet recommendations powered by AI.
- **Exercise Library:** Browse and view trimester-specific exercises with images and details.
- **Book Library:** Access curated pregnancy-related books.
- **Sonography Report Analysis:** Upload sonography images for fetal brain growth classification.
- **Responsive Design:** Optimized for mobile and desktop.

## Folder Structure

```
Frontend/
  ├── public/                # Static assets (images, fonts, backgrounds)
  ├── src/
  │   ├── assets/            # Local images and icons
  │   ├── components/
  │   │   ├── Countdown.jsx
  │   │   ├── ui/            # Main UI components (Navbar, HomePage, Books, Exercise, etc.)
  │   │   ├── Images/
  │   ├── config/            # Axios config
  │   ├── lib/               # Utility functions
  │   ├── routes/            # AppRoutes.jsx
  │   ├── App.jsx
  │   ├── main.jsx
  │   ├── App.css
  │   ├── index.css
  ├── index.html
  ├── package.json
  ├── tailwind.config.js
  ├── README.md
  └── .env
```

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   - Create a `.env` file for API endpoints if needed.

3. **Run the development server:**
   ```sh
   npm run dev
   ```

4. **Build for production:**
   ```sh
   npm run build
   ```

## Main Pages & Components

- **LandingPage:** Welcome screen with motivational message and quick links to login/register.
- **HomePage:** Dashboard with countdown, feature cards for hospital finder, diet plans, exercises, and books.
- **Navbar:** Navigation bar with login/signup or profile avatar.
- **RegisterUser & Login:** User registration and login forms.
- **UserProfile & UpdateProfile:** View and update user details, avatar, allergies, expected date.
- **Books:** Displays book library with cover images and authors.
- **Exercise:** Trimester-based exercise cards with details and images.
- **GeminiAi:** Diet plan generator for each trimester.
- **MainFeaturePage:** Sonography report upload and result display.
- **MapComponent:** Hospital finder using address input.

## Styling

- Uses [TailwindCSS](https://tailwindcss.com/) for utility-first styling.
- Custom colors and fonts defined in [`tailwind.config.js`](Frontend/tailwind.config.js).
- Comic Relief and Jaro fonts for branding.

## API Integration

- Communicates with backend REST APIs for user, books, exercises, diet plans, and sonography classification.
- Axios is configured in [`src/config/axios.js`](Frontend/src/config/axios.js).

