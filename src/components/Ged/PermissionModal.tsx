import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    ScrollShadow,
} from '@nextui-org/react';
import { TreeNode } from '@/types/TreeNode';
import { accessToText } from '@/tools/AccessToText';
import localApi from '@/services/localAxiosApi';
import ToastHandler from '@/tools/ToastHandler';

interface PermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: TreeNode;
}

const PermissionModal: React.FC<PermissionModalProps> = ({
    isOpen,
    onClose,
    item,
}) => {
    const [search, setSearch] = useState('');
    const [accessLevel, setAccessLevel] = useState('Limité');
    const [userPermissions, setUserPermissions] = useState(item.userPermissions);

    useEffect(() => {
        setUserPermissions(item.userPermissions);
    }, [item.userPermissions]);

    const handlePermissionChange = async (userId: number, access: number) => {
        try {
            await localApi.post('/api/ged/permission', {
                path: item.path,
                userId,
                access,
            });
            ToastHandler.toast('Permission modifiée avec succès', 'success');

            setUserPermissions((prevPermissions) =>
                prevPermissions.map((permission) =>
                    permission.user.id === userId ? { ...permission, access } : permission
                )
            );
        } catch (error) {
            console.error('Error updating permission:', error);
            ToastHandler.toast("Erreur lors de la modification de la permission", 'error');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalContent>
                <ModalHeader>Partager &quot;{item.name}&quot;</ModalHeader>
                <ModalBody>
                    <Input
                        label="Ajouter des personnes, des groupes et des événements d'agenda"
                        placeholder=""
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="mt-4">
                        <p className="font-semibold">Utilisateurs avec accès</p>
                        <ScrollShadow className="w-full h-[200px]">
                            {userPermissions && userPermissions.map((permissions) => (
                                <div key={permissions.user.email} className="flex items-center gap-2 py-2">
                                    <div className="rounded-full h-8 w-8 flex items-center justify-center bg-green-500 text-white">
                                        {permissions.user.firstName.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{permissions.user.firstName}</span>
                                        <span className="text-sm text-gray-600">{permissions.user.email}</span>
                                    </div>
                                    <div className="ml-auto text-sm text-gray-600">
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button className="w-full">{accessToText(permissions.access)}</Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="User Access"
                                                color="primary"
                                                variant="flat"
                                                onAction={(key) => handlePermissionChange(permissions.user.id, parseInt(key as string))}
                                            >
                                                <DropdownItem key="-1">Hérite</DropdownItem>
                                                <DropdownItem key="0">Aucun</DropdownItem>
                                                <DropdownItem key="1">Lecture</DropdownItem>
                                                <DropdownItem key="2">Lecture/Écriture</DropdownItem>
                                                <DropdownItem key="3">Gérer</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                            ))}
                        </ScrollShadow >
                    </div>
                    <div className="mt-4">
                        <p className="font-semibold">Accès général</p>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button className="w-full">{accessLevel}</Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="General Access"
                                color="primary"
                                variant="flat"
                                onAction={(key) => setAccessLevel(key as string)}
                            >
                                <DropdownItem key="Limité">Limité</DropdownItem>
                                <DropdownItem key="Public">Public</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="light">
                        Copier le lien
                    </Button>
                    <Button color="primary" onPress={onClose}>
                        OK
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PermissionModal;
