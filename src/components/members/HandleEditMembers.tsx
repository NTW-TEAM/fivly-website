import ToastHandler from "@/tools/ToastHandler";
import {Members} from "@/types/members";
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
import {FaPen} from "react-icons/fa";
import RoleMembersDisplay from "./DisplayRoleMembers";
import ScopesMembersDisplay from "./DisplayScopesMembers";
import axios from "axios";
import React, {useState} from "react";

const HandleEditMembers = ({
                               user,
                               usersState,
                               setUsersState,
                           }: {
    user: Members;
    usersState: Members[];
    setUsersState: React.Dispatch<React.SetStateAction<Members[]>>;
}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [userState, setUserState] = useState(user);
    const [initialUserState] = useState({...user});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const changes: Partial<Members> = Object.keys(userState).reduce((acc, key) => {
            if (userState[key as keyof Members] !== initialUserState[key as keyof Members]) {
                acc[key as keyof Members] = userState[key as keyof Members];
            }
            return acc;
        }, {});

        if (Object.keys(changes).length > 0) {
            axios
                .patch(`/api/users/${user.id}`, changes)
                .then((res) => {
                    if (res.status !== 200) {
                        ToastHandler.toast("Erreur lors de la modification du membre", "error");
                        return;
                    }

                    setUsersState(prevUsers =>
                        prevUsers.map(u => u.id === user.id ? {...u, ...changes} : u)
                    );

                    ToastHandler.toast("Membre modifié avec succès", "success");
                })
                .catch((error) => {
                    ToastHandler.toast(
                        `Erreur: ${error.response?.data?.message || error.response?.statusText || "Erreur inconnue"}`,
                        "error",
                    );
                });
        } else {
            ToastHandler.toast("Aucun changement", "info");
        }

        onOpenChange();
    };

    return (
        <div>
            <button onClick={onOpen}><FaPen/></button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <ModalContent>
                        <ModalHeader>Modifier {userState.firstName} {userState.lastName}</ModalHeader>
                        <ModalBody>
                            <div className="flex gap-2">
                                <Input
                                    label="First Name"
                                    defaultValue={userState?.firstName}
                                    type="text"
                                    isRequired
                                    onChange={(e) => (userState.firstName = e.target.value)}
                                />
                                <Input
                                    label="Last Name"
                                    defaultValue={userState?.lastName}
                                    type="text"
                                    isRequired
                                    onChange={(e) => (userState.lastName = e.target.value)}
                                />
                            </div>
                            <Input
                                label="Email"
                                defaultValue={userState?.email}
                                type="email"
                                isRequired
                                onChange={(e) => (userState.email = e.target.value)}
                            />
                            <Input
                                label="Phone"
                                defaultValue={userState?.phoneNumber}
                                type="tel"
                                isRequired
                                onChange={(e) => (userState.phoneNumber = e.target.value)}
                            />

                            <Input
                                label="Numéro de rue"
                                defaultValue={userState?.numberAndStreet}
                                type="text"
                                isRequired
                                onChange={(e) =>
                                    (userState.numberAndStreet = e.target.value)
                                }
                            />
                            <div className="flex gap-2">
                                <Input
                                    label="Code postal"
                                    defaultValue={userState?.postalCode}
                                    type="text"
                                    isRequired
                                    onChange={(e) => (userState.postalCode = e.target.value)}
                                />
                                <Input
                                    label="Ville"
                                    defaultValue={userState?.city}
                                    type="text"
                                    isRequired
                                    onChange={(e) => (userState.city = e.target.value)}
                                />
                                <Input
                                    label="Pays"
                                    defaultValue={userState?.country}
                                    type="text"
                                    isRequired
                                    onChange={(e) => (userState.country = e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Rôles</label>
                                <div className="flex items-center gap-1">
                                    <RoleMembersDisplay rolesData={userState.roles}/>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label>Permissions</label>
                                <div className="flex items-center gap-1">
                                    <ScopesMembersDisplay scopesData={userState.scopes}/>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => onOpenChange()}>
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

export default HandleEditMembers;
