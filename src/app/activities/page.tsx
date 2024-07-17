import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import ActivitiesPageComponent from "@/components/activities/ActivitiesPageComponent";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Activité(s)",
  description: DESCRIPTION,
};

const ActivitiesPage = async () => {
  const user = getUser();
  return <ActivitiesPageComponent user={user} />;
};

export default ActivitiesPage;
