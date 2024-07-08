import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Button,
    ScrollShadow,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import { TreeNode } from '@/types/TreeNode';
import { accessToText } from '@/tools/AccessToText';
import localApi from '@/services/localAxiosApi';
import ToastHandler from '@/tools/ToastHandler';
import { ACCESS_READ_WRITE } from '@/constant/access';

interface PermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: TreeNode;
    refreshFolderContents: () => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({
    isOpen,
    onClose,
    item,
    refreshFolderContents,
}) => {
    const [search, setSearch] = useState('');
    const [accessLevel, setAccessLevel] = useState('Limité');
    const [userPermissions, setUserPermissions] = useState(item.userPermissions);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        setUserPermissions(item.userPermissions);
    }, [item.userPermissions]);

    useEffect(() => {
        if (search) {
            const fetchUsers = async () => {
                try {
                    const response = await localApi.get('/api/users', { params: { query: search } });
                    setSearchResults(response.data);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
            fetchUsers();
        } else {
            setSearchResults([]);
        }
    }, [search]);

    const handlePermissionChange = async (userId: number, access: number) => {
        try {
            console.log('Updating permission:', userId, access, item.path)
            await localApi.post('/api/ged/permission', {
                path: item.path,
                userId,
                access,
            });
            ToastHandler.toast('Permission modifiée avec succès', 'success');
            refreshFolderContents();
        } catch (error) {
            console.error('Error updating permission:', error);
            ToastHandler.toast("Erreur lors de la modification de la permission", 'error');
        }
    };

    const handleUserSelect = async (userId: number) => {
        try {
            await localApi.post('/api/ged/permission', {
                path: item.path,
                userId,
                access: ACCESS_READ_WRITE,
            });
            ToastHandler.toast('Permission ajoutée avec succès', 'success');
            setSearch('');
            setSearchResults([]);
            refreshFolderContents();
            
        } catch (error) {
            console.error('Error adding permission:', error);
            ToastHandler.toast("Erreur lors de l'ajout de la permission", 'error');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalContent>
                <ModalHeader>Partager &quot;{item.name}&quot;</ModalHeader>
                <ModalBody>
                    <div className="relative">
                        <Input
                            label="Ajouter des personnes, des groupes et des événements d'agenda"
                            placeholder=""
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {searchResults.length > 0 && (
                            <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-20 max-h-40 overflow-y-auto">
                                {searchResults.map((user) => (
                                    <div
                                        key={user.id}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleUserSelect(user.id)}
                                    >
                                        {user.firstName}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <p className="font-semibold">Utilisateurs avec accès</p>
                        <ScrollShadow className="w-full h-[200px] overflow-y-auto">
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
                        </ScrollShadow>
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
