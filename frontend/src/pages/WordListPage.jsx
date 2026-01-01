import React, { useEffect, useState, useMemo } from "react";
import api from "../services/axios";

import FilterBar from "../components/FilterBar/FilterBar";
import StatsBar from "../components/StatsBar/StatsBar";
import WordCard from "../components/WordCard/WordCard";
import GlobalNoteModal from "../components/NoteModal/GlobalNoteModal";
import QuizSetupModal from "../components/Quiz/QuizSetupModal";
import SkeletonWordList from "../components/Skeleton/SkeletonWordList";
import AIExampleModal from "../components/AIModal/AIExampleModal";

import { FixedSizeGrid as Grid } from "react-window";

const normalizeType = (t) => {
  if (!t) return "";
  const x = t.toLowerCase();
  if (x === "n") return "noun";
  if (x === "v") return "verb";
  if (x === "adj") return "adj";
  if (x === "adv") return "adv";
  return x;
};

export default function WordListPage({
  user,
  onLogout,
  onOpenProfile,
  onOpenNotes,
  onStartQuiz,
}) {
  const [words, setWords] = useState([]);
  const [knownWordIds, setKnownWordIds] = useState([]);
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);

  const [filters, setFilters] = useState({
    level: "all",
    type: "all",
    search: "",
  });

  const [mode, setMode] = useState("en-tr");
  const [shuffled, setShuffled] = useState(false);
  const [viewMode, setViewMode] = useState("learning");

  const [showQuizSetup, setShowQuizSetup] = useState(false);

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [selectedAIWord, setSelectedAIWord] = useState(null);

  /* ------------------------ LOAD DATA ------------------------ */
  useEffect(() => {
    let cancelled = false;

    const loadMeta = async () => {
      try {
        const [knownRes, notesRes] = await Promise.all([
          api.get("/known-words"),
          api.get("/notes/by-user"),
        ]);

        if (cancelled) return;

        setKnownWordIds(knownRes.data.map((item) => item.word.id));

        const map = {};
        notesRes.data.forEach((n) => {
          if (n.word?.id) map[n.word.id] = n.text;
        });
        setNotes(map);
      } catch (err) {
        console.error(err);
      }
    };

    const loadAllWords = async () => {
      try {
        const allRes = await api.get("/words"); // TÜM kelimeler
        if (cancelled) return;
        setWords(allRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    const loadInitial = async () => {
      try {
        setLoading(true);

        // 🔥 1️⃣ İlk 300 kelime
        const firstRes = await api.get("/words?limit=300");
        if (cancelled) return;

        setWords(firstRes.data);
        setLoading(false);

        // 🔥 2️⃣ Arkadan yüklenenler
        loadMeta();
        loadAllWords();
      } catch (err) {
        console.error(err);
        setError("Backend bağlantı hatası");
        setLoading(false);
      }
    };

    loadInitial();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ------------------ MARK KNOWN / UNMARK ------------------ */
  const markAsKnown = async (id) => {
    setTimeout(() => {
      setKnownWordIds((p) => [...p, id]);
    }, 600);

    try {
      await api.post("/known-words", { wordId: id });
    } catch {
      alert("Hata oluştu");
    }
  };

  const unmarkKnown = async (id) => {
    setTimeout(() => {
      setKnownWordIds((p) => p.filter((x) => x !== id));
    }, 600);

    try {
      await api.delete("/known-words", {
        params: { wordId: id },
      });
    } catch {
      alert("Hata oluştu");
    }
  };

  /* ------------------------ SAVE / DELETE NOTE ------------------------ */
  const handleSaveNote = async (id, text) => {
    try {
      await api.post("/notes/save", {
        wordId: id,
        text,
      });

      setNotes((p) => ({ ...p, [id]: text }));
    } catch {
      alert("Not kaydedilemedi");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await api.delete("/notes", {
        params: { wordId: id },
      });

      setNotes((p) => {
        const c = { ...p };
        delete c[id];
        return c;
      });
    } catch {
      alert("Not silinemedi");
    }
  };

  /* ------------------------ FILTERED WORDS ------------------------ */
  const filteredWords = useMemo(() => {
    let result = words.filter((w) => {
      const matchLevel = filters.level === "all" || w.level === filters.level;

      const matchType =
        filters.type === "all" || normalizeType(w.type) === filters.type;

      const matchSearch =
        w.en.toLowerCase().includes(filters.search.toLowerCase()) ||
        w.tr.toLowerCase().includes(filters.search.toLowerCase());

      const isKnown = knownWordIds.includes(w.id);
      const hasNote = !!notes[w.id];

      // View Mode Logic
      let matchView = false;
      if (viewMode === "known") {
        matchView = isKnown;
      } else if (viewMode === "with-notes") {
        matchView = hasNote;
      } else {
        // "learning" mode (default) -> Show Unknown words
        matchView = !isKnown;
      }

      return matchLevel && matchType && matchSearch && matchView;
    });

    if (shuffled) return [...result].sort(() => Math.random() - 0.5);

    return result;
  }, [words, filters, knownWordIds, viewMode, notes, shuffled]);

  /* ------------------------ QUIZ START ------------------------ */
  const handleStartQuizFromModal = (settings) => {
    setShowQuizSetup(false);

    let quizWords = [];

    if (settings.wordSource === "unknown") {
      quizWords = words.filter((w) => !knownWordIds.includes(w.id));
    } else if (settings.wordSource === "known") {
      quizWords = words.filter((w) => knownWordIds.includes(w.id));
    } else {
      quizWords = [...words];
    }

    quizWords = quizWords.sort(() => Math.random() - 0.5);
    quizWords = quizWords.slice(0, settings.questionCount);

    onStartQuiz(settings, quizWords);
  };

  /* ------------------------ LOADING / ERROR ------------------------ */
  if (loading) return <SkeletonWordList />;

  if (error)
    return (
      <div className="min-h-screen text-white flex items-center justify-center bg-red-500">
        {error}
      </div>
    );

  /* ------------------------ GRID CONFIG ------------------------ */
  const CARD_WIDTH = 280;
  const CARD_HEIGHT = 210;
  const GAP = 25;
  const screenWidth = window.innerWidth;

  const COLUMNS =
    screenWidth > 1600
      ? 5
      : screenWidth > 1200
      ? 4
      : screenWidth > 900
      ? 3
      : screenWidth > 600
      ? 2
      : 1;

  const rowCount = Math.ceil(filteredWords.length / COLUMNS);
  const GRID_HEIGHT = window.innerHeight - 50;

  /* ------------------------ RENDER ------------------------ */
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-950 via-fuchsia-950 to-purple-950">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.15)_1px,transparent_0)] bg-[size:40px_40px]"></div>

      <div className="relative z-10 p-4 md:p-6 overflow-auto text-white">
        <div className="max-w-[1800px] mx-auto">
          {/* MODERN PROFESSIONAL HEADER */}
          <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5 mb-6 sm:mb-8 bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl">
            {/* Logo & Welcome */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-xl rotate-6 hover:rotate-0 transition-transform cursor-pointer border-2 border-white/20">
                📚
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                  Vocab<span className="text-yellow-400">Zone</span>
                </h1>
                <p className="text-xs sm:text-sm text-white/60 font-semibold">
                  Hoş geldin, {user.name} 👋
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notes Button */}
              <button
                onClick={onOpenNotes}
                className="group relative px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all hover:scale-105 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg"
              >
                <span className="text-lg sm:text-xl">📝</span>
                <span className="hidden sm:inline">Notlarım</span>
              </button>

              {/* Profile Button */}
              <button
                onClick={onOpenProfile}
                className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all hover:scale-105 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg"
              >
                <span className="text-lg sm:text-xl">👤</span>
                <span className="hidden md:inline">Profil</span>
              </button>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-xl bg-red-500/90 backdrop-blur-sm border-2 border-red-400/40 hover:bg-red-600 hover:border-red-400/60 transition-all hover:scale-105 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg"
              >
                <span className="text-lg sm:text-xl">🚪</span>
                <span className="hidden md:inline">Çıkış</span>
              </button>
            </div>
          </nav>

          {/* FILTER */}
          <FilterBar
            level={filters.level}
            type={filters.type}
            search={filters.search}
            onFilterChange={(k, v) => setFilters((p) => ({ ...p, [k]: v }))}
          />

          {/* STATS */}
          <StatsBar
            total={words.length}
            a1={words.filter((w) => w.level === "A1").length}
            a2={words.filter((w) => w.level === "A2").length}
            b1={words.filter((w) => w.level === "B1").length}
            b2={words.filter((w) => w.level === "B2").length}
            c1={words.filter((w) => w.level === "C1").length}
            known={knownWordIds.length}
          />

          {/* Controls Section */}
          <div className="flex justify-center mb-6 sm:mb-8 gap-2 sm:gap-3 md:gap-4 flex-wrap px-2 sm:px-4">
            {/* Tabs (View Modes) */}
            <div className="bg-white/5 backdrop-blur-md p-2 rounded-2xl inline-flex border border-white/20 shadow-xl">
              {/* Learning (Unknown) */}
              <button
                className={`px-3 md:px-5 py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all ${
                  viewMode === "learning"
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg scale-105"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setViewMode("learning")}
              >
                📘 Öğrenilecekler
              </button>

              {/* Known */}
              <button
                className={`px-3 md:px-5 py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all ${
                  viewMode === "known"
                    ? "bg-gradient-to-r from-emerald-400 to-green-500 text-black shadow-lg scale-105"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setViewMode("known")}
              >
                ✓ Bildiklerim
              </button>
              
              {/* With Notes (NEW) */}
              <button
                className={`px-3 md:px-5 py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all ${
                    viewMode === "with-notes"
                    ? "bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg scale-105"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setViewMode("with-notes")}
              >
                📝 Notlu Kelimeler
              </button>
            </div>

            {/* Mode */}
            <div className="bg-white/5 backdrop-blur-md p-2 rounded-2xl inline-flex border border-white/20 shadow-xl">
              <button
                className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all ${
                  mode === "en-tr"
                    ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg scale-105"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setMode("en-tr")}
              >
                EN → TR
              </button>

              <button
                className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all ${
                  mode === "tr-en"
                    ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg scale-105"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setMode("tr-en")}
              >
                TR → EN
              </button>
            </div>

            {/* Shuffle */}
            <button
              onClick={() => setShuffled(!shuffled)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all ${
                shuffled
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105"
                  : "bg-white/5 text-white hover:bg-white/10 border border-white/20"
              }`}
            >
              🔀 {shuffled ? "Karışık" : "Normal"}
            </button>

            {/* Quiz Button */}
            <button
              onClick={() => setShowQuizSetup(true)}
              className="px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-sm md:text-base bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg transition-all hover:scale-105"
            >
              🧠 Quiz Başlat
            </button>
          </div>

          {/* Word Grid */}
          <div className="flex justify-center">
            <div className="bg-white/5 backdrop-blur-md p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              <Grid
                columnCount={COLUMNS}
                columnWidth={CARD_WIDTH + GAP}
                height={GRID_HEIGHT}
                rowCount={rowCount}
                rowHeight={CARD_HEIGHT + GAP}
                width={Math.min((CARD_WIDTH + GAP) * COLUMNS, screenWidth - 20)}
              >
                {({ columnIndex, rowIndex, style }) => {
                  const idx = rowIndex * COLUMNS + columnIndex;
                  const word = filteredWords[idx];

                  if (!word) return null;

                  return (
                    <div style={style} className="px-1 sm:px-2">
                      <WordCard
                        word={word}
                        isKnown={knownWordIds.includes(word.id)}
                        onMarkKnown={markAsKnown}
                        onUnmarkKnown={unmarkKnown}
                        mode={mode}
                        note={notes[word.id]}
                        onOpenNoteModal={(w) => {
                          setSelectedWord(w);
                          setNoteModalOpen(true);
                        }}
                        onOpenAIModal={(w) => {
                          setSelectedAIWord(w);
                          setAiModalOpen(true);
                        }}
                      />
                    </div>
                  );
                }}
              </Grid>
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ MODAL */}
      <QuizSetupModal
        isOpen={showQuizSetup}
        onClose={() => setShowQuizSetup(false)}
        onStart={handleStartQuizFromModal}
        maxQuestions={words.length}
      />

      {/* NOTE MODAL */}
      {noteModalOpen && (
        <GlobalNoteModal
          word={selectedWord}
          note={selectedWord ? notes[selectedWord.id] : ""}
          onSaveNote={handleSaveNote}
          onDeleteNote={handleDeleteNote}
          onClose={() => setNoteModalOpen(false)}
        />
      )}

      {/* AI MODAL */}
      {aiModalOpen && selectedAIWord && (
        <AIExampleModal
          key={selectedAIWord.id}
          word={selectedAIWord}
          isOpen={aiModalOpen}
          onClose={() => {
            setAiModalOpen(false);
            setSelectedAIWord(null);
          }}
          onSaved={(wordId, text) => {
            setNotes((prev) => ({
              ...prev,
              [wordId]: text,
            }));
          }}
        />
      )}

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
