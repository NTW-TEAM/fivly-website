"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import DefaultLayout from "../Layouts/DefaultLayout";
import CardDataStats from "../CardDataStats";
import React from "react";
import axios from "axios";
import { MdOutlineTypeSpecimen } from "react-icons/md";
import { ActivityType } from "@/types/activityType";
import TableActivityType from "./TableActivityType";

const ActivityTypePageComponent = () => {
    const getAllActivityType = async () => {
        return new Promise<ActivityType[]>((resolve, reject) => {
        axios
            .get(`http://localhost:3001/api/activity-types`)
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

    React.useEffect(() => {
        const fetchActivityTypes = async () => {
            const data = await getAllActivityType();
            setActivityTypes(data);
        };

        fetchActivityTypes();
    }, []);

    return (
        <DefaultLayout>
        <Breadcrumb pageName="Permissions"/>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            <CardDataStats title="Type d'activité" total={activityTypes.length.toString()} rate="">
                <MdOutlineTypeSpecimen className="fill-primary dark:fill-white"/>
            </CardDataStats>
        </div>

        <div className="mt-4 flex flex-col gap-10">
            <TableActivityType activityTypes={activityTypes} setActivityTypes={setActivityTypes} />
        </div>
        </DefaultLayout>
    );
    };



export default ActivityTypePageComponent;