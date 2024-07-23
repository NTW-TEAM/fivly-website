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
import { RolePermission, TreeNode } from '@/types/TreeNode';
import { accessToText } from '@/tools/AccessToText';
import localApi from '@/services/localAxiosApi';
import ToastHandler from '@/tools/ToastHandler';
import {ACCESS_HERITE, ACCESS_NONE, ACCESS_READ_WRITE} from '@/constant/access';
import { Roles } from '@/types/roles';
import { Members } from '@/types/members';

interface PermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: TreeNode;
    refreshFolderContents?: () => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({
    isOpen,
    onClose,
    item,
    refreshFolderContents = () => undefined,
}) => {
    const [search, setSearch] = useState('');
    const [userPermissions, setUserPermissions] = useState(item.userPermissions);
    const [searchResults, setSearchResults] = useState<Members[]>([]);
    const [roles, setRoles] = useState<Roles[]>([]);
    const [rolePermissions, setRolePermissions] = useState<RolePermission[]>(item.rolePermissions);
    const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());

    useEffect(() => {
        setUserPermissions(item.userPermissions);
        setRolePermissions(item.rolePermissions);
    }, [item.userPermissions, item.rolePermissions]);

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

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await localApi.get('/api/roles');
                setRoles(response.data);

                const currentRolePermissions = item.rolePermissions.map(rolePerm => rolePerm.role.name);
                setSelectedRoles(new Set(currentRolePermissions));
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, [item.rolePermissions]);

    const handlePermissionChange = async (userId: number, access: number) => {
        try {
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

    const handleRolePermissionChange = async (roleId: string, access: number) => {
        try {
            await localApi.post('/api/ged/permission', {
                path: item.path,
                roleId,
                access,
            });
            ToastHandler.toast('Permission de rôle modifiée avec succès', 'success');
            refreshFolderContents();
        } catch (error) {
            console.error('Error updating role permission:', error);
            ToastHandler.toast("Erreur lors de la modification de la permission du rôle", 'error');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalContent>
                <ModalHeader>Partager &quot;{item.name}&quot;</ModalHeader>
                <ModalBody>
                    <div className="relative">
                        <Input
                            label="Ajouter des personnes"
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
                        {userPermissions.length > 0 ? (
                            <ScrollShadow className="w-full h-[200px] overflow-y-auto">
                                {userPermissions.map((permissions) => (
                                    <div key={permissions.user.email} className="flex items-center gap-2 py-2">
                                        <div className="rounded-full h-8 w-8 flex items-center justify-center bg-green-500 text-white">
                                            {permissions.user.firstName.charAt(0)}
                                        </div>
                                        <div className="flex flex-col flex-grow">
                                            <span className="font-semibold">{permissions.user.firstName}</span>
                                            <span className="text-sm text-gray-600">{permissions.user.email}</span>
                                        </div>
                                        <div className="ml-auto text-sm text-gray-600">
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <p className="w-full cursor-pointer mx-4">{accessToText(permissions.access)}</p>
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
                        ) : (
                            <ScrollShadow className="w-full h-[200px] flex items-center grid justify-items-center">
                                <p>Aucun utilisateur avec des accès particulier.</p>
                            </ScrollShadow>
                        )}
                    </div>
                    <div className="mt-4">
                        <p className="font-semibold">Accès par rôle</p>
                        <ScrollShadow className="w-full h-[125px] overflow-y-auto">
                            {roles.map((role) => {
                                const rolePermission = rolePermissions.find(rp => rp.role.name === role.name);
                                return (
                                    <div key={role.name} className="flex items-center gap-2 py-2">
                                        <div className="flex flex-col flex-grow">
                                            <span className="font-semibold">{role.name}</span>
                                        </div>
                                        <div className="ml-auto text-sm text-gray-600">
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <p className="w-full cursor-pointer mx-4">{accessToText(rolePermission ? rolePermission.access : -1)}</p>
                                                </DropdownTrigger>
                                                <DropdownMenu
                                                    aria-label="Role Access"
                                                    color="primary"
                                                    variant="flat"
                                                    onAction={(key) => handleRolePermissionChange(role.name, parseInt(key as string))}
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
                                );
                            })}
                        </ScrollShadow>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onPress={onClose}>
                        OK
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PermissionModal;
