import React, {useState} from "react";
import { FaUsers } from "react-icons/fa";
import {Assembly} from "@/types/Assembly";
import {Button} from "@nextui-org/react";
import localApi from "@/services/localAxiosApi";
import ToastHandler from "@/tools/ToastHandler";
import axios from "axios";
import {UserJwt} from "@/types/UserJwt";

interface AssemblyCardProps {
    assembly: Assembly;
    description: string;
    datetime: string;
    location: string;
    quorum: number;
    user: UserJwt;
}

const AssemblyCard: React.FC<AssemblyCardProps> = ({
    assembly,
                                                       description,
                                                       datetime,
                                                       location,
                                                       quorum,
                                                       user,
                                                   }) => {

    //check if the user is already in the participants list of the assembly
    const isUserParticipant = assembly.participants.some(participant => participant.id === user.id);

    const [isSubscribed, setIsSubscribed] = useState(isUserParticipant);

    const handleSubscribe = () => {
        localApi.post(`/api/assemblies/${assembly.id}/participate/${user.id}`)
            .then(response => {
                setIsSubscribed(true);
                ToastHandler.toast("Inscription réussie", "success");
            })
            .catch(error => {
                console.error("There was an error subscribing:", error);
            });
    };

    const handleUnsubscribe = () => {
        axios.delete(`/api/assemblies/${assembly.id}/participate/${user.id}`)
            .then(response => {
                setIsSubscribed(false);
                ToastHandler.toast("Déinscription réussie", "success");
            })
            .catch(error => {
                console.error("There was an error unsubscribing:", error);
            });
    };


    return (
            <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark" key={assembly.id}>
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <FaUsers className="fill-primary dark:fill-white" />
                </div>

                <div className="mt-4">
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                        {description}
                    </h4>
                    <span className="text-sm font-medium">{new Date(datetime).toLocaleString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    })}
                    </span>

                    <br/>
                    <span className="text-sm font-medium">Lieu: {location}</span>
                    <br/>
                    <span className="text-sm font-medium">Quorum: {quorum}</span>

                    <div className="mt-4 flex justify-end gap-2">
                        {isSubscribed ? (
                            <Button onClick={handleUnsubscribe} color="primary">
                                Se désinscrire
                            </Button>
                        ) : (
                            <Button onClick={handleSubscribe} color="success" className="text-white">
                                S&apos;inscrire
                            </Button>
                        )}
                        <a href={`/assemblies/${assembly.id}`}>
                            <Button color="primary">Voir plus</Button>
                        </a>
                    </div>
                </div>
            </div>
    );
};

export default AssemblyCard;
