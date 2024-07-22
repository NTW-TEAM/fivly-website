import {
    Button,
    Select,
    SelectItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Roles } from "@/types/roles";
import { Scopes } from "@/types/Scopes";
import ToastHandler from "@/tools/ToastHandler";
import { FaPen } from "react-icons/fa";
import localApi from "@/services/localAxiosApi";

const HandleEditRole = ({
    roles,
    setRoles,
    roleToEdit
}: {
    roles: Roles[];
    setRoles: React.Dispatch<React.SetStateAction<Roles[]>>;
    roleToEdit: Roles;
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [scopes, setScopes] = useState<Scopes[]>([]);

    const getAllScopes = async () => {
        try {
            const response = await localApi.get(`/api/scopes`);
            if (response.status === 200) {
                setScopes(response.data);
            }
        } catch (error) {
            console.error("error", error);
        }
    };

    const getAllRoles = async () => {
        try {
            const response = await localApi.get(`/api/roles`);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error("error", error);
            return [];
        }
    };

    useEffect(() => {
        getAllScopes();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const scopes = formData.getAll("scopes") as string[];

        const body = {
            scopes: scopes,
        };

        try {
            const response = await localApi.put(`/api/roles/${roleToEdit.name}/scopes`, body);
            if (response.status === 200) {
                const updatedRoles = await getAllRoles();
                setRoles(updatedRoles);
                ToastHandler.toast("Rôle modifié avec succès", "success");
            } else {
                ToastHandler.toast(response.data.message || "Erreur lors de la modification du rôle", "error");
            }
        } catch (error) {
            ToastHandler.toast("Erreur lors de la modification du rôle", "error");
            console.error("error", error);
        } finally {
            onOpenChange();
        }
    };

    return (
        <div>
            <button onClick={onOpen}><FaPen /></button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <ModalContent>
                        <ModalHeader>
                            Modifier {roleToEdit.name}
                        </ModalHeader>
                        <ModalBody>
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
