import { NextApiRequest, NextApiResponse } from "next";
import { Members } from "@/types/members";
import api from "@/services/axios";

export async function PATCH(req: NextApiRequest, {params}: {params: {user: Members}}) {

    const { user } = params;
    const body = req.body;


    const data = await api.patch(`/users/${user.id}`, body);

    const response = { statusCode: data.status, data: data.data };

    return Response.json("ERREUR");
};
