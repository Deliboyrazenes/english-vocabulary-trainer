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
  onOpenAIModal,
}) {
  const [flipped, setFlipped] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (flipped) {
      const t = setTimeout(() => setFlipped(false), 7000);
      return () => clearTimeout(t);
    }
  }, [flipped]);

  if (!word) return null;

  const frontText = mode === "en-tr" ? word.en : word.tr;
  const backText = mode === "en-tr" ? word.tr : word.en;

  const typeKey = normalizeType(word.type);

  const typeIcons = {
    noun: "📦",
    verb: "⚡",
    adj: "🎨",
    adv: "🚀",
  };

  const gradientClass =
    {
      noun: "from-blue-500 to-cyan-500",
      verb: "from-purple-500 to-fuchsia-500",
      adj: "from-green-500 to-emerald-500",
      adv: "from-orange-500 to-red-500",
    }[typeKey] || "from-gray-400 to-gray-600";

  const speak = () => {
    const u = new SpeechSynthesisUtterance(word.en);
    u.lang = "en-US";
    speechSynthesis.speak(u);
  };

  return (
    <div
      className="
        relative cursor-pointer select-none 
        transform transition-all duration-300 hover:scale-105
        
        /* 📱 Mobile */
        w-[230px] h-[180px]

        /* 📱 Larger phones */
        sm:w-[250px] sm:h-[190px]

        /* 💻 Normal screens */
        md:w-[260px] md:h-[200px]

        /* 🖥 Big screens */
        lg:w-[270px] lg:h-[210px]
      "
      onClick={() => setFlipped((v) => !v)}
      style={{ perspective: "1000px" }}
    >
      {/* Glow Effect - HomePage stilinde */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientClass} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}
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
          className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 flex flex-col justify-between p-4 sm:p-5"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            className={`h-1.5 bg-gradient-to-r ${gradientClass} rounded-full shadow-lg`}
          />

          <h2 className="text-xl sm:text-2xl font-black text-center mt-3 text-gray-900">
            {frontText}
          </h2>

          <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-600 mt-2">
            <span className="flex items-center gap-1 font-bold">
              {typeIcons[typeKey]} {typeKey.toUpperCase()}
            </span>
            <span
              className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${gradientClass} text-white font-bold shadow-md`}
            >
              {word.level}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenAIModal(word);
            }}
            className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-xl font-bold text-white transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg text-sm"
          >
            <span className="text-base">✨</span>
            AI Örnek Cümle
          </button>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 flex flex-col justify-between p-4 sm:p-5"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div
            className={`h-1.5 bg-gradient-to-r ${gradientClass} rounded-full shadow-lg`}
          />

          <p className="text-lg sm:text-xl text-center mt-3 text-gray-800 font-bold">
            {backText}
          </p>

          {/* Known button - HomePage gradient stilinde */}
          <button
            onClick={(e) => {
              e.stopPropagation();

              if (isKnown) onUnmarkKnown(word.id);
              else onMarkKnown(word.id);

              setPressed(true);
              setTimeout(() => setPressed(false), 600);
            }}
            className={`
              w-full py-2 sm:py-2.5 
              rounded-xl text-white font-black 
              bg-gradient-to-r ${gradientClass} 
              text-sm sm:text-base
              shadow-lg hover:shadow-xl
              transition-all hover:scale-105
              ${pressed ? "bounce-success" : ""}
            `}
          >
            {isKnown ? (
              "↩ Geri Al"
            ) : (
              <>
                <span className="checkmark">✓</span> Biliyorum
              </>
            )}
          </button>
        </div>
      </div>

      {/* 🔊 Speak Button - Modern stil */}
      {mode === "en-tr" && !flipped && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            speak();
          }}
          className="
            absolute top-2 left-2 
            bg-gradient-to-r from-purple-500 to-fuchsia-500
            text-white 
            px-2 sm:px-2.5 py-1.5 
            text-xs sm:text-sm
            rounded-xl shadow-lg
            hover:scale-110
            transition-all
            font-bold
            border border-white/20
          "
        >
          🔊
        </button>
      )}

      {/* 📝 Note Icon - Modern stil */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenNoteModal(word);
        }}
        className={`
          absolute top-2 right-2  
          text-xs sm:text-sm 
          px-2 sm:px-2.5 py-1.5 
          rounded-xl shadow-lg 
          transition-all
          hover:scale-110
          font-bold
          border border-white/20
          ${
            note
              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
              : "bg-white/90 text-gray-600 hover:bg-white"
          }
        `}
      >
        📝
      </button>
    </div>
  );
}
