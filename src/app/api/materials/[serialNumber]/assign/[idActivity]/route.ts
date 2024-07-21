import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export const dynamic = 'force-dynamic';

export async function POST(req: Request, {params}: {params: {serialNumber: string, idActivity: string}}) {
    
    const { serialNumber, idActivity } = params;

    const response = await api.post(`/materials/${serialNumber}/assign/${idActivity}`);

    const answer = { statusCode: response.status, data: response.data };

    return Response.json(answer);
}   
