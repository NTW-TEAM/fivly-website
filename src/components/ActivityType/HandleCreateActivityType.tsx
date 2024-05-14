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
import axios from "axios";
import ToastHandler from "@/tools/ToastHandler";
import { ActivityType } from "@/types/activityType";

const HandleCreateActivityType = ({activityTypes, setActivityTypes}: {activityTypes: ActivityType[]; setActivityTypes: React.Dispatch<React.SetStateAction<ActivityType[]>>;}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const activityType: ActivityType = {
          name: formData.get("name") as string,
        };

        await axios
            .post(`http://localhost:3001/api/activity-types/${activityType.name}`)
            .then(async (response) => {
                if (response.data.statusCode === 201) {
                    ToastHandler.toast("Type d'activité ajouté avec succès", "success");
                    setActivityTypes([...activityTypes, activityType]);
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
                Ajouter un type d&apos;activité
            </Button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <ModalContent>
                    <ModalHeader>
                        Ajouter un nouveau type d&apos;activité
                    </ModalHeader>
                    <ModalBody>
                        <Input
                        label="Name"
                        type="text"
                        name="name"
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

export default HandleCreateActivityType;
