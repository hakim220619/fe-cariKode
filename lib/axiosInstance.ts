// /lib/axiosInstance.ts

import axios from "axios";

// Create an Axios instance with a default base URL
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Fetch from .env file
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Optionally you can set interceptors here to handle requests and responses globally
axiosInstance.interceptors.request.use((config) => {
  // Example: add authorization token to headers globally
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
