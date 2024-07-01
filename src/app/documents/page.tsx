import { Metadata } from "next";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import GedPageComponent from "@/components/Ged/GedPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Gestion éléctronique des documents",
  description: DESCRIPTION,
};

const DocumentsPage = () => {
  return <GedPageComponent />;
};

export default DocumentsPage;
