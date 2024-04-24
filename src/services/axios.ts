import axios from "axios";
import { cookies } from "next/headers";

export interface errorResponse {
    status: string;
    message: string[];
}

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  function (config) {
    const token = cookies().get("auth_token")?.value;
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
  function (response) {
    return response;
  },
  function (error) {
      console.log("error", error);
    if (error.response.status === 400) {
      const data  = {
          status: "error",
          message: error.response.data.message,
      }
      
      return data;
    }
    return Promise.reject(error);
  },
);

export default api;
