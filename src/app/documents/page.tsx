// pages/documents.tsx
import { Metadata } from "next";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import GedPageComponent from "@/components/Ged/GedPageComponent";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import {UserJwt} from "@/types/UserJwt";

export const metadata: Metadata = {
  title: TITLE + " - Gestion éléctronique des documents",
  description: DESCRIPTION,
};

const DocumentsPage = () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token");

  if (authToken) {
    const user = jwt.verify(authToken.value, process.env.JWT_SECRET!) as UserJwt;
    return <GedPageComponent user={user} />;
  } else {
    return <>Erreur</>;
  }
};

export default DocumentsPage;
