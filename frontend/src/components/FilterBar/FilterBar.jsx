import React from "react";

export default function FilterBar({ level, type, search, onFilterChange }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-xl mb-6 border border-white/20">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
        {/* Filters section */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Level select */}
          <div className="relative flex-1 group">
            <label className="absolute -top-2 left-3 text-xs font-semibold text-white bg-indigo-600 px-2 py-0.5 rounded-full z-10">
              📊 Level
            </label>
            <select
              value={level}
              onChange={(e) => onFilterChange("level", e.target.value)}
              className="w-full px-4 py-3 pt-4 rounded-xl border-2 border-white/30 bg-white/95 text-gray-700 font-medium
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                hover:border-indigo-300 transition-all duration-200 cursor-pointer
                shadow-sm hover:shadow-md"
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
          <div className="relative flex-1 group">
            <label className="absolute -top-2 left-3 text-xs font-semibold text-white bg-purple-600 px-2 py-0.5 rounded-full z-10">
              🏷️ Type
            </label>
            <select
              value={type}
              onChange={(e) => onFilterChange("type", e.target.value)}
              className="w-full px-4 py-3 pt-4 rounded-xl border-2 border-white/30 bg-white/95 text-gray-700 font-medium
                focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                hover:border-purple-300 transition-all duration-200 cursor-pointer
                shadow-sm hover:shadow-md"
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
        <div className="relative flex-1 lg:max-w-md group">
          <label className="absolute -top-2 left-3 text-xs font-semibold text-white bg-pink-600 px-2 py-0.5 rounded-full z-10">
            🔍 Search
          </label>

          {/* Search icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200 mt-1">
            <svg
              className="w-5 h-5"
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
            className="w-full pl-12 pr-4 py-3 pt-4 rounded-xl border-2 border-white/30 bg-white/95 text-gray-700
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent
              hover:border-pink-300 transition-all duration-200
              shadow-sm hover:shadow-md font-medium"
          />

          {/* Clear button */}
          {search && (
            <button
              onClick={() => onFilterChange("search", "")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1
                bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full w-6 h-6 
                flex items-center justify-center transition-all duration-200
                hover:scale-110 active:scale-95"
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Active filters indicator */}
      {(level !== "all" || type !== "all" || search) && (
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="text-white/70 font-medium">Active filters:</span>
          <div className="flex gap-2 flex-wrap">
            {level !== "all" && (
              <span className="bg-indigo-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {level}
              </span>
            )}
            {type !== "all" && (
              <span className="bg-purple-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {type}
              </span>
            )}
            {search && (
              <span className="bg-pink-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
                "{search}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
