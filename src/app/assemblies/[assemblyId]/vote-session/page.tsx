import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import AssemblyVoteSessionPageComponent
    from "@/components/Assemblies/[assemblyId]/vote-session/AssemblyVoteSessionPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Assemblées",
  description: DESCRIPTION,
};

const AssemblyVoteSessionPage = async () => {

  return <AssemblyVoteSessionPageComponent />;
};

export default AssemblyVoteSessionPage;
