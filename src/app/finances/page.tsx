import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import FinancePageComponent from "@/components/Finances/FinancePageComponent";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Dashboard Finances",
  description: DESCRIPTION,
};

const FinancePage = () => {
  const user = getUser();

  return <FinancePageComponent user={user}/>;
};

export default FinancePage;
