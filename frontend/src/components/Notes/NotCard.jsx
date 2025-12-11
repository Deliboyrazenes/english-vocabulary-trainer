import React from "react";

export default function NotCard({ note, onPin, onDelete, onEdit }) {
  const colorMap = {
    yellow:
      "from-yellow-400/25 via-orange-400/10 to-amber-300/10 border-yellow-300/60",
    purple:
      "from-purple-500/30 via-fuchsia-500/15 to-indigo-500/10 border-purple-300/60",
    blue: "from-sky-400/30 via-blue-500/15 to-indigo-500/10 border-sky-300/60",
  };

  return (
    <div
      className={`relative p-5 sm:p-6 rounded-3xl bg-gradient-to-br ${
        colorMap[note.color] ||
        "from-white/10 via-white/5 to-white/0 border-white/20"
      } border backdrop-blur-xl shadow-xl transition transform hover:-translate-y-0.5 hover:shadow-2xl`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1">
          {note.categoryLabel && (
            <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-black/15 text-xs font-semibold">
              <span>{note.icon}</span>
              {note.categoryLabel}
            </span>
          )}
          <h2 className="text-base sm:text-lg font-bold mt-1">
            {note.title || "Başlıksız Not"}
          </h2>
        </div>

        <button
          onClick={onPin}
          className="text-xl sm:text-2xl hover:scale-110 transition"
        >
          {note.pinned ? "📌" : "📍"}
        </button>
      </div>

      {/* CONTENT */}
      <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-h-32 sm:max-h-36 overflow-hidden pr-1">
        {note.content}
      </p>

      {/* FOOTER BUTTONS */}
      <div className="flex justify-end gap-2 mt-4">
        {/* Düzenle */}
        <button
          onClick={onEdit}
          className="px-3 py-1.5 text-xs bg-blue-500/40 rounded-lg hover:bg-blue-500/60 transition flex items-center gap-1"
        >
          ✏️ Düzenle
        </button>

        {/* Sil */}
        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-xs bg-red-500/40 rounded-lg hover:bg-red-500/60 transition flex items-center gap-1"
        >
          🗑 Sil
        </button>
      </div>
    </div>
  );
}
