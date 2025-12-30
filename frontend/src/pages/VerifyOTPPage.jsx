import React, { useState, useEffect } from "react";
import api from "../services/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Mail, ShieldCheck, RefreshCcw } from "lucide-react";

const VerifyOTPPage = ({ email, onVerified, onBack }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleChange = (index, value) => {
    if (value.length > 1) value = value[value.length - 1];
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = code.join("");
    if (otpString.length !== 6) {
      toast.error("Lütfen 6 haneli kodu eksiksiz girin.");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/users/verify", { email, code: otpString });
      toast.success("Hesabınız doğrulandı! Giriş yapabilirsiniz.");
      onVerified();
    } catch (error) {
      toast.error(error.response?.data?.error || "Doğrulama başarısız.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCountdown > 0) return;

    try {
      await api.post("/users/resend-code", { email });
      toast.success("Yeni kod mail adresinize gönderildi.");
      setResendCountdown(60);
    } catch (error) {
      toast.error(error.response?.data?.error || "Kod gönderilemedi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a]">
      <div className="w-full max-w-md bg-[#1e293b] rounded-[2.5rem] p-10 sm:p-12 shadow-2xl border border-white/10 relative overflow-hidden group">
        {/* Dekoratif Işık Efekti */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full transition-all group-hover:bg-blue-500/20"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full transition-all group-hover:bg-indigo-500/20"></div>

        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 group/back"
        >
          <ArrowLeft size={18} className="group-hover/back:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Geri Dön</span>
        </button>

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <ShieldCheck size={40} className="text-blue-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Hesabını Doğrula</h1>
          <p className="text-slate-400 leading-relaxed text-sm">
            <span className="font-semibold text-blue-400/80">{email}</span> adresine<br />6 haneli bir kod gönderdik.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-10">
          <div className="flex justify-center gap-2 sm:gap-3">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 h-14 sm:w-12 sm:h-16 text-center text-2xl font-bold bg-[#0f172a]/50 text-white border-2 border-slate-700 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? "Doğrulanıyor..." : "Hesabı Doğrula"}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-400 text-sm mb-3">Kod gelmedi mi?</p>
          <button
            onClick={handleResend}
            disabled={resendCountdown > 0}
            className="flex items-center justify-center gap-2 mx-auto text-blue-400 hover:text-blue-300 font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed group/resend"
          >
            <RefreshCcw size={16} className={`${resendCountdown > 0 ? "animate-spin" : "group-hover/resend:rotate-180"} transition-transform duration-500`} />
            {resendCountdown > 0 ? `${resendCountdown}s sonra tekrar gönder` : "Yeni Kod Gönder"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPPage;
