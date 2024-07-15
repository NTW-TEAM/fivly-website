import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest, {params}: {params: {assemblyId: string}}) {
    
    const { assemblyId } = params;

    const data = await api.get(`/assemblies/${assemblyId}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};


export async function DELETE(req: NextRequest, {params}: {params: {assemblyId: string}}) {

    const { assemblyId } = params;

    const response = await api.delete(`/assemblies/${assemblyId}`);

    const answer = { statusCode: response.status, data: response.data.message };

    return Response.json(answer);
};

export async function PATCH(req: Request, {params}: {params: {assemblyId: string}}) {
    
    const { assemblyId } = params;

    const body = await req.json();

    const response = await api.patch(`/assemblies/${assemblyId}`, body);

    const answer = { statusCode: response.status, data: response.data.message };

    return Response.json(answer);
}   
