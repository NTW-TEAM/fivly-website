import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import ActivityTypePageComponent from "@/components/ActivityType/ActivityTypePageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Type d'activité",
  description: DESCRIPTION,
};

const ActivityTypePage = async () => {
  return <ActivityTypePageComponent />;
};

export default ActivityTypePage;
