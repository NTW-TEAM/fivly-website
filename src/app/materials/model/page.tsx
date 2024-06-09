import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import React from "react";
import MaterialModelPageComponent from "@/components/MaterialModel/MaterialModelPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Model d'équipement",
  description: DESCRIPTION,
};

const PermissionsPage = async () => {
  return <MaterialModelPageComponent />;
};

export default PermissionsPage;
