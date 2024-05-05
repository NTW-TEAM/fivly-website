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
import React, { useEffect, useState } from "react";
import { Roles } from "@/types/roles";
import { Scopes } from "@/types/scopes";
import axios from "axios";
import ToastHandler from "@/tools/ToastHandler";
import { FaPen } from "react-icons/fa";

const HandleEditRole = ({roles, setRoles, roleToEdit}: {roles: Roles[]; setRoles: React.Dispatch<React.SetStateAction<Roles[]>>; roleToEdit: Roles;}) => {
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

    const getAllRoles = async () => {
        return new Promise<Roles[]>((resolve, reject) => {
        axios
            .get(`http://localhost:3001/api/roles`)
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
            .then(async (response) => {
                if (response.data.statusCode === 201) {

                    setRoles(await getAllRoles());
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
            <button onClick={onOpen} ><FaPen /></button>

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
                        defaultValue={roleToEdit.name}
                        isRequired
                        />
                        <Textarea
                            label="Description"
                            name="description"
                            defaultValue={roleToEdit.description}
                            isRequired
                        />

                        <Select label="Permissions" isRequired selectionMode="multiple" name="scopes" defaultSelectedKeys={roleToEdit.scopes.map(scope => scope.name)}>
                            {scopes.map((scope) => (
                                <SelectItem key={scope.name} value={scope.name}>
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
                        Enregistrer
                    </Button>
                    </ModalFooter>
                </ModalContent>
                </form>
            </Modal>
        </div>
    );
};

export default HandleEditRole;
