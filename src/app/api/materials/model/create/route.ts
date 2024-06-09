import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function POST(req: Request, res: NextApiResponse) {
    const body = await req.json();
    const response = await api.post("/materials/model/create", body);
    const answer = { statusCode: response.status, data: response.data };
    return Response.json(answer);
}