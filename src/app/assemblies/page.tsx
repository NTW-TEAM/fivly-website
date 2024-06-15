import { Metadata } from "next";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import React from "react";
import LocalPageComponent from "@/components/Locals/LocalPageComponent";
import AssemblyPageComponent from "@/components/Assemblies/AssemblyPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Assemblées",
  description: DESCRIPTION,
};

const AssembliesPage = async () => {
  return <AssemblyPageComponent />;
};

export default AssembliesPage;
