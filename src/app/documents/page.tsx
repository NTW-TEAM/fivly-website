import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { DESCRIPTION, TITLE } from "@/constant/metadata";


export const metadata: Metadata = {
  title: TITLE + " - Gestion éléctronique des documents",
  description: DESCRIPTION,
};

const DocumentsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gestion éléctronique des documents" />

      {/* make a card that use the full height of the page and only 2 col span of 12 */}
      <div className="col-span-12 xl:col-span-2">
        <div className="min-h-screen bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Documents
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Gestion éléctronique des documents
            </p>
          </div>
        </div>
      </div>



    </DefaultLayout>
  );
};

export default DocumentsPage;
