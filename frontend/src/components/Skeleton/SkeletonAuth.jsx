// src/components/Skeleton/SkeletonAuth.jsx

import "../../styles/animations.css";

export default function SkeletonAuth() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
      <div className="w-full max-w-xl bg-white/10 rounded-3xl shadow-2xl p-12 backdrop-blur-xl border border-white/20">
        {/* LOGO */}
        <div className="flex justify-center mb-10">
          <div className="w-20 h-20 rounded-2xl skeleton"></div>
        </div>

        {/* TITLE */}
        <div className="w-48 h-8 skeleton mx-auto mb-2 rounded-xl"></div>
        <div className="w-64 h-4 skeleton mx-auto mb-8 rounded-xl"></div>

        {/* FORM FIELDS */}
        <div className="space-y-6">
          <div className="w-full h-12 skeleton rounded-xl"></div>
          <div className="w-full h-12 skeleton rounded-xl"></div>
          <div className="w-full h-12 skeleton rounded-xl"></div>
        </div>

        {/* BUTTON */}
        <div className="w-full h-14 mt-10 skeleton rounded-xl"></div>

        {/* OR DIVIDER */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-[2px] skeleton"></div>
          <span className="mx-4"></span>
          <div className="flex-1 h-[2px] skeleton"></div>
        </div>

        {/* FOOTER TEXT */}
        <div className="w-48 h-4 skeleton mx-auto rounded-xl"></div>
      </div>
    </div>
  );
}
