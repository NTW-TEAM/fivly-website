"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import DefaultLayout from "../Layouts/DefaultLayout";
import CardDataStats from "../CardDataStats";
import React from "react";
import localApi from "@/services/localAxiosApi";
import {Donation} from "@/types/Donation";
import {GiReceiveMoney} from "react-icons/gi";
import {FaEuroSign, FaRegStar} from "react-icons/fa";
import TableDonation from "./TableDonation";
import {UserJwt} from "@/types/UserJwt";

const DonationPageComponent = ({user}: {user: UserJwt}) => {
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

    const [donations, setDonations] = React.useState<Donation[]>([]);
    const totalAmount = donations.reduce((acc, donation) => acc + parseFloat(donation.amount), 0).toFixed(2);
    const bestDonateur = donations.reduce((maxDonation, donation) => {
        const donationAmount = parseFloat(donation.amount);
        if (donationAmount > maxDonation.amount) {
            const firstName = donation.potentialUser ? donation.potentialUser.firstName : "Donateur anonyme";
            return {
                id: donation.potentialUser ? donation.potentialUser.id : 0,
                firstName: firstName,
                lastName: donation.potentialUser ? donation.potentialUser.lastName : "",
                amount: donationAmount
            };
        }
        return maxDonation;
    }, { id: 0, firstName: "", lastName: "", amount: 0 });

    React.useEffect(() => {
        const fetchDonations = async () => {
            const data = await getAllDonations();
            setDonations(data);
        };

        fetchDonations();
    }, []);

    return (
        <DefaultLayout user={user}>
        <Breadcrumb pageName="Gestion des dons"/>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            <CardDataStats title="Nombre de donations" total={donations.length.toString()} rate="">
                <GiReceiveMoney className="fill-primary dark:fill-white"/>
            </CardDataStats>

            <CardDataStats title="Total des donations" total={totalAmount.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €"} rate="">
                <FaEuroSign className="fill-primary dark:fill-white"/>          
            </CardDataStats>

            <CardDataStats title="Meilleur donateur" total={bestDonateur.firstName + " " + bestDonateur.lastName} rate={bestDonateur.amount + " €"}>
                <FaRegStar className="fill-primary dark:fill-white"/>
            </CardDataStats>
        </div>

        <div className="mt-4 flex flex-col gap-10">
            <TableDonation donations={donations} />
        </div>
        </DefaultLayout>
    );
    };



export default DonationPageComponent;