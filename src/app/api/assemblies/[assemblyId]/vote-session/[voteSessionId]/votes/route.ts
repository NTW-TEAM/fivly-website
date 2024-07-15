import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest, {params}: {params: {assemblyId: string, voteSessionId: string}}) {
    
    const { assemblyId, voteSessionId } = params;

    const data = await api.get(`/assemblies/${assemblyId}/vote-session/${voteSessionId}/votes`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};