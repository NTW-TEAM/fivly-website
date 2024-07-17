import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import DonationPageComponent from "@/components/Donation/DonationPageComponent";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Donations",
  description: DESCRIPTION,
};

const DonationPage = async () => {
  const user = getUser();
  return <DonationPageComponent user={user}/>;
};

export default DonationPage;
