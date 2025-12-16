import React, { useState } from "react";

import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import WordListPage from "./pages/WordListPage";
import ProfilePage from "./pages/ProfilePage";
import QuizPage from "./pages/QuizPage";
import GlobalNotesPage from "./pages/GlobalNotesPage"; 

function App() {

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });


  const [screen, setScreen] = useState(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return "home";

    return localStorage.getItem("screen") || "words";
  });

  const handleLoginSuccess = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));

    setScreen("words");
    localStorage.setItem("screen", "words");

    localStorage.setItem("token", u.token);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("screen");

    setUser(null);
    setScreen("home");
  };

  const goToAuth = () => {
    setScreen("auth");
    localStorage.setItem("screen", "auth");
  };

  const goToProfile = () => {
    setScreen("profile");
    localStorage.setItem("screen", "profile");
  };

  const goToWords = () => {
    setScreen("words");
    localStorage.setItem("screen", "words");
  };

  const goToQuiz = (settings, words) => {
    window.quizData = { settings, words };
    setScreen("quiz");
    localStorage.setItem("screen", "quiz");
  };

  const goToNotes = () => {
    setScreen("notes");
    localStorage.setItem("screen", "notes");
  };

  if (!user) {
    if (screen === "home") {
      return <HomePage onStart={goToAuth} />;
    }

    return (
      <AuthPage
        onLoginSuccess={handleLoginSuccess}
        onBackToHome={() => setScreen("home")}
      />
    );
  }

  return (
    <>
    
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1f2937",
          color: "#fff",
        },
      }}
    />

      {screen === "words" && (
        <WordListPage
          user={user}
          onLogout={handleLogout}
          onOpenProfile={goToProfile}
          onOpenNotes={goToNotes} 
          onStartQuiz={goToQuiz}
        />
      )}

      {screen === "profile" && (
        <ProfilePage user={user} onLogout={handleLogout} onBack={goToWords} />
      )}

      {screen === "quiz" && <QuizPage user={user} onBack={goToWords} />}

      {/* 🆕 NOTLAR SAYFASI */}
      {screen === "notes" && (
        <GlobalNotesPage user={user} onBack={goToWords} />
      )}
    </>
  );
}

export default App;
