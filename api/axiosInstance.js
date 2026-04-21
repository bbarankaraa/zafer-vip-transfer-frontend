import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://zafer-vip-transfer.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Her istekte token'ı ekle
axiosInstance.interceptors.request.use((config) => {
  // localStorage sadece client-side'da çalışır
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 401 gelirse login'e yönlendir
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
      document.cookie = "admin_token=; path=/; max-age=0";
      window.location.href = "/admin-login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;