import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegCalendarAlt } from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import ToastHandler from "@/tools/ToastHandler";
import {SiCrowdsource} from "react-icons/si";
import {Button} from "@nextui-org/react";

interface ActivityCardProps {
    title: string;
    beginDate: string;
    endDate: string;
    description: string;
    activityId: number; // Assuming you have activityId to identify the activity
    userId: number; // Assuming you have userId to identify the user
}

const ActivityCard: React.FC<ActivityCardProps> = ({
                                                       title,
                                                       beginDate,
                                                       endDate,
                                                       description,
                                                       activityId,
                                                       userId
                                                   }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        // Check subscription status when component mounts
        localApi.get(`/api/activities/${activityId}/registry/${userId}`)
            .then(response => {
                setIsSubscribed(response.data.isSubscribed);
            })
            .catch(error => {
                console.error("There was an error checking the subscription status:", error);
            });
    }, [activityId, userId]);

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
        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <FaRegCalendarAlt className="fill-primary dark:fill-white" />
            </div>

            <div className="mt-4">
                <h4 className="text-title-md font-bold text-black dark:text-white">
                    {title}
                </h4>
                <span className="text-sm font-medium">{description}</span>
            </div>

            <div className="mt-4 flex items-end justify-between">
                <span className="text-sm font-medium">Du {beginDate} au {endDate}</span>
            </div>

            <div className="mt-4 flex justify-end gap-2">
                    <Button onClick={handleUnsubscribe} color="primary">
                        Se désinscrire
                    </Button>
                    <Button onClick={handleSubscribe} color="success">
                        S&apos;inscrire
                    </Button>
            </div>
        </div>
    );
};

export default ActivityCard;
