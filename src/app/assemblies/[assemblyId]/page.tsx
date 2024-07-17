import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import AssemblyIdPageComponent from "@/components/Assemblies/[assemblyId]/AssemblyIdPageComponent";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Assemblées",
  description: DESCRIPTION,
};

const AssemblyPage = async () => {
  const user = getUser();
  return <AssemblyIdPageComponent user={user} />;
};

export default AssemblyPage;
