import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import ActivityTypePageComponent from "@/components/ActivityType/ActivityTypePageComponent";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Type d'activité",
  description: DESCRIPTION,
};

const ActivityTypePage = async () => {
  const user = getUser();
  return <ActivityTypePageComponent user={user} />;
};

export default ActivityTypePage;
