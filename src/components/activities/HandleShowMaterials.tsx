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
import {Members} from "@/types/members";
import {FaEye, FaTools} from "react-icons/fa";
import {MaterialSerialNumber} from "@/types/activity";
import localApi from "@/services/localAxiosApi";
import {Material} from "@/types/Material";

const HandleShowMaterials = ({ materials }: { materials: MaterialSerialNumber[] }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [materialsInfo, setMaterials] = React.useState<Material[]>([]);

    React.useEffect(() => {
        const getAllMaterials = async () => {
            const response = await localApi.get("/materials");
            return response.data;
        };

        getAllMaterials().then((data) => {
            setMaterials(data);
        });
    }, []);

    return (
        <div>
            <button onClick={onOpen}>
                <FaTools />
            </button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <ModalContent>
                    <ModalHeader>Participants List</ModalHeader>
                    <ModalBody>
                        {materials.length > 0 ? (
                            <ul>
                                {materials.map((material) => (
                                    <li key={material.serialNumber}>
                                        {materialsInfo.map((materialInfo) => {
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
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default HandleShowMaterials;
