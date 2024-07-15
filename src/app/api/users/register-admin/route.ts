import {NextApiResponse} from "next";
import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
    const data = api.get("/roles");
    return Response.json((await data).data);
}

export async function POST(req: Request, res: NextApiResponse) {
    const body = await req.json();
    const response = await api.post("/users/register-admin", body);
    const answer = { statusCode: response.status, data: response.data };
    return Response.json(answer);
}