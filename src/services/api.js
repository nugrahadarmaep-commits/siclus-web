import axios from "axios";

// ==============================================================================
// KONFIGURASI INSTANCE API CLIENT (AXIOS)
// ==============================================================================
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://siclus-api.vercel.app/api";
const BASE_URL = String(rawBaseUrl).trim().replace(/\/+$/, "");

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Timeout 30 detik untuk menangani cold-start backend Vercel free tier
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================================================================
// INTERCEPTOR: PENYEMATAN TOKEN JWT PADA REQUEST
// ==============================================================================
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("siclus_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ==============================================================================
// INTERCEPTOR: PENANGANAN RESPON, ERROR TIMEOUT/OFFLINE & AUTO-LOGOUT 401
// ==============================================================================
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1. Tangani Auto-Logout jika Token Expired / Akun Terhapus (401)
    if (error.response && error.response.status === 401 && !error.config?.url?.includes("/auth/login")) {
      const errorDetail = error.response?.data?.detail;
      const msg = typeof errorDetail === "string" ? errorDetail : "Sesi Anda telah berakhir atau akun telah dihapus dari sistem.";
      sessionStorage.setItem("siclus_logout_reason", msg);
      localStorage.removeItem("siclus_token");
      localStorage.removeItem("siclus_user");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // 2. Normalisasi pesan error ramah pengguna (Network Error / Timeout / 504 Vercel Free Tier)
    if (!error.response) {
      const isTimeout = error.code === "ECONNABORTED" || error.message?.includes("timeout");
      const friendlyMsg = isTimeout
        ? "Koneksi ke server timeout (melebihi 30 detik). Server sedang memulai atau koneksi internet lambat. Silakan coba lagi."
        : "Gagal terhubung ke server backend. Periksa koneksi internet Anda atau pastikan server backend aktif.";

      error.response = {
        data: { detail: friendlyMsg },
        status: isTimeout ? 408 : 0,
      };
      error.message = friendlyMsg;
    } else if (error.response.status === 504) {
      const gatewayMsg = "Server backend (Vercel) timeout saat memproses request (504). Silakan coba beberapa saat lagi.";
      if (!error.response.data || typeof error.response.data !== "object") {
        error.response.data = { detail: gatewayMsg };
      }
      error.message = gatewayMsg;
    }

    return Promise.reject(error);
  },
);

// ==============================================================================
// SERVICE: API INTEGRASI SICLUS
// ==============================================================================
export const apiService = {
  login: async (email, password) => {
    const payload = {
      email: email,
      password: password,
    };
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
  },

  // ==============================================================================
  // MODUL: PENGEMUDI (DRIVER) - PROFIL, PENUGASAN & RIWAYAT
  // ==============================================================================
  getPenugasanHariIni: async () => {
    const response = await apiClient.get("/driver/penugasan/hari-ini");
    return response.data;
  },
  getProfilDriver: async () => {
    const response = await apiClient.get("/driver/profil");
    return response.data;
  },
  getJadwalDriver: async () => {
    const response = await apiClient.get("/driver/jadwal");
    return response.data;
  },
  getRiwayatDriver: async () => {
    const response = await apiClient.get("/driver/riwayat");
    return response.data;
  },
  updateFotoProfil: async (fileBlob) => {
    const formData = new FormData();
    formData.append("foto", fileBlob, "profile.jpg");
    const response = await apiClient.put("/driver/profil/foto", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // ==============================================================================
  // MODUL: PENGEMUDI (DRIVER) - ALUR LAPORAN OPERASIONAL & CHECKPOINTS
  // ==============================================================================
  getLaporanHariIni: async (params) => {
    const response = await apiClient.get("/laporan/hari-ini", { params });
    return response.data;
  },
  mulaiLaporan: async (data) => {
    const response = await apiClient.post("/laporan/mulai", data);
    return response.data;
  },
  submitInspeksi: async (laporanId, data) => {
    const response = await apiClient.post(`/laporan/inspeksi?laporan_id=${laporanId}`, data);
    return response.data;
  },
  uploadSelfie: async (fileBlob) => {
    const formData = new FormData();
    formData.append("foto", fileBlob, "selfie.jpg");
    const response = await apiClient.post("/laporan/upload-selfie", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  submitCP1: async (laporanId, data) => {
    const response = await apiClient.post(`/laporan/sesi/cp1?laporan_id=${laporanId}`, data);
    return response.data;
  },
  submitCP2: async (sesiId, data) => {
    const response = await apiClient.put(`/laporan/sesi/cp2/${sesiId}`, data);
    return response.data;
  },
  submitCP3: async (sesiId, data) => {
    const response = await apiClient.put(`/laporan/sesi/cp3/${sesiId}`, data);
    return response.data;
  },

  // ==============================================================================
  // MODUL: ADMINISTRATOR - PENUGASAN & JADWAL OPERASIONAL
  // ==============================================================================
  createPenugasanHarian: async (data) => {
    const response = await apiClient.post("/admin/penugasan", data);
    return response.data;
  },
  updatePenugasanHarian: async (id, data) => {
    const response = await apiClient.put(`/admin/penugasan/${id}`, data);
    return response.data;
  },
  deletePenugasanHarian: async (id) => {
    const response = await apiClient.delete(`/admin/penugasan/${id}`);
    return response.data;
  },
  batalkanOperasionalPenugasan: async (id) => {
    const response = await apiClient.post(`/admin/penugasan/${id}/batal`);
    return response.data;
  },
  getSemuaPenugasan: async () => {
    const response = await apiClient.get("/admin/penugasan");
    return response.data;
  },

  // ==============================================================================
  // MODUL: ADMINISTRATOR - DASHBOARD, REKAPITULASI & MANAJEMEN USER
  // ==============================================================================
  getDashboardAdmin: async () => (await apiClient.get("/admin/dashboard")).data,
  getRekapAdmin: async () => (await apiClient.get("/admin/rekap")).data,
  getOperasionalHariIniAdmin: async () => (await apiClient.get("/admin/operasional-hari-ini")).data,
  getUsersAdmin: async () => (await apiClient.get("/admin/users")).data,
  createUserAdmin: async (data) => (await apiClient.post("/admin/users", data)).data,
  updateUserAdmin: async (id, data) => (await apiClient.put(`/admin/users/${id}`, data)).data,
  deleteUserAdmin: async (id, payload) => {
    if (payload && payload.password_admin) {
      return (await apiClient.post(`/admin/users/${id}/hapus`, payload)).data;
    }
    return (await apiClient.delete(`/admin/users/${id}`)).data;
  },
  updateFotoProfilAdmin: async (fileBlob) => {
    const formData = new FormData();
    formData.append("foto", fileBlob, "profile_admin.jpg");
    const response = await apiClient.put("/admin/profil/foto", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  getStafAdmin: async () => (await apiClient.get("/admin/staf")).data,
  createStafAdmin: async (data) => (await apiClient.post("/admin/staf", data)).data,
  updateStafAdmin: async (id, data) => (await apiClient.put(`/admin/staf/${id}`, data)).data,
  deleteStafAdmin: async (id, payload) => {
    if (payload && payload.password_admin) {
      return (await apiClient.post(`/admin/staf/${id}/hapus`, payload)).data;
    }
    return (await apiClient.delete(`/admin/staf/${id}`)).data;
  },
};

export default apiClient;
