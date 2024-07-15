import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {Metadata} from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AlertError from "@/components/Alerts/AlertError";
import AlertAttention from "@/components/Alerts/AlertAttention";
import AlertSuccess from "@/components/Alerts/AlertSuccess";

export const metadata: Metadata = {
  title: "Next.js Alerts | Fivly - Next.js Dashboard Template",
  description:
    "This is Next.js Alerts page for Fivly - Next.js Tailwind CSS Admin Dashboard Template",
  // other metadata
};

const Alerts = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Alerts" />

      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
          {/* <!-- Alerts Item --> */}
          <AlertAttention title="Attention Needed" description="Lorem Ipsum dolor ser" />
          {/* <!-- Alerts Item --> */}
          <AlertSuccess title="Success" description="Lorem Ipsum dolor ser" />
          {/* <!-- Alerts Item --> */}
          <AlertError title="Warning" description="Lorem Ipsum dolor ser" />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Alerts;
