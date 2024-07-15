import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function DELETE(req: NextRequest, {params}: {params: {localId: string}}) {

    const { localId } = params;

    const data = await api.delete(`/locals/${localId}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function PATCH(req: Request, {params}: {params: {localId: string}}) {
    
    const { localId } = params;

    const body = await req.json();

    const response = await api.patch(`/locals/${localId}`, body);

    const answer = { statusCode: response.status, data: response.data };

    return Response.json(answer);
}   
