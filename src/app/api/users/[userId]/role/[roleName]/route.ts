import api from "@/services/axios";
import {NextRequest} from "next/server";

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest, {params}: {params: {userId: string, roleName: string}}) {

    const { userId, roleName } = params;

    const data = await api.delete(`/users/${userId}/roles/${roleName}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function PUT(req: NextRequest, {params}: {params: {userId: string, roleName: string}}) {

    const { userId, roleName } = params;

    try {
        const response = await api.put(`/users/${userId}/roles/${roleName}`)

        const answer = { statusCode: response.data.statusCode, data: response.data };
        return Response.json(answer);
    }
    catch (error) {
        console.error("error", error);
    }

    return Response.json({ statusCode: 500, data: "Internal server error" });
}


