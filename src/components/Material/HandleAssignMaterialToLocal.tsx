import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import localApi from "@/services/localAxiosApi";
import { Material } from "@/types/Material";
import { local } from "@/types/local";
import {FaPen} from "react-icons/fa";
import {MdAddHome} from "react-icons/md";

interface HandleAssignMaterialProps {
    material: Material;
    setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
}

const HandleAssignMaterialToLocal: React.FC<HandleAssignMaterialProps> = ({ material, setMaterials }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [locals, setLocals] = React.useState<local[]>([]);
    const [selectedLocal, setSelectedLocal] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchLocals = async () => {
            try {
                const response = await localApi.get('/api/locals');
                setLocals(response.data);
            } catch (error) {
                ToastHandler.toast("Erreur lors de la récupération des locaux", "error");
                console.error("error", error);
            }
        };

        fetchLocals();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedLocal) {
            ToastHandler.toast("Veuillez sélectionner un local", "error");
            return;
        }

        const body = {
            localId: selectedLocal,
        };

        try {
            const response = await localApi.post(`/api/materials/${material.serialNumber}/local/${selectedLocal}`, body);
            if (response.data.statusCode === 201) {
                const materialsResponse = await localApi.get('/api/materials');
                setMaterials(materialsResponse.data);
                ToastHandler.toast("Le matériel a été assigné avec succès", "success");
                onOpenChange();
            } else {
                ToastHandler.toast(response.data, "error");
            }
        } catch (error) {
            ToastHandler.toast("Erreur lors de l'assignation du matériel", "error");
            console.error("error", error);
        }
    };

    return (
        <div>
            <button onClick={onOpen}><MdAddHome  /></button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <ModalContent>
                        <ModalHeader>
                            Assigner Matériel à un Local
                        </ModalHeader>
                        <ModalBody>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="flat">{selectedLocal ? locals.find(local => local.id === parseInt(selectedLocal))?.name : "Sélectionner un local"}</Button>
                                </DropdownTrigger>
                                <DropdownMenu onAction={key => setSelectedLocal(key as string)}>
                                    {locals.map(local => (
                                        <DropdownItem key={local.id}>{local.name}</DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
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
                                Assigner
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </div>
    );
};

export default HandleAssignMaterialToLocal;
