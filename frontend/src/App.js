import React, { useState } from "react";
import AuthPage from "./pages/AuthPage";
import WordListPage from "./pages/WordListPage";
import ProfilePage from "./pages/ProfilePage";
import QuizPage from "./pages/QuizPage";

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    const remember = localStorage.getItem("rememberUser");

    if (remember) {
      return stored ? JSON.parse(stored) : null;
    } else {
      return null;
    }
  });

  // "words" | "profile" | "quiz"
  const [screen, setScreen] = useState("words");

  // Login başarılı
  const handleLoginSuccess = (u) => {
    setUser(u);
    setScreen("words");
  };

  // Logout işlemi
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setScreen("words");
  };

  // Profil ekranına git
  const goToProfile = () => setScreen("profile");

  // Kelime ekranına dön
  const goToWords = () => setScreen("words");

  // Quiz ekranına geçiş
  const goToQuiz = (settings, words) => {
    window.quizData = { settings, words };
    setScreen("quiz");
  };

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
