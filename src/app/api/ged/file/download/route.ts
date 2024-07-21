import {NextApiResponse} from "next";
import api from "@/services/axios";
import {NextRequest} from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, res: NextApiResponse) {

  const path = req.nextUrl.searchParams.get("path");


  if (!path) {
    return res.status(400).json({ message: "Path is required" });
  }

  try {
    const response = await api.get(`/ged/file/download`, {
      params: { path: decodeURIComponent(path as string) },
      responseType: "arraybuffer",
    });

    const fileData = response.data;
    const fileName = (path as string).split("/").pop() || "file";
    const contentType = response.headers["content-type"];

    return new Response(fileData, { headers: { "Content-Type": contentType, "Content-Disposition": `attachment; filename="${fileName}"` } });

  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ message: "Error downloading file" });
  }
}
