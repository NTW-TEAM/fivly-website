import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import SideBarGed from "@/components/Ged/SideBarGed";
import CardDocument from "@/components/Ged/CardDocument";


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

        <div className="col-span-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
            <CardDocument title="Document 1" size="1.5 Mo" dateImport="12/12/2021" userImport="Admin" />
            <CardDocument title="Document 1" size="1.5 Mo" dateImport="12/12/2021" userImport="Admin" />
          </div>




        </div>
      </div>
    </DefaultLayout>
  );
};

export default DocumentsPage;
