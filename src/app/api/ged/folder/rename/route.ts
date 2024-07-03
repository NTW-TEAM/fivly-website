import api from "@/services/axios";

export async function PUT(req: Request) {
    
    const body = await req.json();

    const response = await api.put(`/ged/folder/rename`, body);

    const answer = { statusCode: response.status, data: response.data };

    return Response.json(answer);
}   
