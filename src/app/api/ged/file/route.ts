import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services/axios";

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  const path = url.searchParams.get("path");

  if (!path) {
    return res.status(400).json({ message: "Path is required" });
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
    res.status(500).json({ message: "Failed to delete file" });
  }
}
