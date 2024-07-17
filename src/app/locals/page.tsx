import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import LocalPageComponent from "@/components/Locals/LocalPageComponent";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Locaux",
  description: DESCRIPTION,
};

const LocalPage = async () => {
  const user = getUser();
  return <LocalPageComponent user={user}/>;
};

export default LocalPage;
