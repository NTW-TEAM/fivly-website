import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import SideBarGed from "@/components/Ged/SideBarGed";
import MainPage from "@/components/Ged/MainPage";


export const metadata: Metadata = {
  title: TITLE + " - Gestion éléctronique des documents",
  description: DESCRIPTION,
};

const DocumentsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gestion éléctronique des documents" />

      <div className="grid grid-cols-5 gap-4">

        <SideBarGed />

        <MainPage />



      </div>
    </DefaultLayout>
  );
};

export default DocumentsPage;
