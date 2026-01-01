# VocabZone - English Vocabulary Trainer

VocabZone is a modern, full-stack web application designed to help users master English vocabulary through interactive flashcards, AI-powered sentence generation, and personalized quiz modes.

![Project Preview](frontend/public/logo192.png) <!-- Placeholder: User should replace with a real screenshot -->

## 🚀 Key Features

- **AI-Powered Learning:** Instant sentence generation for any word using Groq AI.
- **5500+ Word Database:** Comprehensive library from A1 to C1 levels.
- **Interactive Quizzes:** 4 different modes (Writing, Multiple Choice, Mixed, Fill-in-the-blanks).
- **Dual Note System:** Specific notes for each word + General personal notes.
- **Progress Tracking:** Real-time analytics and achievement tracking.
- **Premium UI:** Dark-mode optimized, glassmorphic design with smooth animations.

## 🛠️ Technology Stack

### Backend (Java/Spring Boot)
- **Framework:** Spring Boot 3.x
- **Database:** PostgreSQL (with Spring Data JPA)
- **Security:** JWT Authentication
- **AI Integration:** Groq Cloud API
- **Mail:** Spring Mail (SMTP)

### Frontend (React)
- **Library:** React 18
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📦 Getting Started

### Prerequisites
- JDK 17+
- Node.js 18+
- PostgreSQL Database

### Installation

1. **Clone the Repo:**
   ```bash
   git clone https://github.com/Deliboyraz/english-vocabulary-trainer.git
   cd english-vocabulary-trainer
   ```

2. **Backend Setup:**
   - Navigate to `backend/src/main/resources/`
   - Copy `application.properties.example` to `application.properties`
   - Fill in your database and API credentials.
   - Run: `./mvnw spring-boot:run`

3. **Frontend Setup:**
   - Navigate to `frontend/`
   - Run: `npm install`
   - Run: `npm start`

## 🌍 Deployment

- **Frontend:** Deployed on [Vercel](https://vocabzone.vercel.app) ⚡
- **Backend:** Deployed on **Fly.io** 🚀

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Created with ❤️ by Deliboyraz*
