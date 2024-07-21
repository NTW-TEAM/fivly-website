"use client";
import React from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import ActivityCard from "@/components/Home/ActivityCard";
import localApi from "@/services/localAxiosApi";
import { UserJwt } from "@/types/UserJwt";
import { Activity } from "@/types/activity";

const MyActivitiesPageComponent = ({ user }: { user: UserJwt }) => {
    const getAllActivities = async () => {
        return new Promise<Activity[]>((resolve, reject) => {
            localApi
                .post(`/api/activities/search`)
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

    const [activities, setActivities] = React.useState<Activity[]>([]);

    React.useEffect(() => {
        const fetchActivities = async () => {
            const data = await getAllActivities();
            // Filter activities to include only those where the user is a participant
            const filteredActivities = data.filter(activity =>
                activity.participants.some(participant => participant.id === user.id)
            );
            setActivities(filteredActivities);
        };

        fetchActivities();
    }, [user.id]);

    return (
        <DefaultLayout user={user}>
            <Breadcrumb pageName="Mes activités"/>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                {activities &&
                    activities.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            title={activity.title}
                            beginDate={new Date(activity.beginDateTime).toLocaleDateString()}
                            endDate={new Date(activity.endDateTime).toLocaleDateString()}
                            description={activity.description}
                            activityId={activity.id}
                            userId={user.id}
                            participants={activity.participants} // Passing participants prop
                        />
                    ))}
            </div>
        </DefaultLayout>
    );
};

export default MyActivitiesPageComponent;
