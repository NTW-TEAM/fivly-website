import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function DELETE(req: NextApiRequest, {params}: {params: {activityId: string}}) {

    const { activityId } = params;

    const data = await api.delete(`/activities/${activityId}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function POST(req: NextApiRequest, {params}: {params: {activityId: string}}) {

    const { activityId } = params;

    const data = await api.post(`/activities/${activityId}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
}

