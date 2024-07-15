"use client";
import React from "react";
import {FaCheckCircle} from "react-icons/fa";

const SuccessPageComponent: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <FaCheckCircle className="mx-auto text-6xl text-green-500" />
        <h2 className="text-gray-800 mt-4 text-2xl font-bold">
            Donation Reçue !
        </h2>
        <p className="text-gray-600 mt-2 mb-6">
            Merci pour votre soutien, votre donation nous aide à continuer à fournir des services gratuits.
        </p>

        <a href="/" className="mt-6 w-full rounded-md bg-green-500 px-4 py-3 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            Retour à l&apos;accueil
        </a>
      </div>
      <p className="text-gray-500 absolute bottom-2 right-2 text-xs">
        Donation solution by Fivly
      </p>
    </div>
  );
};

export default SuccessPageComponent;
