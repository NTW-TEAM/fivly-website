import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  const path = url.searchParams.get("path");

  if (!path) {
    return new Response(null, { status: 400 });
  }

  try {
    const response = await api.delete(`/ged/file`, {
      params: { path: path },
      responseType: "arraybuffer",
    });

    const fileData = response.data;
    const fileName = (path as string).split("/").pop() || "file";
    const contentType = response.headers["content-type"];

    return new Response(fileData, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const body = await req.json();

    await api.post(`/ged/file`, body);
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error adding folder:", error);
    return new Response(null, { status: 500 });
  }
}

