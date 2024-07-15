import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import AssemblyIdPageComponent from "@/components/Assemblies/[assemblyId]/AssemblyIdPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Assemblées",
  description: DESCRIPTION,
};

const AssemblyPage = async () => {

  return <AssemblyIdPageComponent />;
};

export default AssemblyPage;
