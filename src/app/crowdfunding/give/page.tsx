import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import GiveDonationPageComponent from "@/components/Donation/GiveDonationPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Faire un don",
  description: DESCRIPTION,
};

const GiveDonationPage = async () => {
  return <GiveDonationPageComponent />;
};

export default GiveDonationPage;
