import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import {FaPen} from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import {MaterialModel} from "@/types/MaterialModel";

const HandleEditMaterielModel = ({materialModels, setMaterialModels, materialModelToEdit}: {materialModels: MaterialModel[]; setMaterialModels: React.Dispatch<React.SetStateAction<MaterialModel[]>>; materialModelToEdit: MaterialModel;}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const model = formData.get("model") as string;
        const image = formData.get("image") as string;

        const body = {
            model: model,
            image: image,
        };

        await localApi
            .put(`/api/materials/model/${materialModelToEdit.name}`, body)
            .then(async (response) => {
                if (response.data.statusCode === 200) {
                    getAllMaterialModel().then((data) => {
                        setMaterialModels(data);
                    });
                    ToastHandler.toast("Le model de matériel a été modifié avec succès", "success");
                }
                else {
                    ToastHandler.toast(response.data, "error");
                }
            })
            .catch((error) => {
                ToastHandler.toast("Erreur lors de la modification du model de matériel", "error");
                console.error("error", error);
            })
            .finally(() => {
                onOpenChange();
            });
    }
   
    return (
        <div>
            <button onClick={onOpen} ><FaPen /></button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <ModalContent>
                    <ModalHeader>
                        Modifier {materialModelToEdit.name}
                    </ModalHeader>
                    <ModalBody>
                        <Input
                        label="Model"
                        type="text"
                        name="model"
                        defaultValue={materialModelToEdit.model}
                        isRequired
                        />
                        <Input
                        label="Image"
                        type="text"
                        name="image"
                        defaultValue={materialModelToEdit.image}
                        isRequired
                        />
                    </ModalBody>    
                    <ModalFooter>
                    <Button
                        color="danger"
                        variant="light"
                        onPress={() => onOpenChange()}
                    >
                        Fermer
                    </Button>
                    <Button color="success" variant="light" type="submit">
                        Enregistrer
                    </Button>
                    </ModalFooter>
                </ModalContent>
                </form>
            </Modal>
        </div>
    );
};

export default HandleEditMaterielModel;
