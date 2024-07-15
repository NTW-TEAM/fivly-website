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
import {local} from "@/types/local";
import {localCreateDto} from "@/types/localCreateDto";

const HandleCreateLocal = ({locals, setLocals}: {locals: local[]; setLocals: React.Dispatch<React.SetStateAction<local[]>>;}) => {

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

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const localToCreate: localCreateDto = {
            name: formData.get("name") as string,
            numberAndStreet: formData.get("numberAndStreet") as string,
            postalCode: formData.get("postalCode") as string,
            city: formData.get("city") as string,
            country: formData.get("country") as string,
        };

        await localApi
            .post(`/api/locals`, JSON.stringify(localToCreate))
            .then(async (response) => {
                if (response.data.statusCode === 201) {
                    const data = await getAllLocals();
                    setLocals(data);
                }
                else {
                    ToastHandler.toast(response.data, "error");
                }
            })
            .catch((error) => {
                ToastHandler.toast("Erreur lors de l'ajout du local", "error");
                console.error("error", error);
            })
            .finally(() => {
                onOpenChange();
            });
            ToastHandler.toast("Local ajouté avec succès", "success");
    }
   
    return (
        <div>
            <Button onClick={onOpen} color="primary">
                Ajouter un local
            </Button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <ModalContent>
                    <ModalHeader>
                        Ajouter un nouveau local
                    </ModalHeader>
                    <ModalBody>
                        <Input
                        label="Name"
                        type="text"
                        name="name"
                        defaultValue=""
                        isRequired
                        />
                        <Input
                        label="Number and street"
                        type="text"
                        name="numberAndStreet"
                        defaultValue=""
                        isRequired
                        />
                        <Input
                        label="Postal code"
                        type="text"
                        name="postalCode"
                        defaultValue=""
                        isRequired
                        />
                        <Input
                        label="City"
                        type="text"
                        name="city"
                        defaultValue=""
                        isRequired
                        />
                        <Input
                        label="Country"
                        type="text"
                        name="country"
                        defaultValue=""
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
                        Ajouter
                    </Button>
                    </ModalFooter>
                </ModalContent>
                </form>
            </Modal>
        </div>
    );
};

export default HandleCreateLocal;
