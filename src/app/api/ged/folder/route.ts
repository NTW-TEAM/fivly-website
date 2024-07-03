import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  const path = url.searchParams.get("path");

  if (!path) {
    return new Response("Path is required", { status: 400 });
  }

  try {
    const response = await api.delete(`/ged/folder`, {
      params: { path: decodeURIComponent(path as string) },
      responseType: "arraybuffer",
    });

    const folderData = response.data;
    const folderName = (path as string).split("/").pop() || "folder";
    const contentType = response.headers["content-type"];

    return new Response(folderData, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; foldername="${folderName}"`,
      },
    });
  } catch (error) {
    console.error("Error deleting folder:", error);
    return new Response("Failed to delete folder", { status: 500 });
  }
}
