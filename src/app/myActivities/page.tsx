import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import {getUser} from "@/tools/GetUser";
import MyActivitiesPageComponent from "@/components/MyActivities/MyActivitiesPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Permissions",
  description: DESCRIPTION,
};

const MyActivitiesPage = async () => {
  const user = getUser();

  return <MyActivitiesPageComponent user={user}/>;
};

export default MyActivitiesPage;
