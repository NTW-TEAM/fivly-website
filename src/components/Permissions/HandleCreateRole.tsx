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
import { Roles } from "@/types/roles";
import { Scopes } from "@/types/scopes";
import axios from "axios";
import ToastHandler from "@/tools/ToastHandler";

const HandleCreateRole = ({roles, setRoles}: {roles: Roles[]; setRoles: React.Dispatch<React.SetStateAction<Roles[]>>;}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [scopes, setScopes] = React.useState<Scopes[]>([]);

    const getAllScopes = async () => {
        axios
            .get(`http://localhost:3001/api/scopes`)
            .then((response) => {
                if (response.status === 200) {
                    setScopes(response.data);
                }
            })
            .catch((error) => {
                console.error("error", error);
            });
    };

    React.useEffect(() => {
        getAllScopes();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const scopes = formData.getAll("scopes") as string[];

        const body = {
            name: name,
            description: description,
            scopes: scopes,
        };

        await axios
            .post(`http://localhost:3001/api/roles`, 
            body)
            .then((response) => {
                if (response.data.statusCode === 201) {
                    setRoles((prevRoles) => [...prevRoles, response.data.data]);

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
                Ajouter un rôle
            </Button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <ModalContent>
                    <ModalHeader>
                        Ajouter un nouveau rôle
                    </ModalHeader>
                    <ModalBody>
                        <Input
                        label="Name"
                        type="text"
                        name="name"
                        isRequired
                        />
                        <Textarea
                            label="Description"
                            name="description"
                            isRequired
                        />

                        <Select label="Permissions" isRequired selectionMode="multiple" name="scopes">
                            {scopes.map((scope) => (
                                <SelectItem key={scope.name} value={scope.description}>
                                    {scope.description}
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

export default HandleCreateRole;
