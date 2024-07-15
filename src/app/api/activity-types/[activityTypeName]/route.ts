import api from "@/services/axios";
import {NextRequest} from "next/server";

export async function DELETE(req: NextRequest, {params}: {params: {activityTypeName: string}}) {

    const { activityTypeName } = params;

    const data = await api.delete(`/activity-types/${activityTypeName}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
};

export async function POST(req: NextRequest, {params}: {params: {activityTypeName: string}}) {

    const { activityTypeName } = params;

    const data = await api.post(`/activity-types/${activityTypeName}`);

    const response = { statusCode: data.status, data: data.data };

    return Response.json(response);
}

