import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function POST(req: Request, res: NextApiResponse) {
    const body = await req.json();

    //TODO: ajouter l'id du user dans le body 
    
    const response = await api.post("/activities", body);
    const answer = { statusCode: response.status, data: response.data };
    return Response.json(answer);
}