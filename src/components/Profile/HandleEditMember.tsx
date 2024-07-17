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
import { FaPen } from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import { Members } from "@/types/members";

interface HandleEditMemberProps {
    userInfo: Members;
}

const HandleEditMember: React.FC<HandleEditMemberProps> = ({ userInfo}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        const numberAndStreet = formData.get("numberAndStreet") as string;
        const postalCode = formData.get("postalCode") as string;
        const city = formData.get("city") as string;
        const country = formData.get("country") as string;

        const body = {
            firstName,
            lastName,
            phoneNumber,
            numberAndStreet,
            postalCode,
            city,
            country,
        };

        await localApi
            .patch(`/api/users/${userInfo.id}`, body)
            .then(async (response) => {
                if (response.data.statusCode === 200) {
                    ToastHandler.toast("Le profil a été modifié avec succès", "success");
                } else {
                    ToastHandler.toast(response.data, "error");
                }
            })
            .catch((error) => {
                ToastHandler.toast("Erreur lors de la modification du profil", "error");
                console.error("error", error);
            })
            .finally(() => {
                onOpenChange();
            });
    };

    return (
        <div>
            <button onClick={onOpen}><FaPen /></button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <ModalContent>
                        <ModalHeader>
                            Modifier le profil
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                label="Prénom"
                                type="text"
                                name="firstName"
                                defaultValue={userInfo.firstName}
                                isRequired
                            />
                            <Input
                                label="Nom"
                                type="text"
                                name="lastName"
                                defaultValue={userInfo.lastName}
                                isRequired
                            />
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                defaultValue={userInfo.email}
                                isRequired
                                disabled
                            />
                            <Input
                                label="Numéro de téléphone"
                                type="text"
                                name="phoneNumber"
                                defaultValue={userInfo.phoneNumber}
                                isRequired
                            />
                            <Input
                                label="Adresse"
                                type="text"
                                name="numberAndStreet"
                                defaultValue={userInfo.numberAndStreet}
                                isRequired
                            />
                            <Input
                                label="Code postal"
                                type="text"
                                name="postalCode"
                                defaultValue={userInfo.postalCode}
                                isRequired
                            />
                            <Input
                                label="Ville"
                                type="text"
                                name="city"
                                defaultValue={userInfo.city}
                                isRequired
                            />
                            <Input
                                label="Pays"
                                type="text"
                                name="country"
                                defaultValue={userInfo.country}
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

export default HandleEditMember;
