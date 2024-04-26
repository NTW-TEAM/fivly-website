import { NextApiRequest, NextApiResponse } from "next";
import {cookies, headers} from "next/headers";
import NextCors from "nextjs-cors";
import axios from "axios";

export async function DELETE(req: NextApiRequest, {params}: {params: {userId: string, roleName: string}}) {

    const { userId, roleName } = params;

    const data = axios.delete(`http://localhost:3000/users/${userId}/roles/${roleName}`,
        {
            headers: {
                Authorization: `Bearer ${cookies().get("auth_token")?.value}`,
            },
        })


    return Response.json(data)
};

export async function PUT(req: NextApiRequest, {params}: {params: {userId: string, roleName: string}}) {

    const { userId, roleName } = params;

    const data = axios.put(`http://localhost:3000/users/${userId}/roles/${roleName}`,
        {
            headers: {
                Authorization: `Bearer ${cookies().get("auth_token")?.value}`,
            },
        })

    return Response.json(data)
}


