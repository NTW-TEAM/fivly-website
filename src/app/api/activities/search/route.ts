import {NextApiResponse} from "next";
import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
    const data = api.post("/activities/search");
    return Response.json((await data).data);
}