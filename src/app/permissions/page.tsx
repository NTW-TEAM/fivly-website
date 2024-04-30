import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import TableMembers from "@/components/members/TableMembers";
import CardDataStats from "@/components/CardDataStats";
import { FaUsers } from "react-icons/fa";
import { Members } from "@/types/members";
import { getMembers } from "../../services/memberService";
import React from "react";
import { Roles } from "@/types/roles";
import axios from "axios";
import PermissionsPageComponent from "@/components/Permissions/PermissionsPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Permissions",
  description: DESCRIPTION,
};

const PermissionsPage = async () => {
  return <PermissionsPageComponent />;
};

export default PermissionsPage;
