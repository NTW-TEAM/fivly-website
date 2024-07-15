import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import React from "react";
import LocalPageComponent from "@/components/Locals/LocalPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Locaux",
  description: DESCRIPTION,
};

const LocalPage = async () => {
  return <LocalPageComponent />;
};

export default LocalPage;
