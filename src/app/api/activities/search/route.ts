import {NextApiResponse} from "next";
import api from "@/services/axios";
import {NextRequest} from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, res: NextApiResponse) {
    let body = await req.json();

    const data = api.post("/activities/search", body);
    return Response.json((await data).data);
}