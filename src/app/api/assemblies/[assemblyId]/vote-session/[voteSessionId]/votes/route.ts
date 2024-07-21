import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest, {params}: {params: {assemblyId: string, voteSessionId: string}}) {
    
    const { assemblyId, voteSessionId } = params;

    const data = await api.get(`/assemblies/${assemblyId}/vote-session/${voteSessionId}/votes`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function POST(req: NextRequest, {params}: {params: {assemblyId: string, voteSessionId: string}}) {

    const { assemblyId, voteSessionId } = params;

    const body = await req.json();

    const data = await api.post(`/assemblies/${assemblyId}/vote-session/${voteSessionId}/votes`, body);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};