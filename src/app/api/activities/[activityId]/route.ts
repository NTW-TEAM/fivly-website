import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function DELETE(req: NextRequest, {params}: {params: {activityId: string}}) {

    const { activityId } = params;

    const data = await api.delete(`/activities/${activityId}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function POST(req: NextRequest, {params}: {params: {activityId: string}}) {

    const { activityId } = params;

    const data = await api.post(`/activities/${activityId}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
}

