import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import CrowdfundingPageComponent from "@/components/Crowdfunding/CrowdfundingPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Crowdfunding",
  description: DESCRIPTION,
};

const CrowdFundingPage = async () => {
  return <CrowdfundingPageComponent />;
};

export default CrowdFundingPage;
