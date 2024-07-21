import {Metadata} from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import {UserJwt} from "@/types/UserJwt";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {getUser} from "@/tools/GetUser";
import api from "@/services/axios";
import HomePageComponent from "@/components/Home/HomePageComponent";


export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

export default function Home() {
  const user = getUser();

  return (
      <HomePageComponent user={user}/>
  );
}





