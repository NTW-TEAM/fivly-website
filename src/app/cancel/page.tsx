import { Metadata } from "next";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import React from "react";
import ErrorPageComponent from "@/components/StripeComponent/ErrorPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Erreur de donation",
  description: DESCRIPTION,
};

const ErrorStripePage = async () => {
  return <ErrorPageComponent />;
};

export default ErrorStripePage;
