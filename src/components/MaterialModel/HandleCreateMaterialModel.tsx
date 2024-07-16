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
import localApi from "@/services/localAxiosApi";
import {MaterialModel} from "@/types/MaterialModel";

const HandleCreateMaterialModel = ({materialModels, setMaterialModels}: {materialModels: MaterialModel[]; setMaterialModels: React.Dispatch<React.SetStateAction<MaterialModel[]>>;}) => {
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


    React.useEffect(() => {
        getAllMaterialModel().then((data) => {
            setMaterialModels(data);
        });
    }, [setMaterialModels]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name") as string;
        const model = formData.get("model") as string;
        const image = formData.get("image") as string;

        const body = {
            name: name,
            model: model,
            image: image,
        };

        await localApi
            .post(`/api/materials/model/create`, body)
            .then(async (response) => {
                if (response.data.statusCode === 201) {
                    getAllMaterialModel().then((data) => {
                        setMaterialModels(data);
                    });
                    ToastHandler.toast("Rôle ajouté avec succès", "success");
                }
                else {
                    ToastHandler.toast(response.data, "error");
                }
            })
            .catch((error) => {
                ToastHandler.toast("Erreur lors de l'ajout du rôle", "error");
                console.error("error", error);
            })
            .finally(() => {
                onOpenChange();
            });

    }
   
    return (
        <div>
            <Button onClick={onOpen} color="primary">
                Ajouter un model de matériel
            </Button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <ModalContent>
                    <ModalHeader>
                        Ajouter un model de matériel
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            name="name"
                            placeholder="Nom"
                            label="Nom"
                            required
                        />
                        <Input
                            name="model"
                            placeholder="Modèle"
                            label="Modèle"
                            required
                        />
                        <Input
                            name="image"
                            placeholder="Image"
                            label="Image"
                            required
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
                        Ajouter
                    </Button>
                    </ModalFooter>
                </ModalContent>
                </form>
            </Modal>
        </div>
    );
};

export default HandleCreateMaterialModel;
