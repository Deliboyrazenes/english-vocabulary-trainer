import "../../styles/animations.css";

export default function SkeletonWordList() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="max-w-[1800px] mx-auto">
        {/* HEADER */}
        <div className="bg-white/10 p-5 rounded-3xl border border-white/20 shadow-xl backdrop-blur-md skeleton h-[100px] mb-6"></div>

        {/* FILTER */}
        <div className="bg-white/10 p-4 rounded-3xl border border-white/20 skeleton h-[70px] mb-6"></div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl skeleton h-[100px]"
            ></div>
          ))}
        </div>

        {/* WORD GRID */}
        <div className="bg-white/10 p-8 rounded-3xl border border-white/20 shadow-xl backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="w-[270px] h-[210px] rounded-2xl bg-white/10 border border-white/20 skeleton"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
