import React, { useState } from "react";

import { Toaster } from "react-hot-toast";
import { toastConfig } from "./config/toastConfig";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import WordListPage from "./pages/WordListPage";
import ProfilePage from "./pages/ProfilePage";
import QuizPage from "./pages/QuizPage";
import GlobalNotesPage from "./pages/GlobalNotesPage";
import VerifyOTPPage from "./pages/VerifyOTPPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  const [verifyingEmail, setVerifyingEmail] = useState("");

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [screen, setScreen] = useState(() => {
    // URL'de token varsa reset-password ekranına git
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("token")) return "reset-password";

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

  const handleRegisterSuccess = (email) => {
    setVerifyingEmail(email);
    setScreen("verify");
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

  // --- RENDERING ---

  if (screen === "reset-password") {
    return (
      <>
        <Toaster {...toastConfig} />
        <ResetPasswordPage onResetSuccess={() => setScreen("auth")} />
      </>
    );
  }

  if (!user) {
    if (screen === "home") {
      return <HomePage onStart={goToAuth} />;
    }

    if (screen === "verify") {
      return (
        <>
          <Toaster {...toastConfig} />
          <VerifyOTPPage
            email={verifyingEmail}
            onVerified={() => setScreen("auth")}
            onBack={() => setScreen("auth")}
          />
        </>
      );
    }

    if (screen === "forgot-password") {
      return (
        <>
          <Toaster {...toastConfig} />
          <ForgotPasswordPage onBack={() => setScreen("auth")} />
        </>
      );
    }

    return (
      <>
        <Toaster {...toastConfig} />
        <AuthPage
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
          onForgotPassword={() => setScreen("forgot-password")}
          onBackToHome={() => setScreen("home")}
        />
      </>
    );
  }

  return (
    <>
      <Toaster {...toastConfig} />

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

      {screen === "notes" && (
        <GlobalNotesPage user={user} onBack={goToWords} />
      )}
    </>
  );
}

export default App;
