import React from "react";

export default function FilterBar({ level, type, search, onFilterChange }) {
  return (
    <div
      className="
      bg-white/10 backdrop-blur-md rounded-2xl
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
              text-[10px] sm:text-xs font-semibold text-white
              bg-indigo-600 px-2 py-0.5 rounded-full z-10
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
                bg-white/95 text-gray-700 font-medium text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-indigo-400
                hover:border-indigo-300 transition-all duration-200
                shadow-sm hover:shadow-md
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
              text-[10px] sm:text-xs font-semibold text-white
              bg-purple-600 px-2 py-0.5 rounded-full z-10
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
                bg-white/95 text-gray-700 font-medium text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-purple-400
                hover:border-purple-300 transition-all duration-200
                shadow-sm hover:shadow-md
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
            text-[10px] sm:text-xs font-semibold text-white
            bg-pink-600 px-2 py-0.5 rounded-full z-10
          "
          >
            🔍 Search
          </label>

          {/* Search Icon */}
          <div
            className="
            absolute left-3 sm:left-4
            top-1/2 transform -translate-y-1/2 mt-1
            text-gray-400 group-hover:text-indigo-500
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
              bg-white/95 text-gray-700 placeholder-gray-400
              text-sm sm:text-base font-medium
              focus:outline-none focus:ring-2 focus:ring-pink-400
              hover:border-pink-300 transition-all duration-200
              shadow-sm hover:shadow-md
            "
          />

          {search && (
            <button
              onClick={() => onFilterChange("search", "")}
              className="
                absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 mt-1
                bg-gray-200 hover:bg-gray-300 text-gray-600
                rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center
                transition-all duration-200 hover:scale-110 active:scale-95
                text-xs sm:text-sm
              "
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {(level !== "all" || type !== "all" || search) && (
        <div className="mt-3 flex items-center gap-2 flex-wrap text-xs sm:text-sm">
          <span className="text-white/70 font-medium">Active filters:</span>
          <div className="flex gap-2 flex-wrap">
            {level !== "all" && (
              <span className="bg-indigo-500/80 text-white px-3 py-1 rounded-full font-semibold">
                {level}
              </span>
            )}
            {type !== "all" && (
              <span className="bg-purple-500/80 text-white px-3 py-1 rounded-full font-semibold">
                {type}
              </span>
            )}
            {search && (
              <span className="bg-pink-500/80 text-white px-3 py-1 rounded-full font-semibold">
                "{search}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
