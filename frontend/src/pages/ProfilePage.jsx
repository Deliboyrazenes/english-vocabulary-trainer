import React, { useEffect, useState } from "react";
import api from "../services/axios";

function WeeklyChart({ data }) {
  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  return (
    <div className="flex gap-2 sm:gap-4 md:gap-6 h-40 sm:h-48 md:h-56 items-end justify-between px-2 sm:px-4">
      {days.map((day) => {
        const count = data?.[day] || 0;
        const height = Math.min(count * 18, 140);

        return (
          <div key={day} className="flex flex-col items-center flex-1 group">
            <div className="w-full relative flex items-end justify-center h-full">
              <div
                className="absolute bottom-0 w-6 sm:w-8 md:w-10 rounded-t-xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-300"
                style={{
                  height: `${height}px`,
                  background: "rgba(252, 211, 77, 0.5)",
                }}
              />

              <div
                className="w-6 sm:w-8 md:w-10 rounded-t-xl bg-gradient-to-b from-yellow-400 to-orange-500 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200"
                style={{ height: `${height}px` }}
              ></div>

              <div className="absolute -top-8 sm:-top-10 bg-black/70 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {count} kelime
              </div>
            </div>

            <span className="mt-2 sm:mt-3 text-white/80 font-medium text-[10px] sm:text-xs tracking-wide">
              {day.slice(0, 3)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function ProfilePage({ user, onBack, onLogout }) {
  const [stats, setStats] = useState({
    total: 0,
    known: 0,
    levels: {},
    types: {},
    weeklyActivity: {},
  });

  const [newName, setNewName] = useState(user.name || "");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    api
      .get("/known-words/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await api.put("/users/update-profile", {
        name: newName,
      });

      const updated = { ...user, name: newName };
      localStorage.setItem("user", JSON.stringify(updated));

      alert("Profil güncellendi ✔");
    } catch (err) {
      alert("Hata: " + (err.response?.data || "Sunucu hatası"));
    }
  };

  const handlePasswordChange = async () => {
    try {
      await api.put("/users/change-password", {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      alert("Şifre başarıyla değiştirildi ✔");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert("Hata: " + (err.response?.data || "Bilinmeyen hata"));
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletePassword) {
      setDeleteError("Lütfen şifrenizi girin.");
      return;
    }

    try {
      await api.delete("/users/delete", {
        data: { password: deletePassword },
      });

      onLogout();
    } catch (err) {
      const raw = err.response?.data;
      setDeleteError(
        typeof raw === "string" ? raw : raw?.message || "Hatalı şifre."
      );
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-violet-950 via-fuchsia-950 to-purple-950">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.15)_1px,transparent_0)] bg-[size:40px_40px]"></div>

      <div className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all hover:scale-105 font-semibold text-sm sm:text-base text-white"
          >
            ← Geri Dön
          </button>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-xl rotate-12 hover:rotate-0 transition-transform cursor-pointer">
              👤
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              Profil
            </span>
          </div>

          <button
            onClick={onLogout}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-red-500/90 backdrop-blur-md border-2 border-red-400/30 hover:bg-red-600 hover:border-red-400/50 shadow-lg font-semibold text-sm sm:text-base text-white transition-all hover:scale-105"
          >
            Çıkış Yap 🚪
          </button>
        </div>

        {/* ANA GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {/* SOL TARAF */}
          <div className="space-y-6 sm:space-y-8">
            {/* PROFİL BİLGİLERİ */}
            <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:bg-white/10 hover:border-white/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  👤
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Kullanıcı Bilgileri
                </h2>
              </div>

              <label className="text-xs sm:text-sm text-white/70 font-semibold">
                İsim
              </label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl mt-1 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/40 transition-all text-sm sm:text-base"
              />

              <button
                onClick={handleUpdateProfile}
                className="mt-4 sm:mt-5 w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all text-white text-sm sm:text-base"
              >
                Profili Güncelle
              </button>
            </div>

            {/* ŞİFRE DEĞİŞTİR */}
            <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:bg-white/10 hover:border-white/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  🔐
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Şifre Değiştir
                </h2>
              </div>

              <label className="text-xs sm:text-sm text-white/70 font-semibold">
                Eski Şifre
              </label>
              <input
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl mt-1 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/40 transition-all text-sm sm:text-base"
              />

              <label className="text-xs sm:text-sm text-white/70 mt-3 sm:mt-4 block font-semibold">
                Yeni Şifre
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl mt-1 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/40 transition-all text-sm sm:text-base"
              />

              <button
                onClick={handlePasswordChange}
                className="mt-4 sm:mt-5 w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all text-black text-sm sm:text-base"
              >
                Şifreyi Güncelle
              </button>
            </div>

            {/* DANGER ZONE */}
            <div className="group bg-red-500/10 backdrop-blur-md border-2 border-red-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:bg-red-500/20 hover:border-red-500/50 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  ⚠️
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-red-200">
                  Danger Zone
                </h2>
              </div>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="mt-3 sm:mt-4 w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg text-white text-sm sm:text-base hover:scale-105 transition-all"
              >
                Hesabı Kalıcı Olarak Sil ❌
              </button>
            </div>
          </div>

          {/* SAĞ TARAF — İSTATİSTİKLER */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <StatCard
                label="Bugün Öğrendim"
                value={stats.today}
                icon="🔥"
                gradient="from-orange-500 to-red-500"
              />
              <StatCard
                label="Son 7 Gün"
                value={stats.last7}
                icon="📊"
                gradient="from-blue-500 to-cyan-500"
              />
              <StatCard
                label="Son 30 Gün"
                value={stats.last30}
                icon="📈"
                gradient="from-green-500 to-emerald-500"
              />
            </div>

            {/* LEVEL KARTLARI */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg">
                  📚
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Kelime İstatistikleri
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                <StatCard label="Toplam Kelime" value={stats.total} icon="📚" />
                <StatCard label="Bildiğim" value={stats.known} icon="✨" />
                <StatCard
                  label="A1 Seviyesi"
                  value={stats.levels.A1 || 0}
                  icon="🧩"
                />
                <StatCard
                  label="A2 Seviyesi"
                  value={stats.levels.A2 || 0}
                  icon="🎯"
                />
                <StatCard
                  label="B1 Seviyesi"
                  value={stats.levels.B1 || 0}
                  icon="🚀"
                />
                <StatCard
                  label="B2 Seviyesi"
                  value={stats.levels.B2 || 0}
                  icon="🌟"
                />
                <StatCard
                  label="C1 Seviyesi"
                  value={stats.levels.C1 || 0}
                  icon="👑"
                />
              </div>
            </div>

            {/* HAFTALIK AKTİVİTE */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg">
                  🔥
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Haftalık Aktivite
                </h2>
              </div>
              <WeeklyChart data={stats.weeklyActivity} />
            </div>
          </div>
        </div>
      </div>

      {/* DELETE ACCOUNT MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className={`bg-white w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl text-gray-800 relative ${
              deleteError ? "animate-shake" : ""
            }`}
          >
            <button
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-500 hover:text-gray-800 text-lg sm:text-xl"
              onClick={() => {
                setShowDeleteModal(false);
                setDeletePassword("");
                setDeleteConfirmText("");
                setDeleteError("");
              }}
            >
              ✖
            </button>

            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-red-600">
              Hesabı Sil
            </h2>

            <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
              Bu işlem kalıcıdır. Tüm verileriniz silinecek.
            </p>

            <label className="text-xs sm:text-sm font-semibold text-gray-700">
              Şifre
            </label>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 mb-3 sm:mb-4 rounded-xl border border-gray-300 text-sm sm:text-base"
            />

            <label className="text-xs sm:text-sm font-semibold text-gray-700">
              Onay metnini yazın: <b>HESABIMI SİL</b>
            </label>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 mb-3 sm:mb-4 rounded-xl border border-gray-300 uppercase text-sm sm:text-base"
            />

            {deleteError && (
              <p className="text-red-600 text-xs sm:text-sm mb-2 sm:mb-3">
                {deleteError}
              </p>
            )}

            <button
              onClick={handleConfirmDelete}
              disabled={deleteConfirmText !== "HESABIMI SİL"}
              className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg text-white text-sm sm:text-base ${
                deleteConfirmText === "HESABIMI SİL"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-red-400 cursor-not-allowed"
              }`}
            >
              Hesabı Kalıcı Olarak Sil ❌
            </button>
          </div>
        </div>
      )}

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
      `}</style>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  gradient = "from-purple-500 to-fuchsia-500",
}) {
  return (
    <div className="group bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all">
      <div className="flex items-center justify-between">
        <span
          className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg group-hover:scale-110 transition-transform`}
        >
          {icon}
        </span>
        <span className="text-2xl sm:text-2xl md:text-3xl font-bold text-white">
          {value}
        </span>
      </div>
      <p className="text-white/60 mt-2 sm:mt-3 font-semibold text-xs sm:text-sm">
        {label}
      </p>
    </div>
  );
}
