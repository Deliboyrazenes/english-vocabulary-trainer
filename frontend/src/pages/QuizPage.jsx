// src/pages/QuizPage.jsx
import React, { useState, useMemo } from "react";

/* ----------------- GELİŞMİŞ NORMALIZE (TÜRKÇE DESTEKLİ) ----------------- */
function normalize(str) {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .replaceAll("â", "a")
    .replaceAll("î", "i")
    .replaceAll("û", "u")
    .replaceAll("ç", "c")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ö", "o")
    .replaceAll("ü", "u")
    .replaceAll("ı", "i")
    .replace(/[^a-z0-9]/g, ""); // tüm özel karakterleri temizle
}

/* ----------------- Levenshtein ----------------- */
function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

/* ---------------------- GELİŞMİŞ TÜRKÇE TYPO DEĞERLENDİRME ---------------------- */
function evaluateAnswer(userAnswer, correctAnswer) {
  const user = normalize(userAnswer);
  const correct = normalize(correctAnswer);

  // komple boş ise yanlış
  if (!user) return { status: "wrong", correctAnswer, empty: true };

  // birebir doğru
  if (user === correct) return { status: "perfect", correctAnswer };

  const dist = levenshtein(user, correct);

  /* ---------------------------------------------------------
   TÜM KÖTÜ→KÖTÜÜ, BARIS→BARIŞ, KÖTTÜ, BARRIŞ gibi varyasyonların
   tamamını DOĞRU saymak için geniş tolerans:
  --------------------------------------------------------- */

  // kısa kelimelerde ( ≤ 4 ) → max 2 fark
  if (correct.length <= 4 && dist <= 2) {
    return { status: "typo-ok", correctAnswer };
  }

  // orta kelimelerde (5–7 harf) → max 3 fark
  if (correct.length <= 7 && dist <= 3) {
    return { status: "typo-ok", correctAnswer };
  }

  // uzun kelimelerde → max 4 fark
  if (correct.length >= 8 && dist <= 4) {
    return { status: "typo-ok", correctAnswer };
  }

  // Özel durum: tekrar harf (kötüüü / köttüü / barrış)
  if (/(.)\1{1,}/.test(userAnswer)) {
    if (dist <= 3) return { status: "typo-ok", correctAnswer };
  }

  // Başında fazladan harf → "kkötü", "bbari̇s"
  if (user.length > correct.length && user.startsWith(correct[0])) {
    if (dist <= 3) return { status: "typo-ok", correctAnswer };
  }

  // Ortada fazlalık (baarrış)
  if (user.includes(correct)) {
    return { status: "typo-ok", correctAnswer };
  }

  return { status: "wrong", correctAnswer };
}

/* ---------------- pos normalize ---------------- */
function normalizePos(pos) {
  if (!pos) return "unknown";
  const x = pos.toLowerCase();
  if (x === "v") return "verb";
  if (x === "n") return "noun";
  if (x === "adj") return "adj";
  return "unknown";
}

/* ---------------- fill cümlesi ---------------- */
function generateFillSentence(word, pos) {
  const r = (a) => a[Math.floor(Math.random() * a.length)];

  if (pos === "verb")
    return `${r(["I", "You", "He", "She"])} ${r([
      "will",
      "can",
      "should",
    ])} _____ ${r(["the project", "the idea"])} ${r(["tomorrow", "soon"])}.`;

  if (pos === "noun")
    return `${r(["a", "the"])} _____ ${r(["is important", "is missing"])} ${r([
      "today",
      "later",
    ])}.`;

  if (pos === "adj")
    return `${r(["The idea", "The task"])} ${r(["is", "looks"])} _____ ${r([
      "today",
      "these days",
    ])}.`;

  return `Please _____ it later.`;
}

