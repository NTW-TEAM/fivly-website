import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function DELETE(req: NextApiRequest, {params}: {params: {activityTypeName: string}}) {

    const { activityTypeName } = params;

    const data = await api.delete(`/activity-types/${activityTypeName}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function POST(req: NextApiRequest, {params}: {params: {activityTypeName: string}}) {

    const { activityTypeName } = params;

    const data = await api.post(`/activity-types/${activityTypeName}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
}

