import React, { useState, useEffect } from "react";
import api from "../services/axios";
import toast from "react-hot-toast";
import { Lock, ShieldCheck, Eye, EyeOff, CheckCircle2 } from "lucide-react";

const ResetPasswordPage = ({ onResetSuccess }) => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const t = urlParams.get("token");
    if (t) {
      setToken(t);
    } else {
      toast.error("Geçersiz veya eksik sıfırlama kodu.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/users/reset-password", { token, newPassword });
      toast.success("Şifreniz başarıyla sıfırlandı!");
      setIsSuccess(true);
      
      // URL'deki token'ı temizle
      window.history.replaceState({}, document.title, "/");
    } catch (error) {
      toast.error(error.response?.data?.error || "Şifre sıfırlanamadı.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a]">
      {/* Grid Overlay for subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.05)_1px,transparent_0)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#1e293b] rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-white/5 relative z-10">
        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-xl shadow-green-900/10">
              <CheckCircle2 size={48} className="text-green-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 italic">Şifre Değiştirildi!</h2>
            <p className="text-slate-400 mb-10 leading-relaxed">Yeni şifreniz başarıyla kaydedildi. Artık VocabZone şifrenizle giriş yapabilirsiniz.</p>
            <button
              onClick={onResetSuccess}
              className="w-full py-4 bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-[#0f172a] font-black text-lg rounded-2xl shadow-xl shadow-yellow-400/10 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Giriş Yapmaya Git 🚀
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-blue-400/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-400/20 -rotate-6 shadow-xl shadow-blue-900/10">
                <ShieldCheck size={40} className="text-blue-400" />
              </div>
              <h1 className="text-3xl font-black text-white mb-3">Yeni Şifre Belirle</h1>
              <p className="text-slate-400 leading-relaxed">Hesabını güvenceye almak için güçlü bir şifre oluştur.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-300 ml-1">Yeni Şifre</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-[#0f172a]/50 text-white border-2 border-slate-700 rounded-2xl focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/5 outline-none transition-all placeholder:text-slate-600"
                    required
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

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-300 ml-1">Şifre Tekrar</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-[#0f172a]/50 text-white border-2 border-slate-700 rounded-2xl focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/5 outline-none transition-all placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !token}
                className="w-full py-4 bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-[#0f172a] font-black text-lg rounded-2xl shadow-xl shadow-yellow-400/10 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? "Güncelleniyor..." : "Şifreyi Güncelle 🎯"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
