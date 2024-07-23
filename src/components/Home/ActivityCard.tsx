"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegCalendarAlt } from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import ToastHandler from "@/tools/ToastHandler";
import { Button } from "@nextui-org/react";

interface ActivityCardProps {
    title: string;
    beginDate: string;
    endDate: string;
    description: string;
    activityId: number;
    userId: number;
    participants: { id: number }[]; // Adding participants prop
}

const ActivityCard: React.FC<ActivityCardProps> = ({
                                                       title,
                                                       beginDate,
                                                       endDate,
                                                       description,
                                                       activityId,
                                                       userId,
                                                       participants, // Receiving participants prop
                                                   }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        // Check if the user is a participant
        const isUserParticipant = participants.some(participant => participant.id === userId);
        setIsSubscribed(isUserParticipant);
    }, [participants, userId]);

    const handleSubscribe = () => {
        localApi.post(`/api/activities/${activityId}/registry/${userId}`)
            .then(response => {
                setIsSubscribed(true);
                ToastHandler.toast("Inscription réussie", "success");
            })
            .catch(error => {
                console.error("There was an error subscribing:", error);
            });
    };

    const handleUnsubscribe = () => {
        axios.delete(`/api/activities/${activityId}/registry/${userId}`)
            .then(response => {
                setIsSubscribed(false);
                ToastHandler.toast("Déinscription réussie", "success");
            })
            .catch(error => {
                console.error("There was an error unsubscribing:", error);
            });
    };

    return (
        <div
            className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between align-center gap-2">

                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <FaRegCalendarAlt className="fill-primary dark:fill-white"/>
                </div>

                <div className="flex justify-center items-center text-sm font-bold text-black dark:text-white">
                    <span>{
                        new Date(beginDate).toLocaleString("fr-FR", {
                            month: "long",
                            year: "numeric",
                        })
                    }</span>
                </div>
            </div>


            <div className="mt-4">
                <h4 className="text-title-md font-bold text-black dark:text-white">
                    {title}
                </h4>
                <span className="text-sm font-medium">{description}</span>
            </div>

            <div className="mt-4 flex items-end justify-between">
                <span className="text-sm font-medium">Du {new Date(beginDate).toLocaleString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })} au {new Date(endDate).toLocaleString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}</span>
            </div>
            <div className=" flex items-end justify-between">
                <span className="text-sm font-medium text-muted">De {new Date(beginDate).toLocaleString("fr-FR", {
                    hour: "numeric",
                    minute: "numeric",
                })} à {new Date(endDate).toLocaleString("fr-FR", {
                    hour: "numeric",
                    minute: "numeric",
                })}</span>
            </div>


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
            </div>
        </div>
    );
};

export default ActivityCard;
