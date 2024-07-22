import api from "@/services/axios";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    
    const body = await req.json();

    const response = await api.post(`/ged/folder/current`, body);

    const answer = { statusCode: response.status, data: response.data };

    return Response.json(answer);
}   
