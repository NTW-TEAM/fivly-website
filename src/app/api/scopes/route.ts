import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const data = api.get("http://localhost:3000/scopes");
    return Response.json((await data).data);
}
