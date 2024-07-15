import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import {FaTrash} from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import {Assembly} from "@/types/Assembly";
import {AssemblyUser} from "@/types/AssemblyUser";

const HandleDeleteUserAssembly = ({
  assembly,
  setAssembly,
  assemblyUserToDelete,
}: {
  assembly: Assembly | null;
  setAssembly: React.Dispatch<React.SetStateAction<Assembly | null>>;
  assemblyUserToDelete: AssemblyUser;
}) => {

  const getAssembly = async (id: number | undefined): Promise<Assembly> => {
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

  function deleteUserAssemly(): void {
    localApi
      .delete(`/api/assemblies/${assembly?.id}/participate/${assemblyUserToDelete.id}`)
      .then((response) => {
        if (response.status === 200) {
          ToastHandler.toast("L'assemblée a été supprimée avec succès", "success");
          getAssembly(assembly?.id).then((data) => {
            setAssembly(data);
          });
        }
      })
      .catch((error) => {
        console.error("error", error);
        ToastHandler.toast("Erreur lors de la suppression de l'assemblée", "error");
      });
  }

  return (
    <div>
      <button className="text-primary" onClick={deleteUserAssemly}>
        <FaTrash />
      </button>
    </div>
  );
};

export default HandleDeleteUserAssembly;
