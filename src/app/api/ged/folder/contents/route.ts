import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function POST(req: Request, res: NextApiResponse) {
  let body = await req.json();

  const data = api.post("/ged/folder/contents",  body);
  return Response.json((await data).data);
}
