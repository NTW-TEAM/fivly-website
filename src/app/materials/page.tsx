import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import {getUser} from "@/tools/GetUser";
import MaterialPageComponent from "@/components/Material/MaterialPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Equipement",
  description: DESCRIPTION,
};

const MaterialPage = async () => {
  return <MaterialPageComponent />;
};

export default MaterialPage;
