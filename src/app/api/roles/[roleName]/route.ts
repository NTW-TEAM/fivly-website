import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function DELETE(req: NextApiRequest, {params}: {params: {roleName: string}}) {

    const {roleName } = params;

    const data = await api.delete(`/roles/${roleName}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

