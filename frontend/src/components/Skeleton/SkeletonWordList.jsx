import "../../styles/animations.css";

export default function SkeletonWordList() {
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

      <div className="relative z-10 p-4 md:p-6 text-white">
        <div className="max-w-[1800px] mx-auto">
          {/* MODERN HEADER SKELETON */}
          <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5 mb-6 sm:mb-8 bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl">
            {/* Logo & Welcome Skeleton */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-xl sm:rounded-2xl skeleton"></div>

              <div className="space-y-2">
                <div className="w-32 sm:w-40 h-6 sm:h-7 bg-white/10 rounded-lg skeleton"></div>
                <div className="w-24 sm:w-32 h-4 bg-white/10 rounded skeleton"></div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-20 sm:w-28 h-9 sm:h-10 bg-white/10 rounded-xl skeleton"></div>
              <div className="w-16 sm:w-24 h-9 sm:h-10 bg-white/10 rounded-xl skeleton"></div>
              <div className="w-16 sm:w-24 h-9 sm:h-10 bg-red-500/20 rounded-xl skeleton"></div>
            </div>
          </nav>

          {/* FILTER SKELETON */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-xl mb-4 sm:mb-6 border border-white/20">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-4">
              <div className="flex-1 h-12 sm:h-14 bg-white/10 rounded-xl skeleton"></div>
              <div className="flex-1 h-12 sm:h-14 bg-white/10 rounded-xl skeleton"></div>
              <div className="flex-1 h-12 sm:h-14 bg-white/10 rounded-xl skeleton"></div>
            </div>
          </div>

          {/* STATS SKELETON */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="relative">
                <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-5 shadow-lg">
                  {/* Icon skeleton */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl mb-3 skeleton"></div>

                  {/* Value skeleton */}
                  <div className="w-16 h-8 sm:h-10 bg-white/10 rounded-lg mb-1 skeleton"></div>

                  {/* Label skeleton */}
                  <div className="w-20 h-4 bg-white/10 rounded skeleton"></div>

                  {/* Bottom line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-2xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* CONTROLS SKELETON */}
          <div className="flex justify-center mb-6 sm:mb-8 gap-2 sm:gap-3 md:gap-4 flex-wrap px-2 sm:px-4">
            {/* Tab group */}
            <div className="bg-white/5 backdrop-blur-md p-2 rounded-2xl inline-flex border border-white/20 shadow-xl gap-1">
              <div className="w-32 sm:w-40 h-10 sm:h-12 bg-white/10 rounded-xl skeleton"></div>
              <div className="w-32 sm:w-40 h-10 sm:h-12 bg-white/10 rounded-xl skeleton"></div>
            </div>

            {/* Mode group */}
            <div className="bg-white/5 backdrop-blur-md p-2 rounded-2xl inline-flex border border-white/20 shadow-xl gap-1">
              <div className="w-28 sm:w-32 h-10 sm:h-12 bg-white/10 rounded-xl skeleton"></div>
              <div className="w-28 sm:w-32 h-10 sm:h-12 bg-white/10 rounded-xl skeleton"></div>
            </div>

            {/* Other buttons */}
            <div className="w-28 sm:w-32 h-10 sm:h-12 bg-white/10 rounded-xl skeleton"></div>
            <div className="w-32 sm:w-40 h-10 sm:h-12 bg-white/10 rounded-xl skeleton"></div>
          </div>

          {/* WORD GRID SKELETON */}
          <div className="flex justify-center">
            <div className="bg-white/5 backdrop-blur-md p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                    {/* Card */}
                    <div className="relative w-[230px] sm:w-[250px] md:w-[260px] lg:w-[270px] h-[180px] sm:h-[190px] md:h-[200px] lg:h-[210px] rounded-2xl bg-white/10 border border-white/20 p-4 sm:p-5 skeleton backdrop-blur-sm">
                      {/* Top line */}
                      <div className="h-1.5 bg-white/20 rounded-full mb-4"></div>

                      {/* Word text */}
                      <div className="w-3/4 h-8 sm:h-10 bg-white/15 rounded-lg mx-auto mb-4 skeleton"></div>

                      {/* Type and level */}
                      <div className="flex justify-between items-center">
                        <div className="w-16 h-4 bg-white/15 rounded skeleton"></div>
                        <div className="w-10 h-5 bg-white/15 rounded-full skeleton"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .skeleton {
          animation: shimmer 2s infinite;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.05) 100%
          );
          background-size: 1000px 100%;
        }
      `}</style>
    </div>
  );
}
