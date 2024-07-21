import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function DELETE(req: NextRequest, {params}: {params: {serialNumber: string}}) {

    const {serialNumber } = params;

    const data = await api.delete(`/materials/${serialNumber}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function PUT(req: Request, {params}: {params: {serialNumber: string}}) {
    
    const { serialNumber } = params;

    const body = await req.json();

    const response = await api.put(`/materials/${serialNumber}`, body);

    const answer = { statusCode: response.status, data: response.data };

    return Response.json(answer);
}   
