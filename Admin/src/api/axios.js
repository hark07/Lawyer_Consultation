import axios from "axios";

const API = axios.create({
  baseURL: "https://lawyer-consultation-o63e.onrender.com/api",
});

// Image Base URL

export const IMAGE_URL = "https://lawyer-consultation-o63e.onrender.com";

// JWT Token

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default API;
