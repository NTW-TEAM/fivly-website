import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function DELETE(req: NextApiRequest, {params}: {params: {roleName: string}}) {

    const {roleName } = params;

    const data = await api.delete(`/materials/${roleName}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function PUT(req: Request, {params}: {params: {materialsId: string}}) {
    
    const { materialsId } = params;

    const body = await req.json();

    const response = await api.put(`/materials/${materialsId}`, body);

    console.log(response);

    const answer = { statusCode: response.status, data: response.data };

    return Response.json(answer);
}   
