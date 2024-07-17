import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import MaterialModelPageComponent from "@/components/MaterialModel/MaterialModelPageComponent";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Model d'équipement",
  description: DESCRIPTION,
};

const PermissionsPage = async () => {
  const user = getUser();

  return <MaterialModelPageComponent user={user} />;
};

export default PermissionsPage;
