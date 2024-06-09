import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import React from "react";

export const metadata: Metadata = {
  title: TITLE + " - Equipement",
  description: DESCRIPTION,
};

const PermissionsPage = async () => {
  return <div />;
};

export default PermissionsPage;
