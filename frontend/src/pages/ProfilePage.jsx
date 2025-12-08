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
                  background: "rgba(255, 255, 255, 0.25)",
                }}
              />

              <div
                className="w-6 sm:w-8 md:w-10 rounded-t-xl bg-gradient-to-b from-pink-400 to-purple-600 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200"
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

  /* =========== ŞİFRE GÜNCELLE =========== */
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
    <div className="min-h-screen w-full p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/20 border border-white/40 backdrop-blur-md hover:bg-white/30 transition font-semibold text-sm sm:text-base"
        >
          ← Geri Dön
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold drop-shadow-lg">
          Profil
        </h1>

        <button
          onClick={onLogout}
          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg font-semibold text-sm sm:text-base"
        >
          Çıkış Yap 🚪
        </button>
      </div>

      {/* ANA GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
        {/* SOL TARAF */}
        <div className="space-y-6 sm:space-y-8">
          {/* PROFİL BİLGİLERİ */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border border-white/20 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              👤 Kullanıcı Bilgileri
            </h2>

            <label className="text-xs sm:text-sm text-white/70">İsim</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl mt-1 text-black text-sm sm:text-base"
            />

            <button
              onClick={handleUpdateProfile}
              className="mt-4 sm:mt-5 w-full bg-indigo-500 hover:bg-indigo-600 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg text-sm sm:text-base"
            >
              Profili Güncelle
            </button>
          </div>

          {/* ŞİFRE DEĞİŞTİR */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border border-white/20 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              🔐 Şifre Değiştir
            </h2>

            <label className="text-xs sm:text-sm text-white/70">
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
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl mt-1 text-black text-sm sm:text-base"
            />

            <label className="text-xs sm:text-sm text-white/70 mt-3 sm:mt-4 block">
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
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl mt-1 text-black text-sm sm:text-base"
            />

            <button
              onClick={handlePasswordChange}
              className="mt-4 sm:mt-5 w-full bg-purple-500 hover:bg-purple-600 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg text-sm sm:text-base"
            >
              Şifreyi Güncelle
            </button>
          </div>

          {/* DANGER ZONE */}
          <div className="bg-red-500/20 backdrop-blur-lg border border-red-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-red-200 mb-3 sm:mb-4">
              ⚠️ Danger Zone
            </h2>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="mt-3 sm:mt-4 w-full bg-red-600 hover:bg-red-700 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg text-white text-sm sm:text-base"
            >
              Hesabı Kalıcı Olarak Sil ❌
            </button>
          </div>
        </div>

        {/* SAĞ TARAF — İSTATİSTİKLER */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <StatCard label="Bugün Öğrendim" value={stats.today} icon="🔥" />
            <StatCard label="Son 7 Gün" value={stats.last7} icon="📊" />
            <StatCard label="Son 30 Gün" value={stats.last30} icon="📈" />
          </div>

          {/* LEVEL KARTLARI */}
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

          {/* HAFTALIK AKTİVİTE */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border border-white/20 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              🔥 Haftalık Aktivite
            </h2>
            <WeeklyChart data={stats.weeklyActivity} />
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
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:bg-white/20 transition">
      <div className="flex items-center justify-between">
        <span className="text-2xl sm:text-3xl md:text-4xl opacity-80">
          {icon}
        </span>
        <span className="text-2xl sm:text-2xl md:text-3xl font-bold">
          {value}
        </span>
      </div>
      <p className="text-white/60 mt-2 sm:mt-3 font-semibold text-xs sm:text-sm">
        {label}
      </p>
    </div>
  );
}
