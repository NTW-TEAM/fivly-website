import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure,} from "@nextui-org/react";
import React, {useEffect} from "react";
import localApi from "@/services/localAxiosApi";
import {Vote} from "@/types/Vote";
import {VoteResult} from "@/types/VoteResult";
import {Assembly} from "@/types/Assembly";
import {FaChartBar} from "react-icons/fa";

const SeeVoteResult = ({
                           setVotes,
                           voteToSee,
                           assemblyId,
                       }: {
    setVotes: React.Dispatch<React.SetStateAction<Vote[]>>;
    voteToSee: Vote;
    assemblyId: string;
}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [assembly, setAssembly] = React.useState<Assembly>();
    const [votesResult, setVotesResult] = React.useState<VoteResult | null>(null);


    useEffect(() => {
        const getAssembly = async (id: string): Promise<Assembly> => {
            try {
                const response = await localApi.get(`/api/assemblies/${id}`);
                return response.data.data;
            } catch (error) {
                console.error("Error fetching assembly:", error);
                throw new Error("Failed to fetch assembly");
            }
        };
        const getVotesResult = async (id: string): Promise<VoteResult> => {
            try {
                const response = await localApi.get(
                    `/api/assemblies/${id}/vote-session/${voteToSee.id}/votes`,
                );
                if (response.status === 200) {
                    return response.data.data;
                } else {
                    throw new Error("Failed to fetch votes result");
                }
            } catch (error) {
                console.error("Error fetching votes result:", error);
                throw new Error("Failed to fetch votes result");
            }
        };

        if (assemblyId) {
            getAssembly(assemblyId as string)
                .then((data) => {
                    setAssembly(data);
                })
                .catch((error) => {
                    console.error(error);
                });

            getVotesResult(assemblyId as string)
                .then((data) => {
                    setVotesResult(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }


    },[]);

    return (
        <div>
            <button className="text-primary" onClick={onOpen}>
                <FaChartBar/>
            </button>

            <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
                <ModalContent>
                    <ModalHeader>Résultats du vote</ModalHeader>
                    <ModalBody>
                        <div>
                            {votesResult ? (
                                <div className="space-y-4">
                                    {Object.entries(votesResult).map(([option, count]) => (
                                        <div key={option}>
                                            <div className="flex justify-between">
                                                <span>{option}</span>
                                                <span>{count} / {(assembly?.quorum || 1)} (Quorum) </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                    style={{width: `${(count / (assembly?.quorum || 1)) * 100}%`}}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Chargement des résultats...</p>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => onOpenChange()}>
                            Fermer
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default SeeVoteResult;
