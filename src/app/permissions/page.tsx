import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import PermissionsPageComponent from "@/components/Permissions/PermissionsPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Permissions",
  description: DESCRIPTION,
};

const PermissionsPage = async () => {
  return <PermissionsPageComponent />;
};

export default PermissionsPage;
