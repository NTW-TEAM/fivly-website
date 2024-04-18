"use client";

import { getUser } from "@/app/members/edit/[id]/page";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";


const EditMembers = () => {
  // get the id from the url params
  const id = useParams();

  // get the user data from the api

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"></div>
  );
};

export default EditMembers;
