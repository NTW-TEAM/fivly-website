import api from "@/services/axios";

export async function PATCH(req: Request, {params}: {params: {userId: string}}) {

    const { userId } = params;

    const body = await req.json();

    try {
        const response = await api.patch(`/users/${userId}`, body)

        const answer = { statusCode: response.status, data: response.data };
        return Response.json(answer);
    }
    catch (error) {
        return Response.json({ statusCode: 500, data: "Internal server error" });
    }
};

export async function GET(req: Request, {params}: {params: {userId: string}}) {

    const { userId } = params;

    try {
        const response = await api.get(`/users/${userId}`)

        const answer = { statusCode: response.status, data: response.data };
        return Response.json(answer);
    }
    catch (error) {
        return Response.json({ statusCode: 500, data: "Internal server error" });
    }
}
