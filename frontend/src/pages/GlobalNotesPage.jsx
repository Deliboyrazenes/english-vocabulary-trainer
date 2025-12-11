import React, { useState, useEffect } from "react";
import api from "../services/axios";
import NotCard from "../components/Notes/NotCard";

export default function GlobalNotesPage({ onBack }) {
  const [notes, setNotes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [editingNote, setEditingNote] = useState(null);

  const [search, setSearch] = useState("");

  const categories = [
    { key: "general", label: "Genel Notlar", icon: "📝", color: "yellow" },
    { key: "grammar", label: "Gramer Notları", icon: "📘", color: "purple" },
    { key: "sentences", label: "Kalıp Cümleler", icon: "💬", color: "blue" },
  ];

  useEffect(() => {
    api
      .get("/notes/global")
      .then((res) => {
        const mapped = res.data.map((n) => {
          const cat = categories.find((c) => c.key === n.category);
          return {
            ...n,
            categoryLabel: cat?.label,
            icon: cat?.icon,
          };
        });
        setNotes(mapped);
      })
      .catch((err) => console.error("NOT GETIR HATASI:", err));
  }, []);

  const resetForm = () => {
    setEditingNote(null);
    setTitle("");
    setContent("");
    setCategory("general");
  };

  const addNote = () => {
    if (!title.trim() && !content.trim()) return;

    const cat = categories.find((c) => c.key === category);

    const payload = {
      title,
      content,
      category,
      color: cat.color,
      icon: cat.icon,
    };

    api
      .post("/notes/global", payload)
      .then((res) => {
        const saved = {
          ...res.data,
          categoryLabel: cat.label,
          icon: cat.icon,
        };

        setNotes((prev) => [saved, ...prev]);
        resetForm();
      })
      .catch((err) => console.error("NOT KAYDET HATASI:", err));
  };

  const startEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
  };

  const updateNote = () => {
    if (!editingNote) return;

    const payload = {
      id: editingNote.id,
      title,
      content,
      category,
      color: editingNote.color,
      icon: editingNote.icon,
      pinned: editingNote.pinned,
    };

    api
      .put("/notes/global", payload)
      .then((res) => {
        setNotes((prev) =>
          prev.map((n) => (n.id === payload.id ? res.data : n))
        );

        resetForm();
      })
      .catch((err) => console.error("UPDATE ERROR:", err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/notes/global/${id}`)
      .then(() => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
      })
      .catch((err) => console.error("DELETE ERROR:", err));
  };

  const togglePin = (id) => {
    api
      .post(`/notes/global/${id}/pin`)
      .then((res) => {
        setNotes((prev) =>
          prev
            .map((n) => (n.id === id ? { ...n, pinned: res.data.pinned } : n))
            .sort((a, b) => Number(b.pinned) - Number(a.pinned))
        );
      })
      .catch((err) => console.error("PIN ERROR:", err));
  };

  const filteredNotes = notes
    .filter((n) => activeCategory === "all" || n.category === activeCategory)
    .filter(
      (n) =>
        n.title.toLowerCase().includes(search) ||
        n.content.toLowerCase().includes(search)
    );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-violet-950 via-fuchsia-950 to-purple-950 text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 blur-3xl rounded-full mix-blend-multiply animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 blur-3xl rounded-full mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-pink-500 blur-3xl rounded-full mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6 sm:p-10">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={onBack}
            className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-bold hover:bg-white/20 transition"
          >
            ← Kelimeler
          </button>
          <h1 className="text-4xl font-black tracking-wide">📓 Notlarım</h1>
          <div className="opacity-0">x</div>
        </div>

        {/* SEARCH + FILTER (Yan yana) */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
          {/* SEARCH INPUT */}
          <input
            type="text"
            placeholder="🔍 Notlarda ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            className="w-full lg:w-80 px-4 py-3 rounded-xl bg-white/10 border border-white/20 
              placeholder-white/40 outline-none focus:border-yellow-400 backdrop-blur-xl"
          />

          {/* FILTER BUTTONS */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2.5 rounded-xl font-semibold transition border
                ${
                  activeCategory === "all"
                    ? "bg-white text-indigo-700 border-white"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                }`}
            >
              🌐 Tümü
            </button>

            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                className={`px-5 py-2.5 rounded-xl font-semibold transition border flex items-center gap-2
                  ${
                    activeCategory === c.key
                      ? "bg-white text-indigo-700 border-white"
                      : "bg-white/10 border-white/20 hover:bg-white/20"
                  }`}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* PANEL + EDITOR */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT PANEL */}
          <div className="w-full lg:w-[400px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-xl flex flex-col gap-6">
            <h2 className="text-2xl font-bold">
              {editingNote ? "Notu Düzenle" : "Yeni Not"}
            </h2>

            <div className="w-full h-px bg-white/20"></div>

            <p className="text-white/80 text-sm">Kategori Seç</p>
            <div className="flex flex-col gap-8">
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`px-4 py-2 rounded-xl border text-sm flex items-center gap-2 font-semibold transition-all
                    ${
                      category === c.key
                        ? "bg-white text-indigo-700 border-white shadow-lg scale-[1.03]"
                        : "bg-white/10 border-white/20 hover:bg-white/20"
                    }`}
                >
                  {c.icon} {c.label}
                </button>
              ))}
            </div>

            <div className="w-full h-px bg-white/20"></div>

            {/* GÜNCELLE VEYA KAYDET */}
            {editingNote ? (
              <div className="flex flex-col gap-3">
                <button
                  onClick={updateNote}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl text-black font-bold text-lg hover:scale-105 transition"
                >
                  Güncelle
                </button>

                {/* İPTAL BUTONU */}
                <button
                  onClick={resetForm}
                  className="w-full py-3.5 bg-white/20 border border-white/30 rounded-2xl text-white font-bold text-lg hover:bg-white/30 transition"
                >
                  İptal
                </button>
              </div>
            ) : (
              <button
                onClick={addNote}
                className="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl text-black font-bold text-lg hover:scale-105 transition"
              >
                Notu Kaydet
              </button>
            )}
          </div>

          {/* RIGHT EDITOR */}
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
            <input
              type="text"
              placeholder="BAŞLIK"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl font-bold bg-transparent border-none outline-none placeholder-white/40 mb-6"
            />

            <textarea
              rows="10"
              placeholder="Notunu buraya yaz..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[300px] lg:h-[400px] resize-none text-lg bg-white/5 border border-white/10 rounded-2xl p-5 placeholder-white/40 outline-none focus:border-yellow-400 transition"
            />
          </div>
        </div>

        {/* NOTES GRID */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7 pb-20">
          {filteredNotes.length === 0 ? (
            <div className="text-center opacity-80 col-span-full">
              Not bulunamadı ✨
            </div>
          ) : (
            filteredNotes.map((note) => (
              <NotCard
                key={note.id}
                note={note}
                onPin={() => togglePin(note.id)}
                onDelete={() => deleteNote(note.id)}
                onEdit={() => startEdit(note)}
              />
            ))
          )}
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -40px) scale(1.1);
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
