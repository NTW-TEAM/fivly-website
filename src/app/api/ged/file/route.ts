import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";
import axios from "axios";
import formidable from "formidable";
import streamToBlob from "stream-to-blob";
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

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return Response.json({ message: "Error parsing form" });
    }

    console.log("Fields:", fields);
    console.log("Files:", files);

    const file = files.file as formidable.File;

    const formData = new FormData();

    const blob = await streamToBlob(fs.createReadStream(file.filepath));
    formData.append("file", blob);
    formData.append("path", fields.path as string);
    formData.append("name", fields.name as string);

    try {
      const response = await axios.post(
        "http://inclinus.fr:3189/ged/file",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      console.log("Response from external API:", response.data);

      return Response.json(response.data);
    } catch (error) {
      console.error("Error uploading file to external API:", error);
      return Response.json({ message: "Error uploading file" });
    }
  });
}
