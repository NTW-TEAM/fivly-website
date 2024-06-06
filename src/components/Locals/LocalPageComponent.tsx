"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import DefaultLayout from "../Layouts/DefaultLayout";
import CardDataStats from "../CardDataStats";
import React from "react";
import { FaBuilding } from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import { local } from "@/types/local";
import TableLocals from "./TableLocals";

const LocalPageComponent = () => {
    const getAllLocals = async () => {
        return new Promise<local[]>((resolve, reject) => {
        localApi
            .get(`/api/locals`)
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

    const [locals, setLocals] = React.useState<local[]>([]);

    React.useEffect(() => {
        const fetchLocals = async () => {
            const data = await getAllLocals();
            setLocals(data);
        };

        fetchLocals();
    }, []);

    return (
        <DefaultLayout>
        <Breadcrumb pageName="Permissions"/>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            <CardDataStats title="Locaux" total={locals.length.toString()} rate="">
                <FaBuilding className="fill-primary dark:fill-white"/>
            </CardDataStats>
        </div>

        <div className="mt-4 flex flex-col gap-10">
            <TableLocals locals={locals} setLocals={setLocals} />
        </div>
        </DefaultLayout>
    );
};

export default LocalPageComponent;
