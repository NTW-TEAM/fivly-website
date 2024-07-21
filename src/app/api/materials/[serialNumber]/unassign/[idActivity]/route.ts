import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function DELETE(req: Request, {params}: {params: {serialNumber: string, idActivity: string}}) {
    
    const { serialNumber, idActivity } = params;

    const response = await api.delete(`/materials/${serialNumber}/unassign/${idActivity}`);

    const answer = { statusCode: response.status, data: response.data };

    return Response.json(answer);
}   
