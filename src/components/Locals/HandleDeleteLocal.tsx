import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import { FaTrash } from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import { local } from "@/types/local";

const HandleDeleteLocal = ({locals, setLocals, local}: {locals: local[]; setLocals: React.Dispatch<React.SetStateAction<local[]>>; local: local;}) => {
    const getAllLocals = async () => {
        return new Promise<local[]>((resolve, reject) => {
        localApi
            .get(`/api/locals`)
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


    function deleteLocal(): void {
      localApi
        .delete(
          `/api/locals/${local.id}`,
        )
        .then((response) => {
          if (response.status === 200) {
            getAllLocals().then((data) => {
              setLocals(data);
            });
          }
        })
        .catch((error) => {
          console.error("error", error);
          ToastHandler.toast("Erreur lors de la suppression du type d'activité", "error");
        });
        ToastHandler.toast(`Le local ${local.name} a été supprimé avec succès`, "success");
    }

    return (
      <div>
        <button className="text-primary" onClick={deleteLocal}>
          <FaTrash />
        </button>
      </div>
    );
};

export default HandleDeleteLocal;
