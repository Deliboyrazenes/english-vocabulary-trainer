import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const VERSION = process.env.REACT_APP_VERSION;

const api = axios.create({
  baseURL: VERSION ? `${API_BASE}?v=${VERSION}` : API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error("Auth error:", error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default api;