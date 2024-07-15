import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import SuccessPageComponent from "@/components/StripeComponent/SuccessPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Merci pour votre don",
  description: DESCRIPTION,
};

const SuccessStripePage = async () => {
  return <SuccessPageComponent />;
};

export default SuccessStripePage;
