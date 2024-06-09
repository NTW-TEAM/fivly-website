import {
  Button,
  Checkbox,
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
import { Assembly } from "@/types/Assembly";

const HandleCreateAssembly = ({assemblies, setAssemblies}: {assemblies: Assembly[]; setAssemblies: React.Dispatch<React.SetStateAction<Assembly[]>>;}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const description = formData.get("description") as string;
        const isGeneral = formData.get("isGeneral") as string;
        const hasStarted = formData.get("hasStarted") as string;
        const datetime = formData.get("datetime") as string;
        const quorum = formData.get("quorum") as string;
        const location = formData.get("location") as string;

        const body = {
            description: description,
            isGeneral: isGeneral,
            hasStarted: hasStarted,
            datetime: datetime,
            quorum: quorum,
            location: location,
        };

        await localApi
            .post(`/api/assemblies`, body)
            .then(async (response) => {
                if (response.data.statusCode === 201) {
                    getAllAssembly().then((data) => {
                        setAssemblies(data);
                    });
                    ToastHandler.toast("L'assemblée a été ajoutée avec succès", "success");
                }
                else {
                    ToastHandler.toast(response.data, "error");
                }
            })
            .catch((error) => {
                ToastHandler.toast("Erreur lors de l'ajout de l'assemblée", "error");
                console.error("error", error);
            })
            .finally(() => {
                onOpenChange();
            });

    }
   
    return (
        <div>
            <Button onClick={onOpen} color="primary">
                Ajouter une assemblée
            </Button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <ModalContent>
                    <ModalHeader>
                        Ajouter une assemblée
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            name="description"
                            label="Description"
                            placeholder="Description"
                            required
                        />
                        <Checkbox
                            name="isGeneral"
                            required
                        />
                        <Input
                            name="hasStarted"
                            label="A commencé"
                            placeholder="A commencé"
                            required
                        />
                        <Input
                            name="datetime"
                            label="Date et heure"
                            placeholder="Date et heure"
                            required
                        />
                        <Input
                            name="quorum"
                            label="Quorum"
                            placeholder="Quorum"
                            required
                        />
                        <Input
                            name="location"
                            label="Lieu"
                            placeholder="Lieu"
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

export default HandleCreateAssembly;
