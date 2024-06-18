"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import DefaultLayout from "../Layouts/DefaultLayout";
import CardDataStats from "../CardDataStats";
import React from "react";
import { MdOutlineTypeSpecimen } from "react-icons/md";
import { ActivityType } from "@/types/activityType";
import localApi from "@/services/localAxiosApi";
import { Activity } from "@/types/activity";
import { FaRegCalendarAlt } from "react-icons/fa";
import TableActivities from "./TableActivities";

const ActivitiesPageComponent = () => {
    const getAllActivityType = async () => {
        return new Promise<ActivityType[]>((resolve, reject) => {
        localApi
            .get(`/api/activity-types`)
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

    const [activityTypes, setActivityTypes] = React.useState<ActivityType[]>([]);
    const [activities, setActivities] = React.useState<Activity[]>([]);

    React.useEffect(() => {
        const fetchActivityTypes = async () => {
            const activityTypes = await getAllActivityType();
            setActivityTypes(activityTypes);
        };

        const fetchActivities = async () => {
            const activities = await getAllActivities();
            console.log(activities);
            setActivities(activities);
        };

        fetchActivityTypes();
        fetchActivities();
    }, []);

    return (
        <DefaultLayout>
        <Breadcrumb pageName="Activité"/>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            <CardDataStats title="Activités au total" total={activities.length.toString()} rate="">
                <FaRegCalendarAlt className="fill-primary dark:fill-white"/>
            </CardDataStats>
            <CardDataStats title="Type d'activité" total={activityTypes.length.toString()} rate="">
                <MdOutlineTypeSpecimen className="fill-primary dark:fill-white"/>
            </CardDataStats>
        </div>

        <div className="mt-4 flex flex-col gap-10">
            <TableActivities activities={activities} setActivities={setActivities} />
        </div>
        </DefaultLayout>
    );
    };



export default ActivitiesPageComponent;