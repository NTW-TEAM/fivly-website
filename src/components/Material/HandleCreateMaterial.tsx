import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import localApi from "@/services/localAxiosApi";
import { Material } from "@/types/Material";
import { MaterialModel } from "@/types/MaterialModel";

const HandleCreateMaterial = ({materials, setMaterials}: {materials: Material[]; setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [materialModels, setMaterialModels] = React.useState<MaterialModel[]>([]);

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

    React.useEffect(() => {
        getAllMaterialModel().then((data) => {
            setMaterialModels(data);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const materialModelId = formData.get("materialModelId") as string;

        const body = {
            materialModelId: materialModelId,
        };

        await localApi
            .post(`/api/materials`, body)
            .then(async (response) => {
                if (response.data.statusCode === 201) {
                    getAllMaterial().then((data) => {
                        setMaterials(data);
                    });
                    ToastHandler.toast("Matériel ajouté avec succès", "success");
                }
                else {
                    ToastHandler.toast(response.data, "error");
                }
            })
            .catch((error) => {
                ToastHandler.toast("Erreur lors de l'ajout du matériel", "error");
                console.error("error", error);
            })
            .finally(() => {
                onOpenChange();
            });

    }
   
    return (
        <div>
            <Button onClick={onOpen} color="primary">
                Ajouter d&apos;un matériel
            </Button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <ModalContent>
                    <ModalHeader>
                        Ajout d&apos;un matériel
                    </ModalHeader>
                    <ModalBody>
                        <Select name="materialModelId" placeholder="Modèle de matériel" required label="Modèle de matériel">
                            {materialModels.map((materialModel) => (
                                <SelectItem key={materialModel.name} value={materialModel.name}>
                                    {materialModel.name} ({materialModel.model})
                                </SelectItem>
                            ))}
                        </Select>
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

export default HandleCreateMaterial;
function uuidv4() {
    throw new Error("Function not implemented.");
}

