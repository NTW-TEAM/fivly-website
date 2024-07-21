import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function POST(req: Request, {params}: {params: {serialNumber: string, idLocal: string}}) {
    
    const { serialNumber, idLocal } = params;

    const response = await api.post(`/materials/${serialNumber}/local/${idLocal}`);

    const answer = { statusCode: response.status, data: response.data };

    return Response.json(answer);
}   
