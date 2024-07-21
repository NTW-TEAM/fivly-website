import api from "@/services/axios";
import {NextRequest} from "next/server";

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest, {params}: {params: {roleName: string}}) {

    const {roleName } = params;

    const data = await api.delete(`/roles/${roleName}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function PUT(req: NextRequest, {params}: {params: {roleName: string}}) {

    const {roleName } = params;

    const body = await req.json();

    const data = await api.put(`/roles/${roleName}`, body);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
}
