import React from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import ToastHandler from "@/tools/ToastHandler";
import localApi from "@/services/localAxiosApi";
import { Vote } from "@/types/Vote";
import {MdHowToVote} from "react-icons/md";

const VoteForSession = ({
                            userId,
                            sessionId,
                            assemblyId,
                            setVotes,
                        }: {
    userId: number;
    sessionId: number;
    assemblyId: string;
    setVotes: React.Dispatch<React.SetStateAction<Vote[]>>;
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const getAllVotes = async (id: string): Promise<Vote[]> => {
        return new Promise<Vote[]>((resolve, reject) => {
            localApi
                .get(`/api/assemblies/${id}/vote-session`)
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data.data);
                    } else {
                        reject(new Error("Failed to fetch votes"));
                    }
                })
                .catch((error) => {
                    console.error("error", error);
                    reject(new Error("Failed to fetch votes"));
                });
        });
    };

    const handleVote = async (isFor: boolean) => {
        const body = {
            userId,
            for: isFor,
        };

        await localApi
            .post(`/api/assemblies/${assemblyId}/vote-session/${sessionId}/votes`, body)
            .then(async (response) => {
                if (response.data.statusCode === 201) {
                    getAllVotes(assemblyId).then((data) => {
                        setVotes(data);
                    });
                    ToastHandler.toast("Vote envoyé avec succées", "success");
                } else {
                    ToastHandler.toast(response.data.data, "error");
                }
            })
            .catch((error) => {
                ToastHandler.toast("Erreur lors de l'envoie de votre vote. La session est peux-être terminé!", "error");
                console.error("error", error);
            })
            .finally(() => {
                onOpenChange();
            });
    };

    return (
        <div>
            <button onClick={onOpen}>
                <MdHowToVote />
            </button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <ModalContent>
                    <ModalHeader>Vote</ModalHeader>
                    <ModalBody>
                        <p>Êtes-vous pour ou contre cette proposition ?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="success"
                            variant="light"
                            onPress={() => handleVote(true)}
                        >
                            Pour
                        </Button>
                        <Button
                            color="danger"
                            variant="light"
                            onPress={() => handleVote(false)}
                        >
                            Contre
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default VoteForSession;
