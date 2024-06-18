"use client";
import { FaUsersCog, FaUserShield } from "react-icons/fa";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import DefaultLayout from "../Layouts/DefaultLayout";
import CardDataStats from "../CardDataStats";
import React from "react";
import localApi from "@/services/localAxiosApi";
import { Assembly } from "@/types/Assembly";
import TableAssembly from "./TableAssembly";

const AssemblyPageComponent = () => {

    const [assemblies, setAssemblies] = React.useState<Assembly[]>([]);

    const getAllAssembly = async () => {
        return new Promise<Assembly[]>((resolve, reject) => {
        localApi
            .get(`/api/assemblies`)
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

    React.useEffect(() => {
        getAllAssembly().then((data) => {
            setAssemblies(data);
        });
    }, []);

    return (
        <DefaultLayout>
        <Breadcrumb pageName="Assemblée" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            <CardDataStats title="Assemblées" total={assemblies.length.toString()} rate="">
                <FaUsersCog className="fill-primary dark:fill-white" />
            </CardDataStats>
        </div>

        <div className="mt-4 flex flex-col gap-10">
            <TableAssembly assemblies={assemblies} setAssemblies={setAssemblies} />
        </div>
        </DefaultLayout>
    );
    };



export default AssemblyPageComponent;