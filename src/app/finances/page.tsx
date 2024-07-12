import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import CardDataStats from "@/components/CardDataStats";
import { FaHandsHelping } from "react-icons/fa";
import { AiFillFund } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";
import DashboardChart from "@/components/Finances/DashboardChart";
import FinancePageComponent from "@/components/Finances/FinancePageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Dashboard Finances",
  description: DESCRIPTION,
};

const MembresPage = () => {
  return <FinancePageComponent />;
};

export default MembresPage;
