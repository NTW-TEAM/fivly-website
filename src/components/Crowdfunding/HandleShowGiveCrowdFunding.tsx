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
import {FaEye} from "react-icons/fa";
import {Crowdfunding} from "@/types/Crowdfunding";
import {CrowdfundingGive} from "@/types/CrowdfundingGive";

const HandleShowGiveCrowdFunding = ({ crowdfunding }: { crowdfunding: Crowdfunding }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <Button onClick={onOpen} color={"secondary"}>
                <FaEye/>
            </Button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <ModalContent>
                    <ModalHeader>Liste des dons</ModalHeader>
                    <ModalBody>
                        {crowdfunding.gives.length > 0 ? (
                            <ul>
                                {crowdfunding.gives.map((give: CrowdfundingGive) => (
                                    <li key={give.id}>
                                        {give.id} - {new Date(give.datetime).toLocaleDateString()} : {give.amount} €
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Aucun don</p>
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

export default HandleShowGiveCrowdFunding;
