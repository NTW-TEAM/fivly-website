import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Equipement",
  description: DESCRIPTION,
};

const MaterialPage = async () => {
  const user = getUser();
  return <div />;
};

export default MaterialPage;
