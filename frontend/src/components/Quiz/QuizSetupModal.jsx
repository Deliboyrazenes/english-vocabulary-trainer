import React, { useState, useEffect } from "react";

export default function QuizSetupModal({
  isOpen,
  onClose,
  onStart,
  maxQuestions = 20,
}) {
  const [quizType, setQuizType] = useState("mcq-en-tr");
  const [questionCount, setQuestionCount] = useState(10);
  const [wordSource, setWordSource] = useState("unknown");

  useEffect(() => {
    if (isOpen) {
      setQuizType("mcq-en-tr");
      setQuestionCount(Math.min(10, maxQuestions));
      setWordSource("unknown");  
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, maxQuestions]);

  if (!isOpen) return null;

  const handleStart = () => {
    if (questionCount < 1) return;
    onStart({
      quizType,
      questionCount: Math.min(questionCount, maxQuestions),
      wordSource,
    });
  };

  const quizTypes = [
    {
      id: "mcq-en-tr",
      icon: "🎯",
      label: "Çoktan Seçmeli",
      sublabel: "EN → TR",
      color: "from-blue-500 to-indigo-600",
      border: "border-blue-500",
      shadow: "shadow-blue-200",
    },
    {
      id: "input-tr-en",
      icon: "✍️",
      label: "Yazmalı",
      sublabel: "TR → EN",
      color: "from-violet-500 to-purple-600",
      border: "border-violet-500",
      shadow: "shadow-violet-200",
    },
    {
      id: "input-en-tr",
      icon: "📝",
      label: "Yazmalı",
      sublabel: "EN → TR",
      color: "from-pink-500 to-rose-600",
      border: "border-pink-500",
      shadow: "shadow-pink-200",
    },
    {
      id: "mixed",
      icon: "🎨",
      label: "Karışık",
      sublabel: "Tüm Modlar",
      color: "from-emerald-500 to-teal-600",
      border: "border-emerald-500",
      shadow: "shadow-emerald-200",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 transition-opacity"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-gradient-to-br from-white to-gray-50
          w-full max-w-4xl
          rounded-3xl shadow-2xl relative overflow-hidden
          animate-in zoom-in-95 duration-300
          p-6 sm:p-8
        "
      >
        {/* Decorative light blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-100/40 to-purple-200/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-pink-100/40 to-blue-200/40 rounded-full blur-3xl -z-10" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 sm:top-6 sm:right-6
            w-10 h-10 flex items-center justify-center 
            rounded-full bg-white/80 backdrop-blur-sm
            text-gray-500 hover:text-gray-800 hover:bg-white
            shadow-lg transition-all duration-200 hover:scale-110 z-10
          "
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-10 mt-6">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200/50 rotate-3">
              <span className="text-3xl -rotate-3">🎓</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Quiz Hazırlığı
          </h2>
          <p className="text-gray-500 text-base sm:text-lg">
            Hadi öğrenmeye başlayalım! 🚀
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 px-1 sm:px-0">
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-8">
            {/* Quiz Types */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Quiz Türünü Seç
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {quizTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setQuizType(type.id)}
                    className={`group relative p-4 rounded-2xl border-2 transition-all duration-300
                      ${
                        quizType === type.id
                          ? `bg-gradient-to-br ${type.color} ${type.border} shadow-xl ${type.shadow} scale-105`
                          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg hover:scale-105"
                      }
                    `}
                  >
                    <div
                      className={`text-3xl mb-2 transition-transform ${
                        quizType === type.id
                          ? "scale-110"
                          : "group-hover:scale-110"
                      }`}
                    >
                      {type.icon}
                    </div>
                    <div
                      className={`text-sm font-bold mb-1 ${
                        quizType === type.id ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {type.label}
                    </div>
                    <div
                      className={`text-xs ${
                        quizType === type.id ? "text-white/90" : "text-gray-500"
                      }`}
                    >
                      {type.sublabel}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Soru Sayısı</h3>
              </div>

              <div className="bg-white rounded-2xl p-5 border-2 border-gray-200">
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min={1}
                    max={maxQuestions}
                    value={questionCount}
                    onChange={(e) =>
                      setQuestionCount(
                        Math.max(
                          1,
                          Math.min(Number(e.target.value) || 1, maxQuestions)
                        )
                      )
                    }
                    className="
                      w-24 px-4 py-3 
                      rounded-xl border-2 border-gray-300 
                      focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                      text-center font-semibold text-lg text-gray-800
                    "
                  />

                  <div className="flex-1">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-gray-700">
                        {questionCount}
                      </span>{" "}
                      soru seçildi
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Maksimum {maxQuestions} soru
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 sm:space-y-8">
            {/* Word Source */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Kelime Kaynağı
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Unknown */}
                <label className="block cursor-pointer transition transform hover:scale-[1.01]">
                  <div
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                      wordSource === "unknown"
                        ? "bg-gradient-to-br from-amber-500 to-orange-600 border-amber-500 shadow-xl shadow-amber-200"
                        : "bg-white border-gray-200 hover:border-amber-300 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        className="w-5 h-5 accent-white"
                        checked={wordSource === "unknown"}
                        onChange={() => setWordSource("unknown")}
                      />
                      <div>
                        <div
                          className={`font-bold ${
                            wordSource === "unknown"
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          📚 Bilmediğim Kelimeler
                        </div>
                        <div
                          className={`text-xs ${
                            wordSource === "unknown"
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}
                        >
                          Yeni kelimelerle pratik yap
                        </div>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Known */}
                <label className="block cursor-pointer transition transform hover:scale-[1.01]">
                  <div
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                      wordSource === "known"
                        ? "bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 shadow-xl shadow-green-200"
                        : "bg-white border-gray-200 hover:border-green-300 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        className="w-5 h-5 accent-white"
                        checked={wordSource === "known"}
                        onChange={() => setWordSource("known")}
                      />
                      <div>
                        <div
                          className={`font-bold ${
                            wordSource === "known"
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          ✅ Bildiklerim
                        </div>
                        <div
                          className={`text-xs ${
                            wordSource === "known"
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}
                        >
                          Öğrendiklerini pekiştir
                        </div>
                      </div>
                    </div>
                  </div>
                </label>

                {/* All */}
                <label className="block cursor-pointer transition transform hover:scale-[1.01]">
                  <div
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                      wordSource === "all"
                        ? "bg-gradient-to-br from-blue-500 to-cyan-600 border-blue-500 shadow-xl shadow-blue-200"
                        : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        className="w-5 h-5 accent-white"
                        checked={wordSource === "all"}
                        onChange={() => setWordSource("all")}
                      />
                      <div>
                        <div
                          className={`font-bold ${
                            wordSource === "all"
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          🌟 Tüm Kelimeler
                        </div>
                        <div
                          className={`text-xs ${
                            wordSource === "all"
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}
                        >
                          Her şeyi karıştır!
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-5 mt-10 pt-6 border-t-2 border-gray-200">
          <button
            onClick={onClose}
            className="
              w-full sm:w-auto
              px-8 py-3.5 rounded-xl 
              bg-white border-2 border-gray-300 text-gray-700 
              font-semibold hover:bg-gray-50 hover:border-gray-400 
              transition-all duration-200 hover:shadow-lg
            "
          >
            İptal Et
          </button>

          <button
            onClick={handleStart}
            className="
              w-full sm:w-auto
              px-10 py-3.5 rounded-xl 
              bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
              text-white font-bold transition-all duration-300 
              hover:shadow-2xl hover:shadow-purple-300 hover:scale-105
              flex items-center justify-center gap-3
            "
          >
            <span className="text-lg">Başlat</span>
            <span className="text-2xl">🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
}
