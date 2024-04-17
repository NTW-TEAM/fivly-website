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
        <div className="flex h-[70vh] w-full flex-col items-center justify-center">
          <h1 className="text-center text-7xl font-bold">
            Welcome to <span className="text-primary">Fivly</span>
          </h1>
          <p className="text-center">{DESCRIPTION}</p>
        </div>
      </DefaultLayout>
    </>
  );
}
