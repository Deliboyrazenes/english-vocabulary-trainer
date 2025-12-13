import React from "react";

export default function StatsBar({ total, a1, a2, b1, b2, c1, known }) {
  const stats = [
    {
      label: "A1 Level",
      value: a1,
      icon: "🌱",
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "from-blue-400/20 to-cyan-400/20",
      glowColor: "blue-400",
    },
    {
      label: "A2 Level",
      value: a2,
      icon: "🌿",
      gradient: "from-green-500 to-emerald-500",
      iconBg: "from-green-400/20 to-emerald-400/20",
      glowColor: "green-400",
    },
    {
      label: "B1 Level",
      value: b1,
      icon: "🌾",
      gradient: "from-yellow-400 to-orange-500",
      iconBg: "from-yellow-300/20 to-orange-400/20",
      glowColor: "yellow-400",
    },
    {
      label: "B2 Level",
      value: b2,
      icon: "🌻",
      gradient: "from-orange-500 to-red-500",
      iconBg: "from-orange-400/20 to-red-400/20",
      glowColor: "orange-400",
    },
    {
      label: "C1 Level",
      value: c1,
      icon: "🌺",
      gradient: "from-pink-500 to-rose-500",
      iconBg: "from-pink-400/20 to-rose-400/20",
      glowColor: "pink-400",
    },
    {
      label: "Total Words",
      value: total,
      icon: "📚",
      gradient: "from-purple-500 to-fuchsia-500",
      iconBg: "from-purple-400/20 to-fuchsia-400/20",
      glowColor: "purple-400",
    },
    {
      label: "Known",
      value: known,
      icon: "✨",
      gradient: "from-emerald-500 to-green-500",
      iconBg: "from-emerald-400/20 to-green-400/20",
      glowColor: "emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="group relative">
          {/* Glow effect - HomePage stilinde */}
          <div
            className={`absolute -inset-0.5 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300`}
          ></div>

          {/* Main card */}
          <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-5 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl overflow-hidden">
            {/* Background pattern */}
            <div
              className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.iconBg} rounded-full blur-2xl`}
            ></div>

            {/* Top gradient line */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}
            ></div>

            {/* Content */}
            <div className="relative">
              {/* Icon */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                >
                  <span className="text-xl sm:text-2xl">{stat.icon}</span>
                </div>
              </div>

              {/* Value */}
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1 drop-shadow-lg">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-xs sm:text-sm text-white/70 font-bold">
                {stat.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
