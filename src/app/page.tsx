import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { DESCRIPTION, TITLE } from "@/constant/metadata";


export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="w-full h-[70vh] flex justify-center items-center flex-col">
          <h1 className="text-7xl font-bold text-center">Welcome to <span className="text-primary">Fivly</span></h1>
          <p className="text-center">{DESCRIPTION}</p>
        </div>
      </DefaultLayout>
    </>
  );
}
