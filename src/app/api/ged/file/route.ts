import {NextApiRequest, NextApiResponse} from 'next';
import FormData from 'form-data';
import api, {apiFormData} from '@/services/axios';
import {NextRequest} from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
        return res.status(400).json({message: 'File is required'});
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const formData = new FormData();
    formData.append('file', buffer, file.name);
    formData.append('path', data.get('path') as string);
    formData.append('name', data.get('name') as string);

    try {
        const response = await apiFormData.post(
            '/ged/file',
            formData,
        );
        console.log("Response from external API:", response.data);

        return Response.json(response.data);
    } catch (error) {
        console.error("Error uploading file to external API:", error);
        return Response.json({message: "Error uploading file"});
    }
}

export async function DELETE(req: NextRequest, res: NextApiResponse) {
    const path = req.nextUrl.searchParams.get("path");
    console.log("Path to delete:", path)

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
        //console.error("Error deleting file:", error);
        return new Response(null, { status: 500 });
    }
}