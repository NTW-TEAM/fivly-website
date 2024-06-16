"use client";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Assembly } from "@/types/Assembly";
import localApi from "@/services/localAxiosApi";
import LoadingSkeleton from "./LoadingSkeleton";
import TableMembersAssembly from "./TableMembersAssembly";
import TableMembersAssemblySkeleton from "./TableMembersAssemblySkeleton";
import { VoteSession } from "@/types/VoteSession";
import { Button } from "@nextui-org/react";

const AssemblyIdPageComponent = () => {
  const { assemblyId } = useParams();
  const [assembly, setAssembly] = useState<Assembly | null>(null);
  const [voteSessions, setVoteSessions] = useState<VoteSession[] | null>(null);

  const getAssembly = async (id: string): Promise<Assembly> => {
    return new Promise<Assembly>((resolve, reject) => {
      localApi
        .get(`/api/assemblies/${id}`)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data.data);
          } else {
            reject(new Error('Failed to fetch assembly'));
          }
        })
        .catch((error) => {
          console.error('error', error);
          reject(new Error('Failed to fetch assembly'));
        });
    });
  };

  const getAllVoteSessions = async (id: string): Promise<VoteSession> => {
    return new Promise<VoteSession>((resolve, reject) => {
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
      getAssembly(assemblyId as string).then((data) => {
        setAssembly(data);
      }).catch((error) => {
        console.error(error);
      });

      getAllVoteSessions(assemblyId as string).then((data) => {
        setVoteSessions(data);
      }).catch((error) => {
        console.error(error);
      });

    }
  }, [assemblyId]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={["Assemblies", assembly?.description || ""]} />
      {assembly ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            <div className="w-full rounded-lg bg-white p-4 shadow-md">
              <h1 className="mb-2 text-xl font-bold">{assembly.description}</h1>
              <p>
                <strong>Date et heure:</strong>{" "}
                {new Date(assembly.datetime).toLocaleString()}
              </p>
              <p>
                <strong>Quorum:</strong> {assembly.quorum}
              </p>
              <p>
                <strong>Location:</strong> {assembly.location}
              </p>
              <p>
                <strong>Is General:</strong>{" "}
                {assembly.isGeneral ? "Oui" : "Non"}
              </p>
              <p>
                <strong>Has Started:</strong>{" "}
                {assembly.hasStarted ? "Oui" : "Non"}
              </p>
            </div>

            <div className="w-full rounded-lg bg-white p-4 shadow-md">
              <div className="flex justify-between items-center"> 
                <Repart
              </div>

              <ul className="list-inside list-disc">
                {voteSessions?.map((voteSession) => (
                  <li key={voteSession.id}>{voteSession.description}</li>
                ))}
              </ul>
            </div>

            <div className="w-full rounded-lg bg-white p-4 shadow-md"></div>
          </div>

          <div className="mt-4 flex flex-col gap-10">
            <TableMembersAssembly
              assembly={assembly}
              setAssembly={setAssembly}
            />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
          <div className="mt-4">
            <TableMembersAssemblySkeleton />
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default AssemblyIdPageComponent;
