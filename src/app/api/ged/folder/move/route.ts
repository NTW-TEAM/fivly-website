import api from "@/services/axios";

export const dynamic = 'force-dynamic';

export async function PUT(req: Request) {
    
    const body = await req.json();

    const response = await api.put(`/ged/folder/move`, body);

    const answer = { statusCode: response.status, data: response.data };

    return Response.json(answer);
}   
