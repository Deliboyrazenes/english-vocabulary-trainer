import React from "react";

export default function FilterBar({ level, type, search, onFilterChange }) {
  return (
    <div
      className="
      bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl
      p-4 sm:p-5 md:p-6
      shadow-xl mb-4 sm:mb-6
      border border-white/20
    "
    >
      <div
        className="
        flex flex-col lg:flex-row
        items-stretch lg:items-center
        gap-3 sm:gap-4
      "
      >
        {/* Filters group */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1 min-w-0">
          {/* Level select */}
          <div className="relative flex-1 min-w-[130px]">
            <label
              className="
              absolute -top-2 left-3
              text-[10px] sm:text-xs font-black text-white
              bg-gradient-to-r from-purple-500 to-fuchsia-500 px-2.5 py-0.5 rounded-full z-10
              shadow-lg
            "
            >
              📊 Level
            </label>

            <select
              value={level}
              onChange={(e) => onFilterChange("level", e.target.value)}
              className="
                w-full px-3 sm:px-4 py-2.5 sm:py-3 pt-4
                rounded-xl border-2 border-white/30
                bg-white/95 backdrop-blur-sm text-gray-800 font-bold text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400
                hover:border-purple-300 transition-all duration-200
                shadow-md hover:shadow-xl
                hover:scale-[1.02]
              "
            >
              <option value="all">All Levels</option>
              <option value="A1">🌱 A1 - Beginner</option>
              <option value="A2">🌿 A2 - Elementary</option>
              <option value="B1">🌳 B1 - Intermediate</option>
              <option value="B2">🎯 B2 - Upper Int.</option>
              <option value="C1">🏆 C1 - Advanced</option>
            </select>
          </div>

          {/* Type select */}
          <div className="relative flex-1 min-w-[130px]">
            <label
              className="
              absolute -top-2 left-3
              text-[10px] sm:text-xs font-black text-white
              bg-gradient-to-r from-yellow-400 to-orange-500 px-2.5 py-0.5 rounded-full z-10
              shadow-lg
            "
            >
              🏷️ Type
            </label>

            <select
              value={type}
              onChange={(e) => onFilterChange("type", e.target.value)}
              className="
                w-full px-3 sm:px-4 py-2.5 sm:py-3 pt-4
                rounded-xl border-2 border-white/30
                bg-white/95 backdrop-blur-sm text-gray-800 font-bold text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
                hover:border-orange-300 transition-all duration-200
                shadow-md hover:shadow-xl
                hover:scale-[1.02]
              "
            >
              <option value="all">All Types</option>
              <option value="noun">📦 Noun</option>
              <option value="verb">⚡ Verb</option>
              <option value="adj">🎨 Adjective</option>
              <option value="adv">🚀 Adverb</option>
            </select>
          </div>
        </div>

        {/* Search section */}
        <div className="relative flex-1 lg:max-w-md min-w-[160px]">
          <label
            className="
            absolute -top-2 left-3
            text-[10px] sm:text-xs font-black text-white
            bg-gradient-to-r from-pink-500 to-rose-500 px-2.5 py-0.5 rounded-full z-10
            shadow-lg
          "
          >
            🔍 Search
          </label>

          {/* Search Icon */}
          <div
            className="
            absolute left-3 sm:left-4
            top-1/2 transform -translate-y-1/2 mt-1
            text-gray-400 group-hover:text-pink-500
            transition-colors duration-200
          "
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Type to search..."
            value={search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="
              w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 pt-4
              rounded-xl border-2 border-white/30 
              bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-400
              text-sm sm:text-base font-bold
              focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400
              hover:border-pink-300 transition-all duration-200
              shadow-md hover:shadow-xl
              hover:scale-[1.02]
            "
          />

          {search && (
            <button
              onClick={() => onFilterChange("search", "")}
              className="
                absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 mt-1
                bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 
                text-gray-700
                rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center
                transition-all duration-200 hover:scale-110 active:scale-95
                text-sm sm:text-base font-bold
                shadow-md
              "
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Active Filters - Modern badges */}
      {(level !== "all" || type !== "all" || search) && (
        <div className="mt-4 flex items-center gap-2 flex-wrap text-xs sm:text-sm">
          <span className="text-white/80 font-bold">Active filters:</span>
          <div className="flex gap-2 flex-wrap">
            {level !== "all" && (
              <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white px-3 py-1.5 rounded-full font-black shadow-lg">
                {level}
              </span>
            )}
            {type !== "all" && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full font-black shadow-lg">
                {type}
              </span>
            )}
            {search && (
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full font-black shadow-lg">
                "{search}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
