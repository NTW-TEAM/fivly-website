import api from "./axios";

export const getMembers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    }
    catch (error) {
        console.log("error", error);
        return error;
    }
};

export { };
