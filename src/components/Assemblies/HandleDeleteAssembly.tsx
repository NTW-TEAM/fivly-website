import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import {FaTrash} from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import {Assembly} from "@/types/Assembly";

const HandleDeleteAssembly = ({
  assemblies,
  setAssemblies,
  assemblyToDelete,
}: {
  assemblies: Assembly[];
  setAssemblies: React.Dispatch<React.SetStateAction<Assembly[]>>;
  assemblyToDelete: Assembly;
}) => {

    const getAllAssembly = async () => {
        return new Promise<Assembly[]>((resolve, reject) => {
        localApi
            .get(`/api/assemblies`)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                console.error("error", error);
                reject([]);
            });
        });
    };

  function deleteAssemly(): void {
    localApi
      .delete(`/api/assemblies/${assemblyToDelete.id}`)
      .then((response) => {
        if (response.status === 200) {
          ToastHandler.toast("L'assemblée a été supprimée avec succès", "success");
          getAllAssembly().then((data) => {
            setAssemblies(data);
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
      <button className="text-primary" onClick={deleteAssemly}>
        <FaTrash />
      </button>
    </div>
  );
};

export default HandleDeleteAssembly;
