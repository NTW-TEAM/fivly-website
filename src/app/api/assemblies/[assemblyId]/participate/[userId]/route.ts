import { NextApiRequest } from "next";
import api from "@/services/axios";

export async function POST(req: Request, {params}: {params: {assemblyId: string, userId: string}}) {
    
    const { assemblyId, userId } = params;

    const response = await api.post(`/assemblies/${assemblyId}/participate/${userId}`);

    const answer = { statusCode: response.status, data: response.message };

    return Response.json(answer);
}   

export async function DELETE(req: NextApiRequest, {params}: {params: {assemblyId: string, userId: string}}) {

    const { assemblyId, userId } = params;

    const response = await api.delete(`/assemblies/${assemblyId}/participate/${userId}`);

    const answer = { statusCode: response.status, data: response.message };

    return Response.json(answer);
};
