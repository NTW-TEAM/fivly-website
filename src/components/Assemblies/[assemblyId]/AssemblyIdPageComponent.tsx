"use client";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../Layouts/DefaultLayout";
import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {Assembly} from "@/types/Assembly";
import localApi from "@/services/localAxiosApi";
import LoadingSkeleton from "./LoadingSkeleton";
import TableMembersAssembly from "./TableMembersAssembly";
import TableMembersAssemblySkeleton from "./TableMembersAssemblySkeleton";
import {Button} from "@nextui-org/react";
import {Vote} from "@/types/Vote";
import {UserJwt} from "@/types/UserJwt";

const AssemblyIdPageComponent = ({user}: {user: UserJwt}) => {
  const { assemblyId } = useParams();
  const [assembly, setAssembly] = useState<Assembly | null>(null);
  const [voteSessions, setVotes] = useState<Vote[] | null>(null);
  const [electionSessions, setElectionSessions] = useState<Vote[] | null>(null);

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

  const getAllVotes = async (id: string): Promise<Vote[]> => {
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
      getAssembly(assemblyId as string).then((data) => {
        setAssembly(data);
      }).catch((error) => {
        console.error(error);
      });

      getAllVotes(assemblyId as string).then((data) => {
        setVotes(data);
      }).catch((error) => {
        console.error(error);
      });

    }
  }, [assemblyId]);

  return (
    <DefaultLayout user={user}>
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
              <div className="flex items-center justify-between"></div>

              <ul className="list-inside list-disc">
                {voteSessions && voteSessions?.length > 0 ? (
                  <>
                    <p className="text-center">
                      Il y a <strong>{voteSessions.length}</strong> sessions de
                      vote en cours
                    </p>
                    <div className="flex h-full items-center justify-center">
                      <a href={`/assemblies/${assemblyId}/vote-session`}>
                        <Button>Accéder aux sessions de vote</Button>
                      </a>
                    </div>
                  </>
                ) : (
                  <p>
                    <strong>Vote Session:</strong> Aucune session de vote
                  </p>
                )}
              </ul>
            </div>

            <div className="w-full rounded-lg bg-white p-4 shadow-md">
              <div className="flex items-center justify-between"></div>

              <ul className="list-inside list-disc">
                {electionSessions && electionSessions?.length > 0 ? (
                  <>
                    <p className="text-center">
                      Il y a <strong>{electionSessions.length}</strong> sessions
                      d&apos;éléctions en cours
                    </p>
                    <div className="flex h-full items-center justify-center">
                      <a href={`/assemblies/${assemblyId}/vote-session`}>
                        <Button>Accéder aux sessions de vote</Button>
                      </a>
                    </div>
                  </>
                ) : (
                  <p className="text-center">
                    <strong>Aucune session d&apos;éléction</strong>
                  </p>
                )}
              </ul>
            </div>
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
