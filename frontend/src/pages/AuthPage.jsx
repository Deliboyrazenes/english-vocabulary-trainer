import React, { useState, useEffect } from "react";
import api from "../services/axios";
import SkeletonAuth from "../components/Skeleton/SkeletonAuth";

export default function AuthPage({ onLoginSuccess, onBackToHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [savedEmails, setSavedEmails] = useState([]);
  const [showEmailList, setShowEmailList] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoadingScreen(false), 400);

    const saved = localStorage.getItem("rememberUser");
    if (saved) {
      const parsed = JSON.parse(saved);
      setEmail(parsed.email);
      setPassword(parsed.password);
      setRemember(true);
    }

    const emails = JSON.parse(localStorage.getItem("savedEmails") || "[]");
    setSavedEmails(emails);

    return () => clearTimeout(t);
  }, []);

  if (loadingScreen) return <SkeletonAuth />;

  const switchMode = () => {
    setIsRegister(!isRegister);
    setMessage("");

    if (!isRegister) {
      setEmail("");
      setPassword("");
      setName("");
      setShowEmailList(false);
    }
  };

  const handleSelectEmail = (selected) => {
    setEmail(selected);
    setShowEmailList(false);
  };

  /* ------------------------ SAVE EMAIL LIST ------------------------ */
  const saveEmailToLocalStorage = (email) => {
    let emails = JSON.parse(localStorage.getItem("savedEmails") || "[]");

    if (!emails.includes(email)) {
      emails.unshift(email);
      if (emails.length > 5) emails = emails.slice(0, 5);
      localStorage.setItem("savedEmails", JSON.stringify(emails));
      setSavedEmails(emails);
    }
  };

  /* ------------------------ SUBMIT (LOGIN/REGISTER) ------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("❌ Lütfen email ve şifre alanlarını doldurun.");
      return;
    }

    if (isRegister && !name.trim()) {
      setMessage("❌ Lütfen ad soyad alanını doldurun.");
      return;
    }

    try {
      if (isRegister) {
        await api.post("/users/register", {
          name,
          email,
          password,
        });

        setMessage("✅ Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
        setIsRegister(false);
        setEmail("");
        setPassword("");
        setName("");
        return;
      }

      const response = await api.post("/users/login", {
        email,
        password,
      });

      const user = response.data;

      if (!user || !user.token) {
        setMessage("❌ Giriş başarısız. Bilgileri kontrol edin.");
        return;
      }

      if (remember) {
        localStorage.setItem(
          "rememberUser",
          JSON.stringify({ email, password })
        );
      } else {
        localStorage.removeItem("rememberUser");
      }

      saveEmailToLocalStorage(email);

      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("screen", "words");

      onLoginSuccess(user);
    } catch (err) {
      console.error("AUTH ERROR:", err);
      setMessage("❌ Email veya şifre hatalı.");
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-violet-950 via-fuchsia-950 to-purple-950">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.12)_1px,transparent_0)] bg-[size:40px_40px]"></div>

      {/* Back Button */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white font-bold hover:bg-white/20 hover:border-white/40 transition-all hover:scale-105"
        >
          <span className="text-lg sm:text-xl">←</span>
          Ana Sayfa
        </button>
      </div>

      {/* Main Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-2xl flex items-center justify-center text-4xl shadow-xl mb-4 rotate-12 hover:rotate-0 transition-transform">
                📚
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
                {isRegister ? "Hesap Oluştur" : "Hoş Geldin! 👋"}
              </h1>
              <p className="text-white/70 text-sm sm:text-base text-center">
                {isRegister
                  ? "Aramıza katıl ve öğrenmeye başla!"
                  : "Kelime yolculuğuna devam et"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-5">
              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-bold text-white/90 mb-2">
                  📧 Email Adresi
                </label>

                <input
                  type="email"
                  value={email}
                  placeholder="ornek@mail.com"
                  onFocus={() => !isRegister && setShowEmailList(true)}
                  onBlur={() => setTimeout(() => setShowEmailList(false), 200)}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border-2 border-white/20 text-white placeholder-white/40 focus:border-yellow-400 transition-all"
                />

                {showEmailList && savedEmails.length > 0 && !isRegister && (
                  <div className="absolute top-full mt-3 w-full bg-purple-900/95 border-2 border-white/20 rounded-2xl overflow-hidden z-40 shadow-2xl backdrop-blur-xl">
                    {savedEmails.map((mail, i) => (
                      <button
                        key={i}
                        type="button"
                        onMouseDown={() => handleSelectEmail(mail)}
                        className="w-full text-left px-5 py-4 hover:bg-white/20 text-white flex items-center gap-3 border-b border-white/10 last:border-0"
                      >
                        👤 {mail}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Name (Only Register) */}
              {isRegister && (
                <div>
                  <label className="block text-sm font-bold text-white/90 mb-2">
                    👤 Ad Soyad
                  </label>

                  <input
                    type="text"
                    value={name}
                    placeholder="Adınızı girin"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-white/10 border-2 border-white/20 text-white placeholder-white/40 focus:border-yellow-400 transition-all"
                  />
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-white/90 mb-2">
                  🔒 Şifre
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 pr-14 rounded-2xl bg-white/10 border-2 border-white/20 text-white placeholder-white/40 focus:border-yellow-400 transition-all"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl hover:scale-110 transition-transform"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              {!isRegister && (
                <div className="flex items-center gap-3">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-5 h-5 rounded cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-white/80">
                    Beni Hatırla
                  </label>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl text-black font-extrabold text-lg shadow-xl hover:scale-105 transition-all"
              >
                {isRegister ? "🚀 Hesap Oluştur" : "🎯 Giriş Yap"}
              </button>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`mt-6 text-center p-4 rounded-2xl font-semibold backdrop-blur-md ${
                  message.includes("✅")
                    ? "bg-green-500/20 text-green-200 border border-green-400/20"
                    : "bg-red-500/20 text-red-200 border border-red-400/20"
                }`}
              >
                {message}
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-white/60 text-sm">veya</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            {/* Switch Mode */}
            <div className="text-center text-white/70">
              {isRegister ? (
                <>
                  Zaten hesabın var mı?{" "}
                  <button
                    onClick={switchMode}
                    className="text-yellow-400 font-bold hover:text-yellow-300"
                  >
                    Giriş Yap →
                  </button>
                </>
              ) : (
                <>
                  Hesabın yok mu?{" "}
                  <button
                    onClick={switchMode}
                    className="text-yellow-400 font-bold hover:text-yellow-300"
                  >
                    Kayıt Ol →
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-white/40 text-xs">
              🚀 Öğrenme yolculuğun burada başlıyor.
            </p>
          </div>
        </div>
      </div>

      {/* BLOB Animations */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
