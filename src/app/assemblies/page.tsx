import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import AssemblyPageComponent from "@/components/Assemblies/AssemblyPageComponent";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Assemblées",
  description: DESCRIPTION,
};

const AssembliesPage = async () => {
  const user = getUser();
  return <AssemblyPageComponent user={user}/>;
};

export default AssembliesPage;
