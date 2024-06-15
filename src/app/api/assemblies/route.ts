import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const data = api.get("/assemblies");
    return Response.json((await data).data);
}

export async function POST(req: Request, res: NextApiResponse) {
    const body = await req.json();

    const response = await api.post("/assemblies", body);


    const answer = { statusCode: response.status, data: response.message };

    return Response.json(answer);
}