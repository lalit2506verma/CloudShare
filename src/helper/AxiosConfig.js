import axios from "axios";

export const BASE_URL = "http://localhost:8080";

export const myAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": 'application/json',
  },
});

// Request interceptor - automatically add token in all request
myAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 (unauthorized) error globally
myAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == 401) {
      // Token expired or invalid - clear auth and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }

    return Promise.reject(error);
  }
);

