import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();

  const response = await api.post("/stripe/create-donation-session", body);
  let answer;
  if (response.status === 201) {
    answer = { statusCode: response.status, sessionUrl: response.data.sessionUrl };
  } else {
    answer = { statusCode: response.status, data: response.message };
  }

  console.log(answer)

  return Response.json(answer);
}