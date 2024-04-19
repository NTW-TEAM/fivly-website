import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("auth_token");
      window.location.href = "/auth/siginin";
    }
    return Promise.reject(error);
  },
);

export default api;
