import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import {FaTrash} from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import {Vote} from "@/types/Vote";

const HandleDeleteVoteAssembly = ({
  setVotes,
  voteToDelete,
  assemblyId,
}: {
  setVotes: React.Dispatch<React.SetStateAction<Vote[]>>;
  voteToDelete: Vote;
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

  function deleteVoteAssemly(): void {
    localApi
      .delete(
        `/api/assemblies/${assemblyId}/vote-session/${voteToDelete.id}`,
      )
      .then((response) => {
        if (response.status === 200) {
          ToastHandler.toast("La session de vote a été supprimée avec succès", "success");
          getAllVotes(assemblyId as string).then((data) => {
            setVotes(data);
          });
        }
      })
      .catch((error) => {
        console.error("error", error);
        ToastHandler.toast("Erreur lors de la suppression de la session de vote", "error");
      });
  }

  return (
    <div>
      <button className="text-primary" onClick={deleteVoteAssemly}>
        <FaTrash />
      </button>
    </div>
  );
};

export default HandleDeleteVoteAssembly;
