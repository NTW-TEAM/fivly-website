import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const data = api.post("/activities/search");
    return Response.json((await data).data);
}