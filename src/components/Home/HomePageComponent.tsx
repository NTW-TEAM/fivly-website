"use client";
import React from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import CardDataStatsWithProgress from "@/components/Home/CardDataStatsWithProgress";
import localApi from "@/services/localAxiosApi";
import { UserJwt } from "@/types/UserJwt";
import { Crowdfunding } from "@/types/Crowdfunding";
import { Activity } from "@/types/activity";
import { Assembly } from "@/types/Assembly";
import { SiCrowdsource } from "react-icons/si";
import AssemblyCard from "@/components/Home/AssemblyCard";
import ActivityCard from "@/components/Home/ActivityCard";
import { Donation } from "@/types/Donation";
import CardDataStats from "@/components/CardDataStats";
import { FaEuroSign } from "react-icons/fa";

const HomePageComponent = ({ user }: { user: UserJwt }) => {
    const getAllCrowdfunding = async () => {
        return new Promise<Crowdfunding[]>((resolve, reject) => {
            localApi
                .get(`/api/stripe/crowdfunding/onlyActive/true`)
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

    const getAllAssemblies = async () => {
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

    const getAllDonations = async () => {
        return new Promise<Donation[]>((resolve, reject) => {
            localApi
                .get(`/api/stripe/donations`)
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

    const getAllCrowdfundings = async () => {
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

    const [crowdfunding, setCrowdfunding] = React.useState<Crowdfunding[]>([]);
    const [activities, setActivities] = React.useState<Activity[]>([]);
    const [assemblies, setAssemblies] = React.useState<Assembly[]>([]);
    const [donations, setDonations] = React.useState<Donation[]>([]);
    const [crowdfundings, setCrowdfundings] = React.useState<Crowdfunding[]>([]);
    const [crowdfundingNotFiltered, setCrowdfundingNotFiltered] = React.useState<Crowdfunding[]>([]);

    React.useEffect(() => {
        const fetchCrowdfunding = async () => {
            let data = await getAllCrowdfunding();
            setCrowdfundingNotFiltered(data);
            data = data.filter((crowdfunding) => new Date(crowdfunding.endDatetime) > new Date());
            setCrowdfunding(data);
        };

        const fetchActivities = async () => {
            const data = await getAllActivities();
            const filteredActivities = data.filter(activity => new Date(activity.beginDateTime) > new Date());
            setActivities(filteredActivities);
        };

        const fetchAssemblies = async () => {
            const data = await getAllAssemblies();
            const filteredAssemblies = data.filter(assembly =>
                assembly.isGeneral ||
                assembly.participants.some(participant => participant.id === user.id)
            );
            setAssemblies(filteredAssemblies);
        };

        const fetchDonations = async () => {
            const data = await getAllDonations();
            setDonations(data);
        };

        const fetchCrowdfundings = async () => {
            const data = await getAllCrowdfundings();
            setCrowdfundings(data);
        };

        fetchCrowdfunding();
        fetchActivities();
        fetchAssemblies();
        fetchDonations();
        fetchCrowdfundings();
    }, [user.id]);

    const totalAmountDonation = donations
        .reduce((acc, donation) => acc + parseFloat(donation.amount), 0)
        .toFixed(2);
    const totalAmountCrowdfunding = crowdfundingNotFiltered
        .reduce((acc, crowdfunding) => acc + parseFloat(crowdfunding.actualAmount), 0)
        .toFixed(2);

    return (
        <DefaultLayout user={user}>
            <div className="flex w-full flex-col items-center justify-center">
                <h1 className="text-center text-7xl font-bold">
                    Bienvenue sur <span className="text-primary">Fivly</span>
                </h1>
                <p className="text-center">Votre plateforme de gestion d&apos;association</p>
                <div className="flex items-center justify-center">
                    <a href={"/donation/give"} className="rounded bg-primary text-white px-4 py-2 mt-6"> Faire un don </a>
                </div>
                <hr className="w-1/2 my-6" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                {crowdfunding &&
                    crowdfunding.map((item) => (
                        <CardDataStatsWithProgress
                            crowdfunding={item}
                            key={item.id}
                            title={item.title}
                            total={item.actualAmount.toString()}
                            goal={item.goalAmount.toString()}
                            rate={((parseFloat(item.actualAmount) / parseFloat(item.goalAmount)) * 100).toFixed(2) + "%"}
                            progress={(parseFloat(item.actualAmount) / parseFloat(item.goalAmount)) * 100}
                        >
                            <SiCrowdsource className="fill-primary dark:fill-white" />
                        </CardDataStatsWithProgress>
                    ))}

                {assemblies &&
                    assemblies.map((assembly) => (
                        <AssemblyCard
                            assembly={assembly}
                            key={assembly.id}
                            description={assembly.description}
                            datetime={assembly.datetime}
                            location={assembly.location}
                            quorum={assembly.quorum}
                        />
                    ))}

                {activities &&
                    activities.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            title={activity.title}
                            beginDate={activity.beginDateTime}
                            endDate={activity.endDateTime}
                            description={activity.description}
                            activityId={activity.id}
                            userId={user.id}
                            participants={activity.participants} // Passing participants prop
                        />
                    ))}



                <CardDataStats title="Total des donations" total={totalAmountDonation.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €"} rate="">
                    <FaEuroSign className="fill-primary dark:fill-white" />
                </CardDataStats>
                <CardDataStats title="Total des crowdfundings" total={totalAmountCrowdfunding.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €"} rate="">
                    <FaEuroSign className="fill-primary dark:fill-white" />
                </CardDataStats>
            </div>
        </DefaultLayout>
    );
};

export default HomePageComponent;
