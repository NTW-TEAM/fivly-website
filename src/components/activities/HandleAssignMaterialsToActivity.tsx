import { Activity } from "@/types/activity";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    useDisclosure
} from "@nextui-org/react";
import { Material } from "@/types/Material";
import localApi from "@/services/localAxiosApi";
import ToastHandler from "@/tools/ToastHandler";
import React from "react";
import { FaPlus} from "react-icons/fa";

const HandleAssignMaterialsToActivity: React.FC<{ activity: Activity; setActivities: React.Dispatch<React.SetStateAction<Activity[]>> }> = ({ activity, setActivities }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [materials, setMaterials] = React.useState<Material[]>([]);
    const [selectedMaterials, setSelectedMaterials] = React.useState<Set<string>>(new Set());

    React.useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await localApi.get('/api/materials');
                setMaterials(response.data);
            } catch (error) {
                ToastHandler.toast("Erreur lors de la récupération des matériels", "error");
                console.error("error", error);
            }
        };

        fetchMaterials();
    }, []);

    const handleAssign = async () => {
        try {
            const assignPromises = Array.from(selectedMaterials).map((materialId) =>
                localApi.post(`/api/materials/${materialId}/assign/${activity.id}`)
            );
            await Promise.all(assignPromises);

            ToastHandler.toast("Matériels assignés avec succès", "success");

            const activitiesResponse = await localApi.post('/api/activities/search');
            setActivities(activitiesResponse.data);

            onOpenChange();
        } catch (error) {
            ToastHandler.toast("Erreur lors de l'assignation des matériels", "error");
            console.error("error", error);
        }
    };

    const handleUnassign = async () => {
        try {
            const unassignPromises = Array.from(selectedMaterials).map((materialId) =>
                localApi.delete(`/api/materials/${materialId}/unassign/${activity.id}`)
            );
            await Promise.all(unassignPromises);

            ToastHandler.toast("Matériels désassignés avec succès", "success");

            // Refetch activities or materials if necessary
            const activitiesResponse = await localApi.post('/api/activities/search');
            setActivities(activitiesResponse.data);

            onOpenChange();
        } catch (error) {
            ToastHandler.toast("Erreur lors de la désassignation des matériels", "error");
            console.error("error", error);
        }
    };

    const handleSelectChange = (keys: Set<React.Key>) => {
        setSelectedMaterials(new Set(Array.from(keys).map(key => String(key))));
    };

    return (
        <div>
            <button onClick={onOpen}><FaPlus /></button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <ModalContent>
                    <ModalHeader>Assigner Matériels à l&apos;Activité</ModalHeader>
                    <ModalBody>
                        <Select
                            multiple
                            selectedKeys={selectedMaterials}
                            onSelectionChange={(keys) => handleSelectChange(new Set(keys))}
                            placeholder="Sélectionner des matériels"
                        >
                            {materials.map((material) => (
                                <SelectItem key={material.serialNumber} value={material.serialNumber}>
                                    {material.materialModel.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => onOpenChange()}>
                            Fermer
                        </Button>
                        <Button color="success" variant="light" onPress={handleAssign}>
                            Assigner
                        </Button>
                        <Button color="warning" variant="light" onPress={handleUnassign}>
                            Désassigner
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default HandleAssignMaterialsToActivity;
