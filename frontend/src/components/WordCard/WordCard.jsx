// src/components/WordCard/WordCard.jsx
import React, { useState, useEffect } from "react";

// 📌 TYPE NORMALİZASYONU
const normalizeType = (t) => {
  if (!t) return "";
  const x = t.toLowerCase();

  if (x === "n") return "noun";
  if (x === "v") return "verb";
  if (x === "adj") return "adj";
  if (x === "adv") return "adv";

  return x;
};

export default function WordCard({
  word,
  isKnown,
  onMarkKnown,
  onUnmarkKnown,
  mode,
  note,
  onOpenNoteModal,
}) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (flipped) {
      const t = setTimeout(() => setFlipped(false), 7000);
      return () => clearTimeout(t);
    }
  }, [flipped]);

  if (!word) return null;

  const frontText = mode === "en-tr" ? word.en : word.tr;
  const backText = mode === "en-tr" ? word.tr : word.en;

  // 🔥 TYPE KEY DÜZELTME
  const typeKey = normalizeType(word.type);

  const typeIcons = {
    noun: "📦",
    verb: "⚡",
    adj: "🎨",
    adv: "🚀",
  };

  const gradientClass =
    {
      noun: "from-blue-500 to-indigo-600",
      verb: "from-purple-500 to-pink-600",
      adj: "from-green-500 to-teal-600",
      adv: "from-orange-500 to-red-600",
    }[typeKey] || "from-gray-400 to-gray-600";

  const speak = () => {
    const u = new SpeechSynthesisUtterance(word.en);
    u.lang = "en-US";
    speechSynthesis.speak(u);
  };

  return (
    <div
      className="relative cursor-pointer select-none transform transition-all duration-300 hover:scale-105"
      onClick={() => setFlipped((v) => !v)}
      style={{
        width: "250px",
        height: "180px",
        perspective: "1000px",
      }}
    >
      {/* Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientClass} rounded-2xl blur-xl opacity-20`}
      ></div>

      {/* Flip Container */}
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 bg-white rounded-2xl shadow-xl flex flex-col justify-between p-5"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            className={`h-1.5 bg-gradient-to-r ${gradientClass} rounded-full`}
          />

          <h2 className="text-2xl font-bold text-center mt-3 text-gray-800">
            {frontText}
          </h2>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-1">
              {typeIcons[typeKey]} {typeKey.toUpperCase()}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${gradientClass} text-white`}
            >
              {word.level}
            </span>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-white rounded-2xl shadow-xl flex flex-col justify-between p-5"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div
            className={`h-1.5 bg-gradient-to-r ${gradientClass} rounded-full`}
          />

          <p className="text-xl text-center mt-3 text-gray-700">{backText}</p>

          {/* Known button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              isKnown ? onUnmarkKnown(word.id) : onMarkKnown(word.id);
            }}
            className={`w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r ${gradientClass}`}
          >
            {isKnown ? "↩ Geri Al" : "✓ Biliyorum"}
          </button>
        </div>
      </div>

      {/* 🔊 Speak Button */}
      {mode === "en-tr" && !flipped && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            speak();
          }}
          className="absolute top-2 left-2 bg-indigo-600 text-white px-2 py-1 rounded-lg shadow"
        >
          🔊
        </button>
      )}

      {/* 📝 Note Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenNoteModal(word);
        }}
        className={`absolute top-2 right-2 text-sm px-2 py-1 rounded-lg shadow 
          ${
            note ? "bg-yellow-300 text-yellow-900" : "bg-gray-200 text-gray-600"
          }`}
      >
        📝
      </button>
    </div>
  );
}
