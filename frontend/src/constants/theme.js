// Theme constants - Tüm renkler, boyutlar ve stiller burada
export const COLORS = {
  gradients: {
    primary: "from-indigo-600 via-purple-600 to-pink-600",
    card: {
      noun: "from-blue-500 to-indigo-600",
      verb: "from-purple-500 to-pink-600",
      adj: "from-green-500 to-teal-600",
      adv: "from-orange-500 to-red-600",
    },
    stats: {
      total: "from-indigo-500 to-purple-600",
      a1: "from-blue-500 to-cyan-600",
      a2: "from-teal-500 to-green-600",
      known: "from-green-500 to-emerald-600",
    },
  },
};

export const ICONS = {
  types: {
    noun: "📦",
    verb: "⚡",
    adj: "🎨",
    adv: "🚀",
  },
  stats: {
    total: "📚",
    a1: "🌱",
    a2: "🌿",
    known: "✨",
  },
};

export const CARD_DIMENSIONS = {
  width: 250,
  height: 180,
  columns: 4,
};

export const GLASS_EFFECT = "bg-white/10 backdrop-blur-md border border-white/20";