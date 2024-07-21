import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import { FaTrash } from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import { MaterialModel } from "@/types/MaterialModel";
import {Material} from "@/types/Material";

const HandleDeleteMaterialModel = ({materials, setMaterials, materialToDelete}: {materials: Material[]; setMaterials: React.Dispatch<React.SetStateAction<Material[]>>; materialToDelete: Material;}) => {

    const getAllMaterial = async () => {
        return new Promise<Material[]>((resolve, reject) => {
        localApi
            .get(`/api/materials`)
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

    function deleteMaterial(): void {
        localApi
            .delete(`/api/materials/${materialToDelete.serialNumber}`)
            .then((response) => {
                if (response.status === 200) {
                    ToastHandler.toast("Le matériel a été supprimé avec succès", "success");
                    getAllMaterial().then((data) => {
                        setMaterials(data);
                    });
                }
                else{
                    ToastHandler.toast(response.data.message, "error");
                }
            })
            .catch((error) => {
                console.error("error", error);
                ToastHandler.toast("Erreur lors de la suppression du matériel", "error");
            });

    }

    return (
      <div>
        <button className="text-primary" onClick={deleteMaterial}>
          <FaTrash />
        </button>
      </div>
    );
};

export default HandleDeleteMaterialModel;
