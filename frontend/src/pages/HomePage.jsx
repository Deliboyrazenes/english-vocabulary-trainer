/*
 * Copyright (c) 2026 Deliboyraz. All rights reserved.
 * Licensed under the MIT License.
 */
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Target, Sparkles, PencilLine, BarChart3, ChevronRight } from "lucide-react";

export default function HomePage({ onStart }) {
  const [installPrompt, setInstallPrompt] = React.useState(null);
  const [showIOSTooltip, setShowIOSTooltip] = React.useState(false);

  React.useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const isInStandalone = window.navigator.standalone === true;

    if (isIOS && !isInStandalone) {
      setShowIOSTooltip(true);
    }

    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-violet-950 via-fuchsia-950 to-purple-950">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.15)_1px,transparent_0)] bg-[size:40px_40px]"></div>

      <div className="relative z-10">
        <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8 backdrop-blur-sm">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-2xl shadow-yellow-500/50 rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 cursor-pointer">
              📚
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              Vocab
              <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                Zone
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onStart}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm md:text-base font-bold hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
            >
              Giriş Yap
            </button>
          </div>
        </nav>

        <main className="px-4 sm:px-6 md:px-8 lg:px-16 py-10 sm:py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span className="text-yellow-400 text-xs sm:text-sm font-semibold">
                  5500+ Kelime • A1-C1 Seviye
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 sm:mb-8 leading-tight px-2">
                Modern Bir Kelime
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                  Öğrenme Deneyimi
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4">
                Kelime öğrenmeyi karmaşadan uzak, sade ve tamamen odaklı bir
                deneyime dönüştüren platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center px-4">
                <button
                  onClick={onStart}
                  className="w-full sm:w-auto group px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl sm:rounded-2xl text-black text-lg sm:text-xl font-black shadow-2xl shadow-yellow-500/50 hover:shadow-yellow-500/70 hover:scale-110 transition-all"
                >
                  <span className="flex items-center justify-center gap-3">
                    Hemen Başla 🚀
                    <span className="group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </span>
                </button>

                {installPrompt && (
                  <button
                    onClick={() => {
                      installPrompt.prompt();
                      setInstallPrompt(null);
                    }}
                    className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-lg sm:text-xl font-bold hover:bg-white/20 hover:scale-110 transition-all"
                  >
                    📱 Uygulamayı Yükle
                  </button>
                )}
              </div>
            </div>

            {/* Ultra-Modern Features Section */}
            <div className="mb-32 sm:mb-48 relative">
              {/* background decorative glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-full bg-purple-500/5 blur-[120px] rounded-full"></div>

              <div className="text-center mb-24 relative z-10">
              {/* Header removed as requested */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 max-w-7xl mx-auto relative z-10">
                {/* 1. Flagship AI Feature */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="md:col-span-8 group relative"
                >
                  <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/50 to-teal-500/50 rounded-[3rem] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
                  <div className="relative h-full bg-[#0f172a]/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 sm:p-14 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgb(16_185_129/0.1),transparent_40%)]"></div>
                    
                    {/* NEW Badge */}
                    <div className="absolute top-8 right-10">
                      <span className="px-3 py-1 bg-emerald-400 text-black text-[10px] font-black rounded-full shadow-lg animate-pulse">
                        YENİ
                      </span>
                    </div>

                    <div className="flex flex-col h-full">
                      <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-10 border border-emerald-500/20">
                        <Sparkles className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div className="mt-auto">
                        <h3 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-none">
                          AI Cümle <span className="text-emerald-400">Kurma</span>
                        </h3>
                        <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-xl">
                          Yapay zeka ile kelimeler için anlık ve doğal örnek cümleler oluşturun, bağlamında öğrenin.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 2. 5500+ Words */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-4 group relative"
                >
                  <div className="absolute -inset-px bg-gradient-to-r from-purple-500/50 to-indigo-500/50 rounded-[3rem] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
                  <div className="relative h-full bg-[#0f172a]/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl">
                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                      < BookOpen  className="w-7 h-7 text-purple-400" />
                    </div>
                    <div className="mt-8">
                      <h3 className="text-2xl font-black text-white mb-4">5500+ Kelime</h3>
                      <p className="text-white/40 text-base leading-relaxed">
                        A1–C1 arası tüm seviyeler tek platformda. Dev kelime kütüphanesi ile seviyene uygun ilerle.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom Row - Symmetry */}
                {[
                  { 
                    icon: Target, 
                    title: "Quiz Modları", 
                    desc: "Yazma, çoktan seçmeli, karışık ve boşluk doldurma modları.", 
                    color: "text-yellow-400",
                    border: "from-yellow-500/50 to-orange-500/50",
                    bg: "bg-yellow-500/10",
                    borderColor: "border-yellow-500/20"
                  },
                  { 
                    icon: PencilLine, 
                    title: "Kelime Notları", 
                    desc: "Her kelimeye istediğin açıklamayı ekle ve hatırlatıcılar tut.", 
                    color: "text-blue-400",
                    border: "from-blue-500/50 to-indigo-500/50",
                    bg: "bg-blue-500/10",
                    borderColor: "border-blue-500/20"
                  },
                  { 
                    icon: Sparkles, 
                    title: "Kişisel Notlar", 
                    desc: "Kelimelerden bağımsız genel notlarını 'Notlarım' sayfasında yönet.", 
                    color: "text-emerald-400",
                    border: "from-emerald-500/50 to-teal-500/50",
                    bg: "bg-emerald-500/10",
                    borderColor: "border-emerald-500/20"
                  },
                  { 
                    icon: BarChart3, 
                    title: "İlerleme Raporu", 
                    desc: "Detaylı istatistikler ve öğrenme grafikleri ile gelişimini izle.", 
                    color: "text-red-400",
                    border: "from-red-500/50 to-pink-500/50",
                    bg: "bg-red-500/10",
                    borderColor: "border-red-500/20",
                    visual: (
                      <div className="flex items-end gap-3 h-28 md:h-32">
                        <motion.div initial={{ height: 0 }} whileInView={{ height: '35%' }} className="w-5 bg-red-500/20 rounded-t-md" />
                        <motion.div initial={{ height: 0 }} whileInView={{ height: '60%' }} className="w-5 bg-red-500/40 rounded-t-md" />
                        <motion.div initial={{ height: 0 }} whileInView={{ height: '45%' }} className="w-5 bg-red-500/30 rounded-t-md" />
                        <motion.div initial={{ height: 0 }} whileInView={{ height: '85%' }} className="w-5 bg-red-500/90 rounded-t-md shadow-[0_0_25px_rgba(239,68,68,0.5)]" />
                        <motion.div initial={{ height: 0 }} whileInView={{ height: '55%' }} className="w-5 bg-red-500/40 rounded-t-md" />
                        <motion.div initial={{ height: 0 }} whileInView={{ height: '75%' }} className="w-5 bg-red-500/60 rounded-t-md" />
                        <motion.div initial={{ height: 0 }} whileInView={{ height: '40%' }} className="w-5 bg-red-500/30 rounded-t-md" />
                      </div>
                    )
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className={`${idx === 3 ? "md:col-span-12" : "md:col-span-4"} group relative`}
                  >
                    <div className={`absolute -inset-px bg-gradient-to-r ${item.border} rounded-[3rem] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`}></div>
                    <div className="relative h-full bg-[#0f172a]/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
                        <div className="flex flex-col justify-between h-full flex-1">
                          <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center border ${item.borderColor}`}>
                            <item.icon className={`w-7 h-7 ${item.color}`} />
                          </div>
                          <div className="mt-8">
                            <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                            <p className="text-white/40 text-base leading-relaxed max-w-md">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        {item.visual && (
                          <div className="flex-shrink-0 bg-white/5 p-6 rounded-[2rem] border border-white/5 shadow-inner">
                            {item.visual}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20 px-2">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
                  <div className="relative group/card">
                    <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500 rounded-2xl sm:rounded-3xl blur-2xl opacity-40 animate-pulse group-hover/card:opacity-60 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl border-4 border-purple-200/50 group-hover/card:border-purple-300/70 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4 sm:mb-6">
                        <button className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all shadow-lg">
                          <span className="text-xl sm:text-2xl">🔊</span>
                        </button>
                        <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs font-black rounded-full shadow-md">
                          A1
                        </div>
                      </div>

                      <h3 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-4 sm:mb-6 text-center">
                        opportunity
                      </h3>

                      <div className="text-center mb-4 sm:mb-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full text-xs font-black text-black shadow-md">
                          ⚡ NOUN
                        </span>
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg mt-2 font-semibold">
                          (isim) — fırsat, olanak
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-3 sm:px-4 md:p-5 mb-4 border-2 border-purple-200/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400/20 rounded-full blur-2xl"></div>
                        <p className="text-gray-800 text-center italic text-xs sm:text-sm md:text-base font-medium relative z-10">
                          "She didn't want to miss this{" "}
                          <span className="text-purple-600 font-black not-italic">
                            opportunity
                          </span>
                          ."
                        </p>
                      </div>

                      <div className="flex gap-2 mb-3">
                        <button className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black text-sm sm:text-base md:text-lg rounded-xl hover:scale-[1.02] transition-all shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-2">
                          <span className="text-lg">✓</span> Biliyorum
                        </button>
                      </div>

                      <button className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs sm:text-sm rounded-lg hover:scale-[1.02] transition-all shadow-md flex items-center justify-center gap-2 group/ai">
                        <span className="text-base group-hover/ai:animate-pulse">
                          ✨
                        </span>
                        <span>AI Örnek Cümle</span>
                        <span className="px-1.5 py-0.5 bg-yellow-400 text-black text-[9px] font-black rounded">
                          YENİ
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text mb-3">
                        VocabZone'u Özel Yapan Şeyler
                      </h3>
                      <p className="text-white/60 text-sm sm:text-base">
                        Modern teknolojiyle öğrenmeyi eğlenceli hale getirin
                      </p>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      {[
                        {
                          icon: "✨",
                          text: "Flip animasyonlu kartlar",
                          gradient: "from-purple-500 to-pink-500",
                        },
                        {
                          icon: "🤖",
                          text: "AI ile örnek cümle oluşturma",
                          gradient: "from-emerald-500 to-teal-500",
                          badge: "YENİ",
                        },
                        {
                          icon: "🔍",
                          text: "Bilinmeyen kelime filtresi",
                          gradient: "from-blue-500 to-cyan-500",
                        },
                        {
                          icon: "🎯",
                          text: "Kelime türü filtreleme (noun, verb...)",
                          gradient: "from-yellow-500 to-orange-500",
                        },
                        {
                          icon: "📝",
                          text: "Kelime notları & özel not listesi",
                          gradient: "from-indigo-500 to-purple-500",
                        },
                        {
                          icon: "⚡",
                          text: "Yazım hatası toleransı (Levenshtein)",
                          gradient: "from-red-500 to-pink-500",
                        },
                        {
                          icon: "🔄",
                          text: "TR→EN & EN→TR çift yönlü quizler",
                          gradient: "from-violet-500 to-fuchsia-500",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="group flex items-start gap-3 sm:gap-4 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                          ></div>
                          <span className="text-xl sm:text-2xl flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </span>
                          <div className="flex-1 relative z-10">
                            <span className="text-white font-bold text-sm sm:text-base md:text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/90 group-hover:bg-clip-text transition-all">
                              {item.text}
                            </span>
                            {item.badge && (
                              <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 text-black text-[10px] font-black rounded-full animate-pulse">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-3xl sm:rounded-[3rem] p-10 sm:p-12 md:p-14 lg:p-20 mx-2 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl mb-6 shadow-2xl shadow-yellow-500/30 hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl sm:text-5xl">📚</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 sm:mb-6">
                  Hazırsan, Başlayalım!
                </h2>

                <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                  Odak sende, tempo sende.
                </p>

                <button
                  onClick={onStart}
                  className="group relative px-10 sm:px-12 md:px-14 py-4 sm:py-5 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-2xl 
                  text-black text-lg sm:text-xl md:text-2xl font-black shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60 hover:scale-110 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-3">
                    Hemen Başla
                    <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">
                      🚀
                    </span>
                  </span>
                </button>

                <div className="mt-6 flex items-center justify-center gap-6 text-white/50 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Anında erişim</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Kesintisiz deneyim</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {showIOSTooltip && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-5 py-4 rounded-2xl text-sm sm:text-base shadow-xl w-[90%] max-w-md">
            <button
              onClick={() => setShowIOSTooltip(false)}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
            <div className="flex items-start gap-3">
              <span className="text-xl">📱</span>
              <p>
                Uygulamayı ana ekrana eklemek için:
                <br />
                <span className="font-bold">
                  Safari → Paylaş → Ana Ekrana Ekle
                </span>
              </p>
            </div>
          </div>
        )}

        <footer className="text-center py-6 sm:py-8 md:py-10 px-4">
          <p className="text-white/40 text-xs sm:text-sm">
            © {new Date().getFullYear()} VocabZone • İngilizce öğrenmenin
            keyifli yolu ❤️
          </p>
        </footer>
      </div>

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
        @keyframes animate-shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: animate-shimmer 2s infinite;
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
