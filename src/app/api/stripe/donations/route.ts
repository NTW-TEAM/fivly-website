import {NextApiResponse} from "next";
import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
    const data = api.get("/stripe/donations");
    return Response.json((await data).data);
}
