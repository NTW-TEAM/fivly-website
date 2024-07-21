"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Assembly } from "@/types/Assembly";
import localApi from "@/services/localAxiosApi";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableVotes from "./TableVote";
import { Vote } from "@/types/Vote";
import { UserJwt } from "@/types/UserJwt";

const AssemblyVoteSessionPageComponent = ({ user }: { user: UserJwt }) => {
  const { assemblyId } = useParams() as { assemblyId: string };
  const [assembly, setAssembly] = useState<Assembly | null>(null);
  const [votes, setVotes] = useState<Vote[] | null>(null); // Change to Vote[] | null

  const getAssembly = async (id: string): Promise<Assembly> => {
    return new Promise<Assembly>((resolve, reject) => {
      localApi
          .get(`/api/assemblies/${id}`)
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data.data);
            } else {
              reject(new Error("Failed to fetch assembly"));
            }
          })
          .catch((error) => {
            console.error("error", error);
            reject(new Error("Failed to fetch assembly"));
          });
    });
  };

  const getAllVotes = async (id: string): Promise<Vote[] | null> => {
    return new Promise<Vote[]>((resolve, reject) => {
      localApi
          .get(`/api/assemblies/${id}/vote-session`)
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data.data);
            } else {
              reject(new Error("Failed to fetch assembly"));
            }
          })
          .catch((error) => {
            console.error("error", error);
            reject(new Error("Failed to fetch assembly"));
          });
    });
  };

  useEffect(() => {
    if (assemblyId) {
      getAssembly(assemblyId as string)
          .then((data) => {
            setAssembly(data);
          })
          .catch((error) => {
            console.error(error);
          });

      getAllVotes(assemblyId as string)
          .then((data) => {
            setVotes(data);
          })
          .catch((error) => {
            console.error(error);
          });
    }
  }, [assemblyId]);

  return (
      <DefaultLayout user={user}>
        <Breadcrumb
            pageName={["Assemblies", assembly?.description || "", "Sessions de vote"]}
        />
        <div className="mt-4 flex flex-col gap-10">
          <TableVotes votes={votes} setVotes={setVotes} assemblyId={assemblyId} user={user} />
        </div>
      </DefaultLayout>
  );
};

export default AssemblyVoteSessionPageComponent;
