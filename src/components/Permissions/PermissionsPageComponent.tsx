"use client";
import { FaUsersCog, FaUserShield } from "react-icons/fa";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import DefaultLayout from "../Layouts/DefaultLayout";
import CardDataStats from "../CardDataStats";
import React from "react";
import { Roles } from "@/types/roles";
import axios from "axios";
import { Scopes } from "@/types/scopes";
import { MdVerifiedUser } from "react-icons/md";
import TableRoles from "./TableRoles";
import localApi from "@/services/localAxiosApi";

const PermissionsPageComponent = () => {
    const getAllRoles = async () => {
        return new Promise<Roles[]>((resolve, reject) => {
        localApi
            .get(`/api/roles`)
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

    const getAllScopes = async () => {
        return new Promise<Scopes[]>((resolve, reject) => {
        localApi
            .get(`/api/scopes`)
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

    const [roles, setRoles] = React.useState<Roles[]>([]);
    const [scopes, setScopes] = React.useState<Scopes[]>([]);

    React.useEffect(() => {
        const fetchRolesAndScopes = async () => {
            setRoles(await getAllRoles());
            setScopes(await getAllScopes());
        };

        fetchRolesAndScopes();
    }, []);

    return (
        <DefaultLayout>
        <Breadcrumb pageName="Permissions"/>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            <CardDataStats title="Roles" total={roles.length.toString()} rate="">
                <FaUsersCog className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats title="Permissions" total={scopes.length.toString()} rate="">
                <MdVerifiedUser className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats title="Administrateur" total={roles.filter((role) => role.name === "admin").length.toString()} rate="">
                <FaUserShield className="fill-primary dark:fill-white" />
            </CardDataStats>
        </div>

        <div className="mt-4 flex flex-col gap-10">
            <TableRoles roles={roles} setRoles={setRoles} />
        </div>
        </DefaultLayout>
    );
    };



export default PermissionsPageComponent;