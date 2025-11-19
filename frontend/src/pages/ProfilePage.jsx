import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8080";

/* ======================= WEEKLY CHART COMPONENT ======================= */

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
    <div className="flex gap-6 h-56 items-end justify-between px-4">
      {days.map((day) => {
        const count = data?.[day] || 0;
        const height = Math.min(count * 18, 140);

        return (
          <div key={day} className="flex flex-col items-center flex-1 group">
            <div className="w-full relative flex items-end justify-center h-full">
              <div
                className="absolute bottom-0 w-10 rounded-t-xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-300"
                style={{
                  height: `${height}px`,
                  background: "rgba(255, 255, 255, 0.25)",
                }}
              />

              <div
                className="w-10 rounded-t-xl bg-gradient-to-b from-pink-400 to-purple-600 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200"
                style={{ height: `${height}px` }}
              ></div>

              <div className="absolute -top-10 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {count} kelime
              </div>
            </div>

            <span className="mt-3 text-white/80 font-medium text-xs tracking-wide">
              {day.slice(0, 3)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* =========================== MAIN PAGE ================================ */

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

  /* =========== ŞİFRE DOĞRULAMALI HESAP SİLME MODAL STATE =========== */
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  /* =========== BACKEND İSTATİSTİKLERİ YÜKLE =========== */
  useEffect(() => {
    axios
      .get(`${API_BASE}/known-words/stats?userId=${user.id}`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, [user.id]);

  /* =========== PROFİL GÜNCELLE =========== */
  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(`${API_BASE}/users/update-profile`, {
        userId: user.id,
        name: newName,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profil güncellendi ✔");
    } catch (err) {
      alert("Hata: " + err.response?.data);
    }
  };

  /* =========== ŞİFRE GÜNCELLE =========== */
  const handlePasswordChange = async () => {
    try {
      await axios.put(`${API_BASE}/users/change-password`, {
        userId: user.id,
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      alert("Şifre başarıyla değiştirildi ✔");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert("Hata: " + (err.response?.data || "Bilinmeyen hata"));
    }
  };

  /* =========== HESAP SİLME (ŞİFRE DOĞRULAMA) =========== */
  const handleConfirmDelete = async () => {
    if (!deletePassword) {
      // Animasyonu resetle
      setDeleteError("");
      setTimeout(() => setDeleteError("Lütfen şifrenizi girin."), 10);
      return;
    }

    try {
      await axios.delete(`${API_BASE}/users/delete`, {
        data: {
          userId: user.id,
          password: deletePassword,
        },
      });

      onLogout();
    } catch (err) {
      // shake animasyonunu tetiklemek için reset + tekrar set
      setDeleteError("");

      setTimeout(() => {
        const raw = err.response?.data;
        setDeleteError(
          typeof raw === "string" ? raw : raw?.message || "Hatalı şifre."
        );
      }, 10);
    }
  };

  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-white/20 border border-white/40 backdrop-blur-md hover:bg-white/30 transition font-semibold"
        >
          ← Geri Dön
        </button>

        <h1 className="text-3xl font-bold drop-shadow-lg">Profil</h1>

        <button
          onClick={onLogout}
          className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg font-semibold"
        >
          Çıkış Yap 🚪
        </button>
      </div>

      {/* ANA GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* SOL TARAF — Profil Ayarları */}
        <div className="space-y-8">
          {/* PROFİL BİLGİLERİ */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-bold mb-4">👤 Kullanıcı Bilgileri</h2>

            <label className="text-sm text-white/70">İsim</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl mt-1 text-black"
              placeholder="Adınızı girin..."
            />

            <button
              onClick={handleUpdateProfile}
              className="mt-5 w-full bg-indigo-500 hover:bg-indigo-600 py-3 rounded-xl font-semibold shadow-lg"
            >
              Profili Güncelle
            </button>
          </div>

          {/* ŞİFRE DEĞİŞTİR */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-bold mb-4">🔐 Şifre Değiştir</h2>

            <label className="text-sm text-white/70">Eski Şifre</label>
            <input
              type="password"
              value={passwordData.oldPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  oldPassword: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl mt-1 text-black"
              placeholder="••••••••"
            />

            <label className="text-sm text-white/70 mt-4 block">
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
              className="w-full px-4 py-3 rounded-xl mt-1 text-black"
              placeholder="••••••••"
            />

            <button
              onClick={handlePasswordChange}
              className="mt-5 w-full bg-purple-500 hover:bg-purple-600 py-3 rounded-xl font-semibold shadow-lg"
            >
              Şifreyi Güncelle
            </button>
          </div>

          {/* DANGER ZONE */}
          <div className="bg-red-500/20 backdrop-blur-lg border border-red-500/40 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-red-200 mb-4">
              ⚠️ Danger Zone
            </h2>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold shadow-lg text-white"
            >
              Hesabı Kalıcı Olarak Sil ❌
            </button>
          </div>
        </div>

        {/* SAĞ TARAF — İstatistikler */}
        <div className="xl:col-span-2 space-y-8">
          {/* SON İSTATİSTİKLER */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Bugün Öğrendim" value={stats.today} icon="🔥" />
            <StatCard label="Son 7 Gün" value={stats.last7} icon="📊" />
            <StatCard label="Son 30 Gün" value={stats.last30} icon="📈" />
          </div>

          {/* LEVEL KARTLARI */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-bold mb-4">🔥 Haftalık Aktivite</h2>

            <WeeklyChart data={stats.weeklyActivity} />
          </div>
        </div>
      </div>

      {/* ================= DELETE ACCOUNT MODAL ================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className={`bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl text-gray-800 relative 
    animate-[fadeIn_0.25s_ease]
    ${deleteError ? "animate-shake" : ""}
  `}
          >
            {/* Kapatma */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => {
                setShowDeleteModal(false);
                setDeletePassword("");
                setDeleteConfirmText("");
                setDeleteError("");
              }}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4 text-red-600">Hesabı Sil</h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Hesabınızı kalıcı olarak silmek üzeresiniz. Bu işlem tüm
              verilerinizi geri dönülmez şekilde silecektir.
            </p>

            {/* Şifre */}
            <label className="text-sm font-semibold text-gray-700">Şifre</label>
            <input
              type="password"
              placeholder="Şifrenizi girin..."
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none"
            />

            {/* HESABIMI SİL doğrulaması */}
            <label className="text-sm font-semibold text-gray-700">
              Onay metnini yazın:{" "}
              <span className="font-bold">HESABIMI SİL</span>
            </label>

            <input
              type="text"
              placeholder="HESABIMI SİL"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none uppercase"
            />

            {/* Hata */}
            {deleteError && (
              <p className="text-red-600 text-sm mb-3">{deleteError}</p>
            )}

            {/* Silme butonu */}
            <button
              onClick={handleConfirmDelete}
              disabled={deleteConfirmText !== "HESABIMI SİL"}
              className={`w-full py-3 mt-2 rounded-xl font-semibold shadow-lg text-white transition-all
          ${
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

/* ======================== SMALL CARD COMPONENT ======================== */

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-lg hover:bg-white/20 transition">
      <div className="flex items-center justify-between">
        <span className="text-4xl opacity-80">{icon}</span>
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <p className="text-white/60 mt-3 font-semibold">{label}</p>
    </div>
  );
}
