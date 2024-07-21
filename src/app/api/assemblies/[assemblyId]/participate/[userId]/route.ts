import api from "@/services/axios";
import {NextRequest} from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request, {params}: {params: {assemblyId: string, userId: string}}) {
    
    const { assemblyId, userId } = params;

    const response = await api.post(`/assemblies/${assemblyId}/participate/${userId}`);

    const answer = { statusCode: response.status, data: response.data.message };

    return Response.json(answer);
}   

export async function DELETE(req: NextRequest, {params}: {params: {assemblyId: string, userId: string}}) {

    const { assemblyId, userId } = params;

    const response = await api.delete(`/assemblies/${assemblyId}/participate/${userId}`);

    const answer = { statusCode: response.status, data: response.data.message };

    return Response.json(answer);
};
