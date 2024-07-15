import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import {FaTrash} from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import {MaterialModel} from "@/types/MaterialModel";

const HandleDeleteMaterialModel = ({materialModels, setMaterialModels, materialModelsToDelete}: {materialModels: MaterialModel[]; setMaterialModels: React.Dispatch<React.SetStateAction<MaterialModel[]>>; materialModelsToDelete: MaterialModel;}) => {

    const getAllMaterialModel = async () => {
        return new Promise<MaterialModel[]>((resolve, reject) => {
        localApi
            .get(`/api/materials/model/findall`)
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

    function deleteMaterialModel(): void {
        localApi
            .delete(`/api/materials/model/${materialModelsToDelete.name}`)
            .then((response) => {
                if (response.status === 200) {
                    ToastHandler.toast("Le model de matériel a été supprimé avec succès", "success");
                    getAllMaterialModel().then((data) => {
                        setMaterialModels(data);
                    });
                }
            })
            .catch((error) => {
                console.error("error", error);
                ToastHandler.toast("Erreur lors de la suppression du model de matériel", "error");
            });

    }

    return (
      <div>
        <button className="text-primary" onClick={deleteMaterialModel}>
          <FaTrash />
        </button>
      </div>
    );
};

export default HandleDeleteMaterialModel;
