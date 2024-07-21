import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export const dynamic = 'force-dynamic';


export async function POST(req: Request, res: NextApiResponse) {
    const body = await req.json();

    const response = await api.post("/ged/permission", body);

    const answer = { statusCode: response.status, data: response.data };

    return Response.json(answer);
}