/* ======================================================================= */
/*                                QUIZ PAGE                                */
/* ======================================================================= */
export default function QuizPage({ onBack }) {
  const { settings, words } = window.quizData || {};

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);

  /* ---------------- Soru oluşturma ---------------- */
  const questions = useMemo(() => {
    if (!settings || !words) return [];
    return words.map((w, idx) => {
      let mode = settings.quizType;

      if (mode === "mcq-en-tr") mode = "mcq";
      if (mode === "input-en-tr" || mode === "input-tr-en") mode = "input";

      if (settings.quizType === "mixed") {
        const m = idx % 3;
        mode = ["mcq", "input", "fill-mcq"][m];
      }

      let answer = "";
      let options = null;
      let question = "";
      let sentence = null;

      if (mode === "mcq") {
        question = w.en;
        answer = w.tr;
        const wrongs = [...words]
          .filter((x) => x.id !== w.id)
          .slice(0, 3)
          .map((x) => x.tr);
        options = [...wrongs, w.tr].sort(() => Math.random() - 0.5);
      }

      if (mode === "input") {
        question = w.en;
        answer = w.tr;
      }

      if (mode === "fill-mcq") {
        const pos = normalizePos(w.type);
        sentence = generateFillSentence(w.en, pos);
        question = "Boşluğu doğru kelime ile doldur:";
        answer = w.en;

        const wrongs = [...words]
          .filter((x) => x.id !== w.id)
          .slice(0, 3)
          .map((x) => x.en);
        options = [...wrongs, w.en].sort(() => Math.random() - 0.5);
      }

      return { mode, word: w, question, options, sentence, answer };
    });
  }, [settings, words]);

  const current = questions[index];

  /* ---------------- cevap kontrol ---------------- */
  const checkAnswer = () => {
    let result;

    if (current.mode === "input") {
      result = evaluateAnswer(inputText, current.answer);
    } else {
      if (!selected)
        result = {
          status: "wrong",
          correctAnswer: current.answer,
          empty: true,
        };
      else if (selected === current.answer)
        result = { status: "perfect", correctAnswer: current.answer };
      else result = { status: "wrong", correctAnswer: current.answer };
    }

    setStatus(result);
  };

  /* ---------------- sonraki soru ---------------- */
  const next = () => {
    setResults((p) => [
      ...p,
      {
        status: status.status,
        empty: status.empty || false,
        correct: current.answer,
      },
    ]);

    setSelected(null);
    setInputText("");
    setStatus(null);

    if (index + 1 >= questions.length) setFinished(true);
    else setIndex(index + 1);
  };

  /* ======================================================================= */
  /*                               BİTİŞ EKRANI                              */
  /* ======================================================================= */
  if (finished) {
    const correct = results.filter(
      (r) => r.status === "perfect" || r.status === "typo-ok"
    ).length;
    const wrong = results.filter((r) => r.status === "wrong").length;
    const empty = results.filter((r) => r.empty).length;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-10">
        <div className="bg-white/10 p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full">
          <h1 className="text-4xl font-bold mb-6">Quiz Tamamlandı 🎉</h1>

          <p className="text-xl">
            ✔ Doğru: <b>{correct}</b>
          </p>
          <p className="text-xl">
            ✘ Yanlış: <b>{wrong}</b>
          </p>
          <p className="text-xl">
            ○ Boş: <b>{empty}</b>
          </p>

          <p className="mt-6 text-3xl font-bold">
            Skor: {correct} / {questions.length}
          </p>

          <button
            onClick={onBack}
            className="mt-8 px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl"
          >
            Ana Sayfa
          </button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  /* ======================================================================= */
  /*                               SORU EKRANI                                */
  /* ======================================================================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
      <div className="bg-white/10 p-10 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl max-w-2xl w-full">
        {/* Başlık */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Quiz 🚀</h1>
          <p className="text-sm opacity-70 mt-1">
            Soru {index + 1} / {questions.length}
          </p>
        </div>

        {/* Soru */}
        <div className="bg-white/10 p-5 rounded-xl text-center text-xl border border-white/20 mb-4">
          {current.question}
        </div>

        {/* fill-mcq cümlesi */}
        {current.mode === "fill-mcq" && (
          <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-center text-lg mb-6">
            {current.sentence}
          </div>
        )}

        {/* MCQ */}
        {(current.mode === "mcq" || current.mode === "fill-mcq") && (
          <div className="grid gap-3 mb-6">
            {current.options.map((opt, i) => {
              let cls =
                "bg-white text-black hover:scale-105 transition rounded-xl p-3 text-lg";

              if (status) {
                if (opt === current.answer)
                  cls = "bg-green-500 text-white animate-pulse p-3 rounded-xl";
                else if (selected === opt)
                  cls = "bg-red-500 text-white shake rounded-xl p-3";
                else cls = "bg-gray-600 text-white opacity-40 p-3 rounded-xl";
              } else if (selected === opt) {
                cls = "bg-indigo-300 text-black p-3 rounded-xl";
              }

              return (
                <button
                  key={i}
                  disabled={status !== null}
                  onClick={() => setSelected(opt)}
                  className={cls}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Input */}
        {current.mode === "input" && (
          <div className="text-center mb-5">
            <input
              className="w-full p-3 rounded-xl text-black"
              value={inputText}
              disabled={status !== null}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Cevap yaz..."
            />
          </div>
        )}

        {/* Geribildirim */}
        {status && (
          <div className="text-center mb-3 text-lg text-yellow-200">
            {status.status === "perfect" && "✔ Doğru!"}
            {status.status === "typo-ok" &&
              "✔ Küçük yazım hatası ama doğru sayıldı!"}
            {status.empty && "○ Boş bırakıldı"}
            {status.status === "wrong" && "✘ Yanlış"}

            <div className="mt-1">
              Doğru Cevap: <b className="text-white">{status.correctAnswer}</b>
            </div>
          </div>
        )}

        {/* Buton */}
        <div className="text-center">
          {status === null ? (
            <button
              onClick={checkAnswer}
              className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:scale-105 transition"
            >
              Kontrol Et
            </button>
          ) : (
            <button
              onClick={next}
              className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:scale-105 transition"
            >
              Sonraki →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
