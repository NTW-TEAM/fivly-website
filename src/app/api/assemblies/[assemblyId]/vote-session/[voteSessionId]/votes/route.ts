import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function GET(req: NextApiRequest, {params}: {params: {assemblyId: string, voteSessionId: string}}) {       
    
    const { assemblyId, voteSessionId } = params;

    const data = await api.get(`/assemblies/${assemblyId}/vote-session/${voteSessionId}/votes`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};