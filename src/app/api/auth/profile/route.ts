import api from "@/services/axios";

export async function GET(req: Request) {

    try {
        const response = await api.get(`/auth/profile`);

        const answer = { statusCode: response.status, data: response.data };
        return Response.json(answer);
    }
    catch (error) {
        return Response.json({ statusCode: 500, data: "Internal server error" });
    }
}
