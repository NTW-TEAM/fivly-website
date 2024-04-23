import api from "./axios";

const getMembers = async () => {
    const response = await api.get("/users");
    return response.data;
};

const deleteRoleToMemberService = async (userId: number, roleName: string) => {
    const response = await api.delete(`users/${userId}/role/${roleName}`);
    return response;
};

export { getMembers, deleteRoleToMemberService };
