import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest, {params}: {params: {assemblyId: string, voteSessionId: string}}) {
    
    const { assemblyId, voteSessionId } = params;

    const data = await api.get(`/assemblies/${assemblyId}/vote-session/${voteSessionId}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function DELETE(req: NextRequest, {params}: {params: {assemblyId: string, voteSessionId: string}}) {
    
    const { assemblyId, voteSessionId } = params;

    const data = await api.delete(`/assemblies/${assemblyId}/vote-session/${voteSessionId}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
}

export async function PATCH(req: NextRequest, {params, body}: {params: {assemblyId: string, voteSessionId: string}, body: any}) {
    
    const { assemblyId, voteSessionId } = params;

    const data = await api.patch(`/assemblies/${assemblyId}/vote-session/${voteSessionId}`, body);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
}