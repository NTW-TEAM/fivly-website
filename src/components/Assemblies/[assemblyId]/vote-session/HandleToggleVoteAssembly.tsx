import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import {FaToggleOff} from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import {Vote} from "@/types/Vote";

const HandleToggleVoteAssembly = ({
  setVotes,
  voteToToggle,
  assemblyId,
}: {
  setVotes: React.Dispatch<React.SetStateAction<Vote[]>>;
  voteToToggle: Vote;
  assemblyId: string | string[];
}) => {
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

  function toggleVoteAssemly(): void {
    localApi
      .patch(`/api/assemblies/${assemblyId}/vote-session/${voteToToggle.id}`)
      .then((response) => {
        if (response.status === 200) {
          ToastHandler.toast("La session de vote a été désactivée avec succès", "success");
          getAllVotes(assemblyId as string).then((data) => {
            setVotes(data);
          });
        }
      })
      .catch((error) => {
        console.error("error", error);
        ToastHandler.toast("Erreur lors de la désactivation de la session de vote", "error");
      });
  }

  return (
    <div>
      <button className="text-primary" onClick={toggleVoteAssemly}>
        <FaToggleOff />
      </button>
    </div>
  );
};

export default HandleToggleVoteAssembly;
