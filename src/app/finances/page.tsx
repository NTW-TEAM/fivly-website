import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import FinancePageComponent from "@/components/Finances/FinancePageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Dashboard Finances",
  description: DESCRIPTION,
};

const MembresPage = () => {
  return <FinancePageComponent />;
};

export default MembresPage;
