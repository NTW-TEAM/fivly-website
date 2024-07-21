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
import {FaEye} from "react-icons/fa";

const HandleShowParticipants = ({ participants }: { participants: Members[] }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <button onClick={onOpen}>
                <FaEye/>
            </button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <ModalContent>
                    <ModalHeader>Participants List</ModalHeader>
                    <ModalBody>
                        {participants.length > 0 ? (
                            <ul>
                                {participants.map((participant) => (
                                    <li key={participant.id}>
                                        {participant.firstName} {participant.lastName} - {participant.email}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No participants found</p>
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

export default HandleShowParticipants;
