import { Metadata } from "next";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import React from "react";
import DonationPageComponent from "@/components/Donation/DonationPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Donations",
  description: DESCRIPTION,
};

const DonationPage = async () => {
  return <DonationPageComponent />;
};

export default DonationPage;
