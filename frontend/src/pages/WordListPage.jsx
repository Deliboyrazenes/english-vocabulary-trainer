import React, { useEffect, useState, useMemo } from "react";
import api from "../services/axios";

import FilterBar from "../components/FilterBar/FilterBar";
import StatsBar from "../components/StatsBar/StatsBar";
import WordCard from "../components/WordCard/WordCard";
import GlobalNoteModal from "../components/NoteModal/GlobalNoteModal";
import QuizSetupModal from "../components/Quiz/QuizSetupModal";
import SkeletonWordList from "../components/Skeleton/SkeletonWordList";

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
  const [showKnown, setShowKnown] = useState(false);

  const [showQuizSetup, setShowQuizSetup] = useState(false);

  /* ------------------------ LOAD DATA ------------------------ */
  useEffect(() => {
    const load = async () => {
      try {
        const [wordsRes, knownRes, notesRes] = await Promise.all([
          api.get("/words"),
          api.get("/known-words"), // userId kaldırıldı
          api.get("/notes/by-user"), // userId kaldırıldı
        ]);

        setWords(wordsRes.data);
        setKnownWordIds(knownRes.data.map((item) => item.word.id));

        const map = {};
        notesRes.data.forEach((n) => {
          if (n.word?.id) map[n.word.id] = n.text;
        });
        setNotes(map);
      } catch (err) {
        console.error(err);
        setError("Backend bağlantı hatası");
      } finally {
        setLoading(false);
      }
    };
    load();
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

      return (
        matchLevel &&
        matchType &&
        matchSearch &&
        (showKnown ? isKnown : !isKnown)
      );
    });

    if (shuffled) return [...result].sort(() => Math.random() - 0.5);

    return result;
  }, [words, filters, knownWordIds, showKnown, shuffled]);

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
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-auto text-white">
      <div className="max-w-[1800px] mx-auto">
        {/* HEADER */}
        <div className="bg-white/10 p-4 md:p-5 rounded-3xl mb-6 border border-white/20 shadow-xl backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Hoş geldin 👋</h1>
            <p className="text-white/70 text-sm">{user.name}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onOpenProfile}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all"
            >
              Profil
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
            >
              Çıkış
            </button>
          </div>
        </div>

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
        <div className="flex justify-center mb-8 gap-3 md:gap-4 flex-wrap px-4">
          {/* Tabs */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl inline-flex border border-white/20 shadow-xl">
            <button
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all ${
                !showKnown
                  ? "bg-white text-indigo-600 shadow-lg scale-105"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setShowKnown(false)}
            >
              📘 Tüm Kelimeler
            </button>

            <button
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all ${
                showKnown
                  ? "bg-white text-indigo-600 shadow-lg scale-105"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setShowKnown(true)}
            >
              ✓ Bildiklerim
            </button>
          </div>

          {/* Mode */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl inline-flex border border-white/20 shadow-xl">
            <button
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all ${
                mode === "en-tr"
                  ? "bg-white text-indigo-600 shadow-lg scale-105"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMode("en-tr")}
            >
              EN → TR
            </button>

            <button
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all ${
                mode === "tr-en"
                  ? "bg-white text-indigo-600 shadow-lg scale-105"
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
            className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all ${
              shuffled
                ? "bg-white text-indigo-600 shadow-lg scale-105"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
            }`}
          >
            🔀 {shuffled ? "Karışık" : "Normal"}
          </button>

          {/* Quiz Button */}
          <button
            onClick={() => setShowQuizSetup(true)}
            className="px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base bg-emerald-500 hover:bg-emerald-600 shadow-lg transition-all"
          >
            🧠 Quiz Başlat
          </button>
        </div>

        {/* Word Grid - Centered with Better Spacing */}
        <div className="flex justify-center">
          <div className="bg-white/10 p-6 md:p-8 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md">
            <Grid
              columnCount={COLUMNS}
              columnWidth={CARD_WIDTH + GAP}
              height={GRID_HEIGHT}
              rowCount={rowCount}
              rowHeight={CARD_HEIGHT + GAP}
              width={(CARD_WIDTH + GAP) * COLUMNS}
            >
              {({ columnIndex, rowIndex, style }) => {
                const idx = rowIndex * COLUMNS + columnIndex;
                const word = filteredWords[idx];

                if (!word) return null;

                return (
                  <div style={style} className="px-2">
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
                    />
                  </div>
                );
              }}
            </Grid>
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
    </div>
  );
}
