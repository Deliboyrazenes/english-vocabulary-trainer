import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function AuthPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Remember me
  const [remember, setRemember] = useState(false);

  // Email autocomplete list
  const [savedEmails, setSavedEmails] = useState([]);
  const [showEmailList, setShowEmailList] = useState(false);

  // İlk açılışta remember me bilgisi yüklenir (Sadece Login için)
  useEffect(() => {
    const saved = localStorage.getItem("rememberUser");
    if (saved) {
      const parsed = JSON.parse(saved);
      setEmail(parsed.email);
      setPassword(parsed.password);
      setRemember(true);
    }

    const emails = JSON.parse(localStorage.getItem("savedEmails") || "[]");
    setSavedEmails(emails);
  }, []);

  // Register’e geçince otomatik doldurmayı SIFIRLA
  const switchMode = () => {
    setIsRegister(!isRegister);
    setMessage("");

    // Register moduna geçiliyorsa inputları temizle
    if (!isRegister) {
      setEmail("");
      setPassword("");
      setName("");
      setShowEmailList(false);
    }
  };

  // Email seçildiğinde liste kapanır
  const handleSelectEmail = (selected) => {
    setEmail(selected);
    setShowEmailList(false);
  };

  const saveEmailToLocalStorage = (email) => {
    let emails = JSON.parse(localStorage.getItem("savedEmails") || "[]");

    if (!emails.includes(email)) {
      emails.unshift(email);
      if (emails.length > 5) emails = emails.slice(0, 5);
      localStorage.setItem("savedEmails", JSON.stringify(emails));
      setSavedEmails(emails);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isRegister) {
        // REGISTER
        const res = await axios.post(`${API_BASE}/users/register`, {
          email,
          password,
          name,
        });

        if (res.data.id) {
          setMessage("✅ Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
          setIsRegister(false);
          setEmail("");
          setPassword("");
          setName("");
        }
      } else {
        // LOGIN
        const res = await axios.post(`${API_BASE}/users/login`, {
          email,
          password,
        });

        if (res.data.id) {
          // Remember me sadece LOGIN için geçerli
          if (remember) {
            localStorage.setItem(
              "rememberUser",
              JSON.stringify({ email, password })
            );
          } else {
            localStorage.removeItem("rememberUser");
          }

          // email autocomplete kayıt
          saveEmailToLocalStorage(email);

          localStorage.setItem("user", JSON.stringify(res.data));
          onLoginSuccess(res.data);
        } else {
          setMessage("❌ Email veya şifre hatalı.");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("🚨 Sunucuya bağlanılamadı.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
      {/* Ana Kart */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-12">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
            <span className="text-4xl">📚</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-1">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-500 text-base">
            {isRegister
              ? "Join us and start learning English!"
              : "Login to continue your journey"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* E-mail Input + Autocomplete */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              required
              placeholder="example@mail.com"
              onFocus={() => !isRegister && setShowEmailList(true)}
              onBlur={() => setTimeout(() => setShowEmailList(false), 120)}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                         focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200"
            />

            {/* Dropdown */}
            {showEmailList && savedEmails.length > 0 && !isRegister && (
              <div className="absolute top-full mt-2 w-full bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden z-40">
                {savedEmails.map((mail, i) => (
                  <button
                    key={i}
                    onMouseDown={() => handleSelectEmail(mail)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    {mail}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Name - Register Mode */}
          {isRegister && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                           focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200"
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                required
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 border border-gray-200 
                           focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Remember Me (Sadece Login modunda mantıklı çalışır) */}
          {!isRegister && (
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember Me
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-semibold text-white text-lg shadow-md 
                       bg-gradient-to-r from-indigo-600 to-purple-600 
                       hover:from-indigo-700 hover:to-purple-700
                       transition-all duration-200 hover:scale-[1.02]"
          >
            {isRegister ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Toggle */}
        <p className="text-center text-gray-700">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button
                className="text-indigo-600 font-semibold"
                onClick={switchMode}
              >
                Login →
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                className="text-indigo-600 font-semibold"
                onClick={switchMode}
              >
                Register →
              </button>
            </>
          )}
        </p>

        {/* Message */}
        {message && (
          <div
            className={`mt-6 text-center p-4 rounded-xl font-medium ${
              message.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
