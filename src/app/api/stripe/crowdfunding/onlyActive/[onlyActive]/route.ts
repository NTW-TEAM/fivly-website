import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest, {params}: {params: {onlyActive: string}}) {

    const { onlyActive } = params;

    const data = await api.get(`/stripe/crowdfunding?onlyActive=${onlyActive}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
}