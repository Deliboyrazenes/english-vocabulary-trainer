import React from "react";

export default function StatsBar({ total, a1, a2, b1, b2, c1, known }) {
  const stats = [
    {
      label: "A1 Level",
      value: a1,
      icon: "🌱",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      label: "A2 Level",
      value: a2,
      icon: "🌿",
      gradient: "from-teal-500 to-green-600",
    },
    {
      label: "B1 Level",
      value: b1,
      icon: "🌾",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      label: "B2 Level",
      value: b2,
      icon: "🌻",
      gradient: "from-orange-500 to-red-500",
    },
    {
      label: "C1 Level",
      value: c1,
      icon: "🌺",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      label: "Total Words",
      value: total,
      icon: "📚",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      label: "Known",
      value: known,
      icon: "✨",
      gradient: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
        >
          {/* Gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-90`}
          ></div>

          {/* Animated glow effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300`}
          ></div>

          {/* Content */}
          <div className="relative p-5 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-white text-3xl font-bold tracking-tight">
                {stat.value}
              </p>
            </div>

            {/* Icon with animation */}
            <div className="text-4xl opacity-30 group-hover:opacity-100 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              {stat.icon}
            </div>
          </div>

          {/* Bottom decorative line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"></div>
        </div>
      ))}
    </div>
  );
}
