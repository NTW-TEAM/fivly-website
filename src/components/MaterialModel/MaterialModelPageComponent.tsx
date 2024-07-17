"use client";
import {FaUsersCog} from "react-icons/fa";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import DefaultLayout from "../Layouts/DefaultLayout";
import CardDataStats from "../CardDataStats";
import React from "react";
import localApi from "@/services/localAxiosApi";
import {MaterialModel} from "@/types/MaterialModel";
import TableMaterialModel from "./TableMaterialModel";
import {UserJwt} from "@/types/UserJwt";

const MaterialModelPageComponent = ({user}: {user: UserJwt}) => {
    const getAllMaterialModel = async () => {
        return new Promise<MaterialModel[]>((resolve, reject) => {
        localApi
            .get(`/api/materials/model/findall`)
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

    const [materialModels, setMaterialModels] = React.useState<MaterialModel[]>([]);

    React.useEffect(() => {
        getAllMaterialModel().then((data) => {
            setMaterialModels(data);
        });
    }, []);

    return (
        <DefaultLayout user={user}>
        <Breadcrumb pageName="Model de matériel"/>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            <CardDataStats title="Model d'équipement" total={materialModels.length.toString()} rate="">
                <FaUsersCog className="fill-primary dark:fill-white" />
            </CardDataStats>
        </div>

        <div className="mt-4 flex flex-col gap-10">
            <TableMaterialModel materialModels={materialModels} setMaterialModels={setMaterialModels} />
        </div>
        </DefaultLayout>
    );
    };



export default MaterialModelPageComponent;