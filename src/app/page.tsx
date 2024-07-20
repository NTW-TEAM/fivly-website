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
    /*<>
      <DefaultLayout user={user}>
        <div className="flex h-[70vh] w-full flex-col items-center justify-center">
          <h1 className="text-center text-7xl font-bold">
            Welcome to <span className="text-primary">Fivly</span>
          </h1>
          <p className="text-center">{DESCRIPTION}</p>
        </div>
      </DefaultLayout>
    </>*/
      <HomePageComponent user={user}/>
  );
}

// - activité a venir
// - crowdfunding
// - assemblé
// -





