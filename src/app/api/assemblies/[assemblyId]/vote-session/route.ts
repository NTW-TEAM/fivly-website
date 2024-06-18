import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function GET(req: NextApiRequest, {params}: {params: {assemblyId: string}}) {
    
    const { assemblyId } = params;

    const data = await api.get(`/assemblies/${assemblyId}/vote-session`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function POST(req: Request, {params}: {params: {assemblyId: string}}) {
    
    const { assemblyId } = params;

    const body = await req.json();

    const data = await api.post(`/assemblies/${assemblyId}/vote-session`, body);
    const response = { statusCode: data.status, data: data.message };

    return Response.json(response);
};