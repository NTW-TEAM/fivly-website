import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import CardDataStats from "@/components/CardDataStats";
import { FaHandsHelping } from "react-icons/fa";
import { AiFillFund } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";
import DashboardChart from "@/components/Finances/DashboardChart";

export const metadata: Metadata = {
  title: TITLE + " - Dashboard Finances",
  description: DESCRIPTION,
};

const MembresPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dashboard Finances" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats
          title="Total des fonds récoltés"
          total="200,000 €"
          rate="+ 10%"
          levelUp
        >
          <AiFillFund className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats
          title="Nombre de dons"
          total="100"
          rate="- 25 %"
          levelDown
        >
          <GiReceiveMoney className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats
          title="Cotisations en attente"
          total="50"
          rate="+ 50 %"
          levelUp
        >
          <FaHandsHelping className="fill-primary dark:fill-white" />
        </CardDataStats>
      </div>

      <DashboardChart />      

    </DefaultLayout>
  );
};

export default MembresPage;
