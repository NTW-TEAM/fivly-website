import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import CardDataStats from "@/components/CardDataStats";
import { FaUsers } from "react-icons/fa";
import TableActivityType from "@/components/ActivityType/TableActivityType";
import TableActivity from "@/components/activity/TableActivity";

export const metadata: Metadata = {
  title: TITLE + " - Activités",
  description: DESCRIPTION,
};

const MembresPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Activités" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats title="Activités au total" total="152." rate="">
          <FaUsers className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Activités active" total="45." rate="">
          <FaUsers className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Type d'activités" total="8." rate="">
          <FaUsers className="fill-primary dark:fill-white" />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <div className="col-span-2 flex">
          <div className="flex h-full w-full flex-col justify-between bg-white shadow-md p-4">
            <TableActivity />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MembresPage;
