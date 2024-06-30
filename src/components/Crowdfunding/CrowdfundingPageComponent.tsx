"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import DefaultLayout from "../Layouts/DefaultLayout";
import CardDataStats from "../CardDataStats";
import React from "react";
import localApi from "@/services/localAxiosApi";
import { Crowdfunding } from "@/types/Crowdfunding";
import { SiCrowdsource } from "react-icons/si";
import TableCrowdfunding from "./TableCrowdfunding";

const CrowdfundingPageComponent = () => {
    const getAllCrowdfunding = async () => {
        return new Promise<Crowdfunding[]>((resolve, reject) => {
        localApi
            .get(`/api/stripe/crowdfunding`)
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

    const [crowdfundings, setCrowdfundings] = React.useState<Crowdfunding[]>([]);

    React.useEffect(() => {
        const fetchCrowdfunding = async () => {
            const data = await getAllCrowdfunding();
            setCrowdfundings(data);
        };

        fetchCrowdfunding();
    }, []);

    return (
      <DefaultLayout>
        <Breadcrumb pageName="Gestion des dons" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <CardDataStats
            title="Nombre de crowdfunding"
            total={crowdfundings.length.toString()}
            rate=""
          >
            <SiCrowdsource className="fill-primary dark:fill-white" />
          </CardDataStats>
        </div>

        <div className="mt-4 flex flex-col gap-10">
          <TableCrowdfunding crowdfundings={crowdfundings} setCrowdfundings={setCrowdfundings} />
        </div>
      </DefaultLayout>
    );
    };



export default CrowdfundingPageComponent;