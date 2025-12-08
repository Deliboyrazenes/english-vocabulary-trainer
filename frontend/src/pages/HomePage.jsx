import React from "react";

export default function HomePage({ onStart }) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-violet-950 via-fuchsia-950 to-purple-950">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.15)_1px,transparent_0)] bg-[size:40px_40px]"></div>

      <div className="relative z-10">
        {/* NAVBAR */}
        <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-xl rotate-12 hover:rotate-0 transition-transform cursor-pointer">
              📚
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              Vocab<span className="text-yellow-400">Zone</span>
            </span>
          </div>

          <button
            onClick={onStart}
            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm md:text-base font-bold hover:bg-white/20 hover:border-white/40 transition-all hover:scale-105"
          >
            Giriş Yap
          </button>
        </nav>

        {/* HERO */}
        <main className="px-4 sm:px-6 md:px-8 lg:px-16 py-10 sm:py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span className="text-yellow-400 text-xs sm:text-sm font-semibold">
                  5500+ Kelime • A1-C1 Seviye
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 sm:mb-8 leading-tight px-2">
                Modern Bir Kelime
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                  Öğrenme Deneyimi
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4">
                5500+ İngilizce kelime, hızlı filtreleme, flip kartlar, not
                ekleme, bilinen kelime işaretleme ve gelişmiş quiz modları ile
                öğrenmeni hızlandıran modern bir platform.
              </p>

              {/* CTA Buttons */}
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
              </div>
            </div>

            {/* FEATURE CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-20 px-2">
              {[
                {
                  emoji: "📘",
                  title: "5500+ Kelime",
                  desc: "A1–C1 arası tüm seviyeler tek platformda.",
                  color: "from-purple-500 to-fuchsia-500",
                },
                {
                  emoji: "🎯",
                  title: "Quiz Modları",
                  desc: "Yazma, çoktan seçmeli, karışık ve boşluk doldurma.",
                  color: "from-yellow-500 to-orange-500",
                },
                {
                  emoji: "📝",
                  title: "Kişisel Notlar",
                  desc: "Her kelimeye istediğin açıklamayı ekle.",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  emoji: "📊",
                  title: "İlerleme Gör",
                  desc: "Detaylı raporlar",
                  color: "from-red-500 to-pink-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {item.emoji}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* BIG DEMO CARD */}
            <div className="max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-20 px-2">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
                  {/* Left Side - Word Card */}
                  <div className="relative">
                    <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl">
                      <div className="flex items-start justify-between mb-4 sm:mb-6">
                        <button className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center hover:bg-purple-200 transition-colors">
                          <span className="text-xl sm:text-2xl">🔊</span>
                        </button>
                        <button className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <span className="text-xl sm:text-2xl">📋</span>
                        </button>
                      </div>

                      <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4 sm:mb-6 text-center">
                        opportunity
                      </h3>

                      <div className="text-center mb-4 sm:mb-6">
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                          (isim) — fırsat, olanak
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border border-gray-200">
                        <p className="text-gray-700 text-center italic text-xs sm:text-sm md:text-base">
                          "She didn't want to miss this
                          <span className="text-purple-600 font-bold">
                            {" "}
                            opportunity
                          </span>
                          ."
                        </p>
                      </div>

                      <button className="w-full py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm sm:text-base md:text-lg rounded-xl hover:scale-105 transition-transform shadow-lg">
                        ✓ Biliyorum
                      </button>
                    </div>
                  </div>

                  {/* Right Side - Features */}
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-2xl sm:text-2xl md:text-3xl font-black text-white mb-2">
                        VocabZone'u Özel Yapan Şeyler
                      </h3>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      {[
                        { icon: "✨", text: "Flip animasyonlu kartlar" },
                        { icon: "🔍", text: "Bilinmeyen kelime filtresi" },
                        {
                          icon: "🎯",
                          text: "Kelime türü filtreleme (noun, verb...)",
                        },
                        { icon: "📝", text: "Not ekleme & düzenleme" },
                        {
                          icon: "⚡",
                          text: "Yazım hatası toleransı (Levenshtein)",
                        },
                        {
                          icon: "🔄",
                          text: "TR→EN & EN→TR çift yönlü quizler",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 sm:gap-4 bg-purple-500/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-400/50 transition-all"
                        >
                          <span className="text-xl sm:text-2xl flex-shrink-0">
                            {item.icon}
                          </span>
                          <span className="text-white font-semibold text-sm sm:text-base md:text-lg">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FINAL CTA */}
            <div className="text-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 rounded-3xl sm:rounded-[3rem] p-8 sm:p-10 md:p-12 lg:p-16 mx-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
                Haydi, Başlayalım! 🎉
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4">
                5500+ kelimeyi modern, eğlenceli ve etkili tekniklerle öğrenmeye
                başla.
              </p>
              <button
                onClick={onStart}
                className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl sm:rounded-2xl text-black text-lg sm:text-xl md:text-2xl font-black shadow-2xl shadow-yellow-500/50 hover:shadow-yellow-500/70 hover:scale-110 transition-all"
              >
                Ücretsiz Dene 🚀
              </button>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="text-center py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8">
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
