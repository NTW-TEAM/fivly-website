import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import TableMembers from "@/components/members/TableMembers";
import CardDataStats from "@/components/CardDataStats";
import { FaUsers } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { cookies } from "next/headers";
import { Members } from "@/types/members";

export const metadata: Metadata = {
  title: TITLE + " - Membres",
  description: DESCRIPTION,
};

const MembresPage = async () => {  
  let users: Members[] = [];
  await axios.get(`${process.env.API_URL}/users` , {
    headers: {
      'Authorization': `Bearer ${cookies().get('auth_token')?.value}`
    }
  })
    .then(function (response) {
      users = response.data;      
    })
    .catch(function (error) {
      console.log(error);
    });
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Membres" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats title="Membres" total={users.length.toString()} rate="">
          <FaUsers className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="data" total="0" rate="">
          <FaUsers className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="data" total="0" rate="">
          <FaUsers className="fill-primary dark:fill-white" />
        </CardDataStats>
      </div>

      <div className="mt-4 flex flex-col gap-10">
        <TableMembers users={users} />
      </div>
    </DefaultLayout>
  );
};

export default MembresPage;
