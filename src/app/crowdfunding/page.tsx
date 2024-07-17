import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import CrowdfundingPageComponent from "@/components/Crowdfunding/CrowdfundingPageComponent";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Crowdfunding",
  description: DESCRIPTION,
};

const CrowdFundingPage = async () => {
  const user = getUser();

  return <CrowdfundingPageComponent user={user} />;
};

export default CrowdFundingPage;
