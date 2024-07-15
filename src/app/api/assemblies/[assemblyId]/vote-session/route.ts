import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest, {params}: {params: {assemblyId: string}}) {
    
    const { assemblyId } = params;

    const data = await api.get(`/assemblies/${assemblyId}/vote-session`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function POST(req: Request, {params}: {params: {assemblyId: string}}) {
    
    const { assemblyId } = params;

    const body = await req.json();

    const response = await api.post(`/assemblies/${assemblyId}/vote-session`, body);
    const answer = { statusCode: response.status, data: response.data.message };

    return Response.json(answer);
};