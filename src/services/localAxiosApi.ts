import axios from "axios";

export interface errorResponse {
    status: string;
    message: string[];
}

const localApi = axios.create({
  baseURL: process.env.LOCAL_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

localApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("error", error);
    if (error.response.status === 400) {
      const data = {
        status: "error",
        message: error.response.data.message,
      };

      return data;
    }
    return Promise.reject(error);
  },
);

export default localApi;
