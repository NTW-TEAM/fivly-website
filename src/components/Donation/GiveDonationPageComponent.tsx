"use client";
import {Button} from "@nextui-org/react";
import React, {useState} from "react";
import {FaDonate} from "react-icons/fa";
import ToastHandler from "@/tools/ToastHandler";
import localApi from "@/services/localAxiosApi";

const GiveDonationPageComponent = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const body = { amount };

    localApi
      .post("/api/stripe/create-donation-session", body)
      .then(async (response) => {
        if (response.data.statusCode === 201) {
            ToastHandler.toast("Redirection vers la page de paiement...", "info");
            window.location.href = response.data.sessionUrl;
        } else {
          ToastHandler.toast(response.data.data || "Erreur lors de la création de la session de donation", "error");
        }
      })
      .catch((error) => {
        ToastHandler.toast("Erreur lors de la création de la session de donation", "error");
        console.error("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-100 relative flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <FaDonate className="mx-auto text-4xl text-primary" />
          <h2 className="text-gray-800 mt-2 text-2xl font-bold">
            Faire un don
          </h2>
          <p className="text-gray-600">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Votre soutien nous permet de continuer à faire grandir l'association et ses activités.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="text-gray-700 block text-sm font-medium"
            >
              Montant du don (€)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Entrez le montant du don"
              required
            />
          </div>
          <Button
            color="primary"
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium"
            disabled={loading}
          >
            {loading ? "Chargement..." : "Faire un don"}
          </Button>
        </form>
      </div>
      <p className="text-gray-500 absolute bottom-2 right-2 text-xs">
        Donation solution by Fivly
      </p>
    </div>
  );
};

export default GiveDonationPageComponent;
