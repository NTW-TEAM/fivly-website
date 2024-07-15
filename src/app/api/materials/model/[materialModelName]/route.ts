import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function DELETE(req: NextRequest, {params}: {params: {materialModelName: string}}) {

    const { materialModelName } = params;

    const data = await api.delete(`/materials/model/${materialModelName}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function PUT(req: Request, {params}: {params: {materialModelName: string}}) {
    
    const { materialModelName } = params;

    const body = await req.json();

    const response = await api.put(`/materials/model/${materialModelName}`, body);

    console.log(response);

    const answer = { statusCode: response.status, data: response.data };

    return Response.json(answer);
}   
