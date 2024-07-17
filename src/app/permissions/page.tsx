import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import PermissionsPageComponent from "@/components/Permissions/PermissionsPageComponent";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Permissions",
  description: DESCRIPTION,
};

const PermissionsPage = async () => {
  const user = getUser();

  return <PermissionsPageComponent user={user}/>;
};

export default PermissionsPage;
