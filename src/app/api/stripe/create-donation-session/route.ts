import {NextApiResponse} from "next";
import jwt from "jsonwebtoken";
import api from "@/services/axios";
import {cookies} from "next/headers";

export async function POST(req: Request, res: NextApiResponse) {
 try {
    let body = await req.json();
    
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth_token");

    if (authToken) {
      const user = jwt.verify(authToken.value, process.env.JWT_SECRET!);
      if(typeof user === "string") {
        return Response.json({ statusCode: 401, message: "Unauthorized" });
      } else {
        body = { ...body, userId: user.id };
      }
    }

    const response = await api.post("/stripe/create-donation-session", body);

    let answer;
    if (response.status === 201) {
      answer = {
        statusCode: response.status,
        sessionUrl: response.data.sessionUrl,
      };
    } else {
      answer = { statusCode: response.status, data: response.data.message };
    }

    return Response.json(answer);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" })
  }
}
