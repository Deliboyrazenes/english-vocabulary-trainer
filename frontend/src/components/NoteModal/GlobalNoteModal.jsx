import React, { useState, useEffect } from "react";

export default function GlobalNoteModal({ word, note, onSaveNote, onDeleteNote, onClose }) {
  const [draft, setDraft] = useState(note || "");
  const [charCount, setCharCount] = useState((note || "").length);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCharCount(draft.length);
  }, [draft]);

  // Demo word data
  const demoWord = word || {
    id: 1,
    en: "example",
    tr: "örnek",
    type: "noun",
    level: "A1"
  };

  const MAX_CHARS = 500;
  const progress = (charCount / MAX_CHARS) * 100;

  const handleSave = async () => {
    if (draft.trim()) {
      setIsSaving(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      if (onSaveNote) onSaveNote(demoWord.id, draft.trim());
      setIsSaving(false);
      if (onClose) onClose();
    }
  };

  const handleDelete = () => {
    if (window.confirm("Bu notu silmek istediğinizden emin misiniz?")) {
      if (onDeleteNote) onDeleteNote(demoWord.id);
      if (onClose) onClose();
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl relative overflow-hidden"
        style={{ maxWidth: '52rem' }}
      >
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">📝</span>
                <h2 className="text-2xl font-bold text-white">Not Düzenle</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-white/90 text-sm">
                <span className="px-3 py-1 bg-white/20 rounded-full font-semibold backdrop-blur-sm text-white">
                  {demoWord.en}
                </span>
                <span className="text-white">→</span>
                <span className="px-3 py-1 bg-white/20 rounded-full font-semibold backdrop-blur-sm text-white">
                  {demoWord.tr}
                </span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm text-white">
                  {demoWord.level}
                </span>
              </div>
            </div>

            <button
              onClick={() => onClose && onClose()}
              className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 hover:rotate-90 text-white"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Textarea */}
          <div className="relative">
            <textarea
              rows="13"
              className="w-full border-2 border-gray-200 focus:border-indigo-500 p-4 rounded-2xl text-base resize-none outline-none transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm text-gray-800 placeholder-gray-400"
              placeholder="✍️ Notunu buraya yaz... (Örnek cümle, telaffuz ipucu, eş anlamlı, hatırlatma vb.)"
              value={draft}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARS) {
                  setDraft(e.target.value);
                }
              }}
              onKeyDown={handleKeyDown}
              autoFocus
            />

            {/* Character Counter */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <div className="relative w-12 h-12">
                {/* Progress Circle */}
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke={progress > 90 ? "#ef4444" : progress > 70 ? "#f59e0b" : "#6366f1"}
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${progress * 1.25} 125`}
                    className="transition-all duration-300"
                  />
                </svg>
                <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${
                  progress > 90 ? "text-red-600" : progress > 70 ? "text-amber-600" : "text-indigo-600"
                }`}>
                  {charCount}
                </span>
              </div>
            </div>
          </div>

          {/* Helper Text */}
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <span>💡</span>
            <span className="text-gray-600">İpucu: <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 font-mono text-xs text-gray-700">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 font-mono text-xs text-gray-700">Enter</kbd> ile hızlı kaydet</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex gap-2">
              {note && (
                <button
                  onClick={handleDelete}
                  className="px-5 py-3 rounded-xl bg-red-50 hover:bg-red-100 border-2 border-red-200 text-red-600 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>🗑️</span> <span className="text-red-600">Notu Sil</span>
                </button>
              )}
              
              <button
                onClick={() => setDraft("")}
                className="px-5 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 text-gray-600 font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Temizle
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onClose && onClose()}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all duration-200"
              >
                İptal
              </button>

              <button
                onClick={handleSave}
                disabled={!draft.trim() || isSaving}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  draft.trim() && !isSaving
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:shadow-xl hover:scale-105 active:scale-95"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-white">Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <span>💾</span>
                    <span className="text-white">Kaydet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Word Info Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-gray-600">Kelime Tipi:</span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-xs">
                {demoWord.type.toUpperCase()}
              </span>
            </div>
            {note && (
              <div className="text-gray-500 text-xs">
                📅 Son güncelleme: Şimdi
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}