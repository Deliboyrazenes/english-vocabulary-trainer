import React, { useState } from "react";
import api from "../../services/axios";
import toast from "react-hot-toast";

const normalizeType = (t) => {
  if (!t) return "";
  const x = t.toLowerCase();
  if (x === "n") return "noun";
  if (x === "v") return "verb";
  if (x === "adj") return "adj";
  if (x === "adv") return "adv";
  return x;
};

export default function AIExampleModal({ word, isOpen, onClose, onSaved }) {
  const [loading, setLoading] = useState(false);
  const [example, setExample] = useState(null);
  const [error, setError] = useState("");

  const generateExample = async () => {
    setLoading(true);
    setError("");
    setExample(null);

    try {
      const response = await api.get(`/ai/example/${word.en}`);
      setExample(response.data);
    } catch (err) {
      if (err.response?.status === 429) {
        setError("Günlük AI kullanım limitine ulaştınız.");
      } else {
        setError("AI ile bağlantı kurulamadı. Lütfen tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };

  const saveAsNote = async () => {
    if (!example) return;

    try {
      await api.post("/notes/save", {
        wordId: word.id,
        text: `EN: ${example.english}\nTR: ${example.turkish}`,
      });

      if (onSaved) {
        onSaved(word.id, `EN: ${example.english}\nTR: ${example.turkish}`);
      }

      toast.success("AI örneği notlara kaydedildi");
    } catch (err) {
      toast.error("Not kaydedilemedi");
    }
  };

  const speak = (text, lang = "en-US") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  if (!isOpen) return null;

  const typeKey = normalizeType(word.type);

  const gradientClass =
    {
      noun: "from-blue-500 to-cyan-500",
      verb: "from-purple-500 to-fuchsia-500",
      adj: "from-green-500 to-emerald-500",
      adv: "from-orange-500 to-red-500",
    }[typeKey] || "from-gray-400 to-gray-600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gradient-to-br from-purple-900 via-fuchsia-900 to-pink-900 rounded-3xl shadow-2xl max-w-2xl w-full border-2 border-white/20 max-h-[90vh] overflow-y-auto animate-scaleIn">
        {/* Header */}
        <div className="sticky top-0 bg-purple-900/90 backdrop-blur-md p-6 border-b border-white/10 rounded-t-3xl z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                ✨
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  AI Örnek Cümle
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Word Display */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="text-3xl font-bold text-white">{word.en}</div>
                <div className="text-xl text-white/70 mt-1">{word.tr}</div>
              </div>
              <div
                className={`px-3 py-1 bg-gradient-to-r ${gradientClass} rounded-lg text-sm font-semibold text-white border border-white/10 shadow-lg`}
              >
                {word.type} • {word.level}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!example && !loading && !error && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤖</div>
              <p className="text-white/70 mb-6 text-lg">
                AI ile bu kelimeyi içeren örnek cümle oluştur
              </p>
              <button
                onClick={generateExample}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-xl font-bold text-lg text-white shadow-lg transition-all hover:scale-105"
              >
                ✨ Örnek Oluştur
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-white/90 font-semibold text-lg">
                AI düşünüyor...
              </p>
              <p className="text-white/50 text-sm mt-2">
                Bu birkaç saniye sürebilir
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😔</div>
              <p className="text-red-300 font-semibold mb-4">{error}</p>
              <button
                onClick={generateExample}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white transition-all hover:scale-105"
              >
                🔄 Tekrar Dene
              </button>
            </div>
          )}

          {example && (
            <div className="space-y-6 animate-fadeIn">
              {/* Context Badge */}
              <div className="flex justify-center">
                <div className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm font-semibold text-blue-300">
                  📚 {example.context}
                </div>
              </div>

              {/* English Sentence */}
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">
                    🇬🇧
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-white/50 mb-2 font-semibold">
                      ENGLISH
                    </div>
                    <p className="text-white text-lg leading-relaxed">
                      {example.english}
                    </p>
                  </div>
                  <button
                    onClick={() => speak(example.english, "en-US")}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all hover:scale-110"
                  >
                    🔊
                  </button>
                </div>
              </div>

              {/* Turkish Translation */}
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500/30 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">
                    🇹🇷
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-white/50 mb-2 font-semibold">
                      TÜRKÇE
                    </div>
                    <p className="text-white text-lg leading-relaxed">
                      {example.turkish}
                    </p>
                  </div>
                  <button
                    onClick={() => speak(example.turkish, "tr-TR")}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all hover:scale-110"
                  >
                    🔊
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={generateExample}
                  disabled={example?.remainingToday === 0}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all
      ${
        example?.remainingToday === 0
          ? "bg-gray-500/30 cursor-not-allowed"
          : "bg-white/10 hover:bg-white/20 hover:scale-105"
      }`}
                >
                  🔄 Yeni Örnek
                </button>

                <button
                  onClick={saveAsNote}
                  disabled={!example}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all
      ${
        !example
          ? "bg-emerald-500/30 cursor-not-allowed"
          : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 hover:scale-105"
      }`}
                >
                  💾 Notlara Kaydet
                </button>
              </div>

              <div className="text-xs text-white/60 text-center">
                🤖 Bugün kalan AI hakkın:{" "}
                <span className="font-semibold text-white">
                  {example.remainingToday}
                </span>
              </div>

              {/* AI Info */}
              <div className="p-4 bg-purple-500/10 border border-purple-400/20 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-purple-200">
                  <span className="text-lg">💡</span>
                  <span>
                    Bu örnek <strong>Groq AI</strong> tarafından oluşturuldu
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-4 border-t border-white/10 bg-purple-900/90 backdrop-blur-md rounded-b-3xl">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>VocabZone • İngilizce öğrenmenin keyifli yolu ❤️</span>
            <span>🚀 Ücretsiz öğrenme deneyimi</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
