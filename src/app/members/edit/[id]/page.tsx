import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import EditMembers from "@/components/members/EditMembers";
import axios from "axios";

export const metadata: Metadata = {
  title: TITLE + " - Membres",
  description: DESCRIPTION,
};

export const getUser = async (id: string) => {
  // get the user data from the api
  axios.get(`${process.env.API_URL}/users/${id}`)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}


const MembresEditPage = async () => {  

  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Membres" />

      <EditMembers />

    </DefaultLayout>
  );
};

export default MembresEditPage;
