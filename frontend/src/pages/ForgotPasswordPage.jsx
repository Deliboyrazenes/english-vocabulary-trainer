import React, { useState } from "react";
import api from "../services/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Mail, Send } from "lucide-react";

const ForgotPasswordPage = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Lütfen email adresinizi girin.");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/users/forgot-password", { email });
      toast.success("Şifre sıfırlama linki mail adresinize gönderildi!");
      setIsSent(true);
    } catch (error) {
      toast.error(error.response?.data?.error || "Bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a]">
      {/* Grid Overlay for subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.05)_1px,transparent_0)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#1e293b] rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-white/5 relative z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 group/back"
        >
          <ArrowLeft size={18} className="group-hover/back:-translate-x-1 transition-transform" />
          <span className="font-medium">Giriş Ekranına Dön</span>
        </button>

        {!isSent ? (
          <>
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-yellow-400/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-yellow-400/20 rotate-6 shadow-xl shadow-yellow-900/10">
                <Mail size={40} className="text-yellow-400" />
              </div>
              <h1 className="text-3xl font-black text-white mb-3">Şifreni mi Unuttun?</h1>
              <p className="text-slate-400 leading-relaxed">
                Email adresini gir, sana şifreni sıfırlaman için güvenli bir link gönderelim.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-300 ml-1">
                  Email Adresiniz
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors" size={20} />
                  <input
                    type="email"
                    placeholder="ornek@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-[#0f172a]/50 text-white border-2 border-slate-700 rounded-2xl focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/5 outline-none transition-all placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-[#0f172a] font-black text-lg rounded-2xl shadow-xl shadow-yellow-400/10 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? "Gönderiliyor..." : "Sıfırlama Linki Gönder"}
                {!isLoading && <Send size={20} />}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-xl shadow-green-900/10">
              <Send size={48} className="text-green-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 italic">Mail Gönderildi!</h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              Lütfen <span className="text-yellow-400 font-bold">{email}</span> adresindeki gelen kutusu ve gereksiz (spam) klasörlerini kontrol et.
            </p>
            <button
              onClick={onBack}
              className="w-full py-4 bg-slate-700/50 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all border border-white/5"
            >
              Giriş Yapmaya Git
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
