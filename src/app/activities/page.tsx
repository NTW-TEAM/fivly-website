import { Metadata } from "next";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import React from "react";
import ActivitiesPageComponent from "@/components/activities/ActivitiesPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Activité(s)",
  description: DESCRIPTION,
};

const ActivitiesPage = async () => {
  return <ActivitiesPageComponent />;
};

export default ActivitiesPage;
