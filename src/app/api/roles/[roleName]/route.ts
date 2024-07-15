import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function DELETE(req: NextRequest, {params}: {params: {roleName: string}}) {

    const {roleName } = params;

    const data = await api.delete(`/roles/${roleName}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

