"use client";
import React from "react";
import ChartRepartition from "./ChartRepartition";
import {Donation} from "@/types/Donation";
import localApi from "@/services/localAxiosApi";
import DefaultLayout from "../Layouts/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import CardDataStats from "../CardDataStats";
import {GiReceiveMoney} from "react-icons/gi";
import {FaEuroSign, FaRegStar} from "react-icons/fa";
import {Crowdfunding} from "@/types/Crowdfunding";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {UserJwt} from "@/types/UserJwt";

const FinancePageComponent = ({user}: {user: UserJwt}) => {
  const [donations, setDonations] = React.useState<Donation[]>([]);
  const [crowdfundings, setCrowdfundings] = React.useState<Crowdfunding[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

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
  }

  const totalAmountDonation = donations
    .reduce((acc, donation) => acc + parseFloat(donation.amount), 0)
    .toFixed(2);
  const bestDonateur = donations.reduce(
    (maxDonation, donation) => {
      const donationAmount = parseFloat(donation.amount);
      if (donationAmount > maxDonation.amount) {
        const firstName = donation.potentialUser
          ? donation.potentialUser.firstName
          : "Donateur anonyme";
        return {
          id: donation.potentialUser ? donation.potentialUser.id : 0,
          firstName: firstName,
          lastName: donation.potentialUser
            ? donation.potentialUser.lastName
            : "",
          amount: donationAmount,
        };
      }
      return maxDonation;
    },
    { id: 0, firstName: "", lastName: "", amount: 0 },
  );

  const totalAmountCrowdfunding = crowdfundings
    .reduce((acc, crowdfunding) => acc + parseFloat(crowdfunding.actualAmount), 0)
    .toFixed(2);

  React.useEffect(() => {
    setLoading(true);
    Promise.all([getAllDonations(), getAllCrowdfundings()])
      .then(([donations, crowdfundings]) => {
        setDonations(donations);
        setCrowdfundings(crowdfundings);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <DefaultLayout user={user}>
      <Breadcrumb pageName="Dashboard Finances" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
        {loading ? (
          <>
            <Skeleton height={150} />
            <Skeleton height={150} />
            <Skeleton height={150} />
            <Skeleton height={150} />
            <Skeleton height={150} />
          </>
        ) : (
          <>
            <CardDataStats title="Nombre de donations" total={donations.length.toString()} rate="">
              <GiReceiveMoney className="fill-primary dark:fill-white" />
            </CardDataStats>

            <CardDataStats title="Total des donations" total={totalAmountDonation.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €"} rate="">
              <FaEuroSign className="fill-primary dark:fill-white" />
            </CardDataStats>

            <CardDataStats title={bestDonateur.firstName + " " + bestDonateur.lastName} total="Donateur ++" rate={bestDonateur.amount + " €"}>
              <FaRegStar className="fill-primary dark:fill-white" />
            </CardDataStats>

            <CardDataStats title="Nombre de crowdfundings" total={crowdfundings.length.toString()} rate="">
              <GiReceiveMoney className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats title="Total des crowdfundings" total={totalAmountCrowdfunding.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €"} rate="">
              <FaEuroSign className="fill-primary dark:fill-white" />
            </CardDataStats>
          </>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {loading ? (
          <>
            <Skeleton height={400} />
            <Skeleton height={400} />
          </>
        ) : (
          <>
            <ChartRepartition
              title="Répartition du nombre de dons et de crowdfunding"
              labels={["Dons", "Crowdfunding"]}
              series={[donations.length, crowdfundings.length]}
              colors={["#d93a00", "#3C50E0"]}
            />
            <ChartRepartition
              title="Répartition en euro des dons et crowdfunding"
              labels={["Dons", "Crowdfunding"]}
              series={[parseFloat(totalAmountDonation), parseFloat(totalAmountCrowdfunding)]}
              colors={["#3C50E0", "#6577F3"]}
            />
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default FinancePageComponent;