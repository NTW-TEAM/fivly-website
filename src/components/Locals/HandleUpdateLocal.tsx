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
import localApi from "@/services/localAxiosApi";
import { local } from "@/types/local";
import { localCreateDto } from "@/types/localCreateDto";
import { FaEdit } from "react-icons/fa";

const HandleUpdateLocal = ({locals, setLocals, local}: {locals: local[]; setLocals: React.Dispatch<React.SetStateAction<local[]>>; local: local;}) => {

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
            .patch(`/api/locals/${local.id}`, JSON.stringify(localToCreate))
            .then(async (response) => {
                if (response.data.statusCode === 204) {
                    const data = await getAllLocals();
                    setLocals(data);
                }
                else {
                    ToastHandler.toast(response.data, "error");
                }
            })
            .catch((error) => {
                ToastHandler.toast("Erreur lors de la modification du local", "error");
                console.error("error", error);
            })
            .finally(() => {
                onOpenChange();
            });
            ToastHandler.toast("Local modifié avec succès", "success");
    }
   
    return (
        <div>
            <button className="text-primary" onClick={onOpen}>
                <FaEdit />
            </button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <ModalContent>
                    <ModalHeader>
                        Modifier {local.name}
                    </ModalHeader>
                    <ModalBody>
                        <Input
                        label="Name"
                        type="text"
                        name="name"
                        defaultValue={local.name}
                        isRequired
                        />
                        <Input
                        label="Number and street"
                        type="text"
                        name="numberAndStreet"
                        defaultValue={local.numberAndStreet}
                        isRequired
                        />
                        <Input
                        label="Postal code"
                        type="text"
                        name="postalCode"
                        defaultValue={local.postalCode}
                        isRequired
                        />
                        <Input
                        label="City"
                        type="text"
                        name="city"
                        defaultValue={local.city}
                        isRequired
                        />
                        <Input
                        label="Country"
                        type="text"
                        name="country"
                        defaultValue={local.country}
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

export default HandleUpdateLocal;
