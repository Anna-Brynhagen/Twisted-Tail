# Twisted Tail - A Modern Snake Game 🐍

Twisted Tail is a web-based application that brings the classic **Snake** game into a modern and interactive environment. Users can play the game, track their high scores, manage their profiles, and experience smooth gameplay with a clean interface.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)

---

## About the Project 🎯

The project aims to create an engaging, user-friendly version of the **Snake** game, enhanced with modern features like user authentication, profile management, and a real-time highscore leaderboard. All data, including scores and user profiles, is securely stored in **Firebase Realtime Database**.

---

## Features 🚀

### **Core Features**

1. **User Accounts and Profiles**

   - Register, log in, and log out.
   - Update username, password, and profile picture.

2. **Game Functionality**

   - Classic Snake gameplay: eat items to grow the snake and avoid collisions with self or wall.
   - Smooth and responsive controls using keyboard inputs.

3. **Highscore Leaderboard**
   - Scores are saved in **Firebase Realtime Database**.
   - Public leaderboard displays top scores and player information.
   - Users can see their personal best score, even if it’s not in the top rankings.

---

## Technologies Used 🛠️

- **React**
- **TypeScript**
- **Vite**
- **Firebase**
- **SCSS**
- **ESLint**

---

## Installation 🧰

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-github-username/twisted-tail.git
   cd twisted-tail
   npm install
   Set up Firebase:
   Create a Firebase project.
   Set up Firebase Authentication and Realtime Database.
   Add your Firebase configuration to the project and your api keys in a .env file.
   Start the development server:
   npm run dev
   ```
