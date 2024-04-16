import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableTest from "@/components/testTable/TableTest";

export const metadata: Metadata = {
  title: "Test",
  description:
    "Test",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

        <TableTest />

    </DefaultLayout>
  );
};

export default TablesPage;
