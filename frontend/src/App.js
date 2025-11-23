import React, { useState } from "react";
import AuthPage from "./pages/AuthPage";
import WordListPage from "./pages/WordListPage";
import ProfilePage from "./pages/ProfilePage";
import QuizPage from "./pages/QuizPage";

function App() {

  // USER STATE
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // SCREEN STATE (F5 sonrası aynı sayfada kalmak için)
  const [screen, setScreen] = useState(() => {
    return localStorage.getItem("screen") || "words";
  });

  // ---------------- LOGIN ----------------
  const handleLoginSuccess = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));

    setScreen("words");
    localStorage.setItem("screen", "words");

    localStorage.setItem("token", u.token);
  };

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("screen");

    setUser(null);
    setScreen("words");
  };

  // ---------------- SCREEN SWITCHES ----------------
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

  // ---------------- RENDER ----------------
  return (
    <>
      {!user ? (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {screen === "words" && (
            <WordListPage
              user={user}
              onLogout={handleLogout}
              onOpenProfile={goToProfile}
              onStartQuiz={goToQuiz}
            />
          )}

          {screen === "profile" && (
            <ProfilePage
              user={user}
              onLogout={handleLogout}
              onBack={goToWords}
            />
          )}

          {screen === "quiz" && (
            <QuizPage
              user={user}
              onBack={goToWords}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
