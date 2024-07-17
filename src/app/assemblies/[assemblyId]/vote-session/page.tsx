import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import AssemblyVoteSessionPageComponent
    from "@/components/Assemblies/[assemblyId]/vote-session/AssemblyVoteSessionPageComponent";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Assemblées",
  description: DESCRIPTION,
};

const AssemblyVoteSessionPage = async () => {
    const user = getUser();
  return <AssemblyVoteSessionPageComponent user={user} />;
};

export default AssemblyVoteSessionPage;
