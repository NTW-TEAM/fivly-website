import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import NextCors from "nextjs-cors";

export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {

    const { userId, roleName } = req.query;

    console.log("cookiiiiiiiie", cookies().get("auth_token")?.value);
    

/*     const data = axios.delete(`http://localhost:3000/users/${userId}/role/${roleName}`,
        {
            headers: {
                Authorization: `Bearer ${cookies().get("auth_token")?.value}`,
            },
        }) 

    return res.status(200).json(data); */

    return res.status(200).json({userId, roleName});
    
};


