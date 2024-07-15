"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "../Layouts/DefaultLayout";
import React, {useEffect, useState} from "react";
import {Members} from "@/types/members";
import localApi from "@/services/localAxiosApi";
import Loader from "../common/Loader";
import {FaUserCircle} from "react-icons/fa";
import RoleMembersDisplay from "../members/DisplayRoleMembers";
import ScopesMembersDisplay from "../members/DisplayScopesMembers";

const ProfilePageComponent = () => {

    const getUserInfo = async () => {
    return new Promise<Members>((resolve, reject) => {
        localApi
        .get(`/api/auth/profile`)
        .then((response) => {
            if (response.status === 200) {
            resolve(response.data.data);
            }
        })
        .catch((error) => {
            console.error("error", error);
            reject([]);
        });
    });
    };

    const [userInfo, setUserInfo] = useState<Members>();

    useEffect(() => {
    getUserInfo().then((data) => {
        setUserInfo(data);
        console.log("data", data)
    });
    }, []);

    if (!userInfo) {
        return (<div><Loader/></div>);
    }


  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <Image
              src={"/images/cover/cover-01.png"}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              width={970}
              height={260}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
{/*             <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
              <label
                htmlFor="cover"
                className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
              >
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  className="sr-only"
                />
                <span>
                  <FaPencil />
                </span>
                <span>Edit</span>
              </label>
            </div> */}
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <FaUserCircle
                  width={112}
                  height={112}
                  className="dark:text-primarydark h-full w-full"
                />
              </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                    {userInfo.firstName} {userInfo.lastName}
                </h3>
                <p className="font-medium">{userInfo.email}</p>

                <hr className="mt-4 mb-2 border-stroke dark:border-strokedark" />

                <h4 className="mt-4 mb-2 text-lg font-semibold text-black dark:text-white">Votre Adresse</h4>
                <p className="text-sm font-medium text-black dark:text-white">{userInfo.numberAndStreet}, {userInfo.postalCode} {userInfo.city}, {userInfo.country}</p>

                <hr className="mt-4 mb-2 border-stroke dark:border-strokedark" />

                <h4 className="mt-4 mb-2 text-lg font-semibold text-black dark:text-white">Votre numéro de Téléphone</h4>
                <p className="text-sm font-medium text-black dark:text-white">{userInfo.phoneNumber}</p>

                <hr className="mt-4 mb-2 border-stroke dark:border-strokedark" />

                <h4 className="mt-4 mb-2 text-lg font-semibold text-black dark:text-white">Vos rôles</h4>
                <div className="flex items-center justify-center gap-2">            
                    <RoleMembersDisplay rolesData={userInfo.roles} />
                </div>

                <hr className="mt-4 mb-2 border-stroke dark:border-strokedark" />

                <h4 className="mt-4 mb-2 text-lg font-semibold text-black dark:text-white">Vos Permissions</h4>
                <div className="flex items-center justify-center gap-2">
                    <ScopesMembersDisplay scopesData={userInfo.scopes} />
                </div>

            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProfilePageComponent;