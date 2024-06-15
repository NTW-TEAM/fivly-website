import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function DELETE(req: NextApiRequest, {params}: {params: {assemblyId: string}}) {

    const { assemblyId } = params;

    const data = await api.delete(`/assemblies/${assemblyId}`);

    const response = { statusCode: data.status, data: data.message };

    return Response.json(response);
};

export async function PATCH(req: Request, {params}: {params: {assemblyId: string}}) {
    
    const { assemblyId } = params;

    const body = await req.json();

    const response = await api.patch(`/assemblies/${assemblyId}`, body);

    const answer = { statusCode: response.status, data: response.message };

    return Response.json(answer);
}   
