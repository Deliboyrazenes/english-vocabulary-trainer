// src/components/Skeleton/SkeletonAuth.jsx

import "../../styles/animations.css";

export default function SkeletonAuth() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-violet-950 via-fuchsia-950 to-purple-950 p-6">
      {/* Blob Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-6 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-6 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-24 w-72 h-72 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.12)_1px,transparent_0)] bg-[size:40px_40px]"></div>

      {/* Skeleton Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-10 sm:p-12">
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 rounded-2xl skeleton"></div>
          </div>

          {/* Title */}
          <div className="w-48 h-8 skeleton mx-auto mb-3 rounded-xl"></div>
          <div className="w-64 h-4 skeleton mx-auto mb-10 rounded-xl"></div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="w-full h-14 skeleton rounded-2xl"></div>
            <div className="w-full h-14 skeleton rounded-2xl"></div>
            <div className="w-full h-14 skeleton rounded-2xl"></div>
          </div>

          {/* Submit Button */}
          <div className="w-full h-16 mt-10 skeleton rounded-2xl"></div>

          {/* Divider */}
          <div className="flex items-center my-10">
            <div className="flex-1 h-[2px] skeleton rounded-full"></div>
            <span className="px-4"></span>
            <div className="flex-1 h-[2px] skeleton rounded-full"></div>
          </div>

          {/* Footer Text */}
          <div className="w-40 h-4 skeleton mx-auto rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
