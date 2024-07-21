import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import {Metadata} from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import TableMembers from "@/components/members/TableMembers";
import CardDataStats from "@/components/CardDataStats";
import {FaUsers, FaUserShield} from "react-icons/fa";
import {getMembers} from "@/services/memberService";
import React from "react";
import {Members} from "@/types/members";
import {getUser} from "@/tools/GetUser";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: TITLE + " - Membres",
  description: DESCRIPTION,
};

const MembersPage = async () => {
  
  let users: Members[] = await getMembers();
  const user = getUser();


  return (
    <DefaultLayout user={user}>
      <Breadcrumb pageName="Membres" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats title="Membres" total={users.length.toString()} rate="">
          <FaUsers className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Administrateur" total={users.filter((user) => user.roles.map((role) => role.name).includes("admin")).length.toString()} rate="">
           <FaUserShield className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Autres" total={(users.length * 234).toString()} rate="">
          <FaUsers className="fill-primary dark:fill-white" />
        </CardDataStats>
      </div>

      <div className="mt-4 flex flex-col gap-10">
        <TableMembers users={users} />
      </div>
    </DefaultLayout>
  );
};

export default MembersPage;
