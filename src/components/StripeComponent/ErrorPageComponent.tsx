import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const ErrorPageComponent: React.FC = () => {
  return (
    <div className="bg-red-50 flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <FaTimesCircle className="text-danger mx-auto text-6xl" />
        <h2 className="text-gray-800 mt-4 text-2xl font-bold">
          La donation a échoué !
        </h2>
        <p className="text-gray-600 mt-2 mb-6">
            Une erreur s&apos;est produite lors de la donation.
        </p>
        <a href="/" className="bg-danger hover:bg-danger-600 focus:ring-red-500 mt-6 w-full rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-opacity-50">
            Retour à l&apos;accueil
        </a>
      </div>
      <p className="text-gray-500 absolute bottom-2 right-2 text-xs">
        Donation solution by Fivly
      </p>
    </div>
  );
};

export default ErrorPageComponent;
