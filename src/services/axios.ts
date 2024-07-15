import axios from "axios";
import {cookies} from "next/headers";

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

const apiFormData = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

apiFormData.interceptors.request.use(
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

apiFormData.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.log("error", error);
        if (error.response.status === 400) {
            return {
                status: "error",
                message: error.response.data.message,
            };
        }
        return Promise.reject(error);
    },
);


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

// create fivly response with status and message
interface FivlyResponse {
    status: string;
    message: string;
}

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.log("error", error);
        if (error.response.status === 400) {
            return {
                status: "error",
                message: error.response.data.message,
            };
        }
        return Promise.reject(error);
    },
);

export default api;
export {apiFormData};
