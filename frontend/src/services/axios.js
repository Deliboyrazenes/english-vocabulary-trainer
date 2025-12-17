import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const VERSION = process.env.REACT_APP_VERSION;


const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }


  if (VERSION) {
    const hasQuery = config.url.includes("?");
    config.url = hasQuery
      ? `${config.url}&v=${VERSION}`
      : `${config.url}?v=${VERSION}`;
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
