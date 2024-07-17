// pages/documents.tsx
import { Metadata } from "next";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import GedPageComponent from "@/components/Ged/GedPageComponent";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import {UserJwt} from "@/types/UserJwt";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Gestion éléctronique des documents",
  description: DESCRIPTION,
};

const DocumentsPage = () => {
  const user = getUser();
  return <GedPageComponent user={user} />;
};

export default DocumentsPage;
