import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import api from "@/services/axios";
import { cookies } from "next/headers";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const data = api.get("/stripe/crowdfunding");
    return Response.json((await data).data);
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    let body = await req.json();

    const cookieStore = cookies();
    const authToken = cookieStore.get("auth_token");

    if (!authToken) {
        return Response.json({ statusCode: 401, message: "Unauthorized" });
    }

    const user = jwt.verify(authToken.value, process.env.JWT_SECRET!);
    body = { ...body, creator: user.id };

    const response = await api.post("/stripe/crowdfunding", body);

    let answer;
    if (response.status === 201) {
      answer = {
        statusCode: response.status,
        sessionUrl: response.data.sessionUrl,
      };
    } else {
      answer = { statusCode: response.status, data: response.message };
    }

    return Response.json(answer);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" });
  }
}