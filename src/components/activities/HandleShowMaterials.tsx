"use client";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import React from "react";
import {Activity, MaterialSerialNumber} from "@/types/activity";
import localApi from "@/services/localAxiosApi";
import {Material} from "@/types/Material";
import ToastHandler from "@/tools/ToastHandler";
import {FaTools} from "react-icons/fa";

const HandleShowMaterials = ({ materials, activityId, setActivities }: { materials: MaterialSerialNumber[], activityId: string, setActivities: React.Dispatch<React.SetStateAction<any[]>> }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [materialsInfo, setMaterials] = React.useState<Material[]>([]);
    const [selectedMaterials, setSelectedMaterials] = React.useState<Set<string>>(new Set());

    React.useEffect(() => {
        const getAllMaterials = async () => {
            const response = await localApi.get("/api/materials");
            return response.data;
        };

        getAllMaterials().then((data) => {
            setMaterials(data);
        });
    }, []);

    const getAllActivities = async () => {
        return new Promise<Activity[]>((resolve, reject) => {
            localApi
                .post(`/api/activities/search`, {})
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

    const handleUnassign = async () => {
        try {
            console.log(activityId);

            const unassignPromises = Array.from(selectedMaterials).map((materialId) =>
                localApi.delete(`/api/materials/${materialId}/unassign/${activityId}`)
            );
            await Promise.all(unassignPromises);
            getAllActivities().then((data) => {
                setActivities(data);
            });

            ToastHandler.toast("Matériels désassignés avec succès", "success");

            onOpenChange();
        } catch (error) {
            ToastHandler.toast("Erreur lors de la désassignation des matériels", "error");
            console.error("error", error);
        }
    };

    return (
        <div>
            <button onClick={onOpen}>
                <FaTools />
            </button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <ModalContent>
                    <ModalHeader>Liste du matériels</ModalHeader>
                    <ModalBody>
                        {materials.length > 0 ? (
                            <ul>
                                {materials.map((material) => (
                                    <li key={material.serialNumber}>
                                        <input
                                            type="checkbox"
                                            value={material.serialNumber}
                                            className={"mr-2"}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedMaterials(new Set(selectedMaterials).add(material.serialNumber));
                                                } else {
                                                    const newSelectedMaterials = new Set(selectedMaterials);
                                                    newSelectedMaterials.delete(material.serialNumber);
                                                    setSelectedMaterials(newSelectedMaterials);
                                                }
                                            }}
                                        />
                                        {materialsInfo && materialsInfo.map((materialInfo) => {
                                            if (materialInfo.serialNumber === material.serialNumber) {
                                                return materialInfo.materialModel.name;
                                            }
                                        })}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Aucun matériel trouvé</p>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="light"
                            onPress={() => onOpenChange()}
                        >
                            Close
                        </Button>
                        <Button
                            color="warning"
                            variant="light"
                            onPress={handleUnassign}
                        >
                            Désassigner
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default HandleShowMaterials;
