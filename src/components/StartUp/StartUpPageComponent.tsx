"use client";
import { Button, Input, Spacer } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import localApi from "@/services/localAxiosApi";
import ToastHandler from "@/tools/ToastHandler";

type OrganisationData = {
  name: string;
  domainName: string;
  stripeKey: string;
  stripeWebhookSecret: string;
  emailAdmin: string;
  passwordAdmin: string;
};

type InitialisationOrganisationProps = {
  onSubmit: (data: OrganisationData) => void;
};

const StartUpPageComponent = () => {
  const [formData, setFormData] = useState<OrganisationData>({
    name: "",
    domainName: "",
    stripeKey: "",
    stripeWebhookSecret: "",
    emailAdmin: "",
    passwordAdmin: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let startupOk = {
      association: false,
      admin: false,
    }

    try {

    await localApi
      .post(`/api/association`, {
        name: formData.name,
        domainName: formData.domainName,
        stripeKey: formData.stripeKey,
        stripeWebhookSecret: formData.stripeWebhookSecret,
      })
      .then(async (response) => {
        if (response.data.statusCode === 201) {
          startupOk.association = true;
          ToastHandler.toast("L'organisation a été créée avec succès", "success");
        }
        else {
          ToastHandler.toast(response.data, "error");
        }
      })
      .catch((error) => {
        ToastHandler.toast("Erreur lors de la création de l'organisation", "error");
        console.error("error", error);
      });

    await localApi.post(`api/users/register-admin`, {
      email: formData.emailAdmin,
      password: formData.passwordAdmin,
    })
      .then(async (response) => {
        if (response.data.statusCode === 201) {
          startupOk.admin = true;
          ToastHandler.toast("L'administrateur a été créé avec succès", "success");
        }
        else {
          ToastHandler.toast(response.data, "error");
        }
      })
      .catch((error) => {
        ToastHandler.toast("Erreur lors de la création de l'administrateur", "error");
        console.error("error", error);
      });

      if (startupOk.association && startupOk.admin) window.location.href = "/auth/signin";

    }
    catch (error) {
      console.error("error", error);
      ToastHandler.toast("Une erreur c'est produite pendant l'initialisation du site", "error");
    }
    



  };

  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-lg overflow-hidden rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20">
          <div className="rounded-lg border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="text-center">
              <Image
                className="mx-auto mb-4"
                src={"/images/logo/logo.svg"}
                alt="Logo"
                width={150}
                height={150}
              />
              <h1 className="mb-2 text-2xl font-semibold">
                Bienvenue sur notre plateforme
              </h1>
              <p className="text-gray-200 mb-6">
                Veuillez initialiser votre organisation pour commencer.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <h2 className="mb-2 text-xl font-bold">
                Initialisation de l&apos;organisation
              </h2>
              <Spacer y={3} />
              <Input
                label="Nom de l'organisation"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <Spacer y={3} />
              <Input
                label="Domaine"
                type="text"
                name="domainName"
                value={formData.domainName}
                onChange={handleChange}
                required
                fullWidth
              />
              <Spacer y={3} />
              <Input
                label="Clé Stripe"
                type="text"
                name="stripeKey"
                value={formData.stripeKey}
                onChange={handleChange}
                required
                fullWidth
              />
              <Spacer y={3} />
              <Input
                label="Secret du webhook Stripe"
                type="text"
                name="stripeWebhookSecret"
                value={formData.stripeWebhookSecret}
                onChange={handleChange}
                required
                fullWidth
              />
              <Spacer y={3} />
              <hr className="my-2" />
              <Spacer y={3} />
              <h2 className="mb-2 text-xl font-bold">
                Initialisation du premier administrateur
              </h2>
              <Input
                label="Mail Admin"
                type="text"
                name="emailAdmin"
                value={formData.emailAdmin}
                onChange={handleChange}
                required
                fullWidth
              />
              <Spacer y={3} />
              <Input
                label="Mot de passe Admin"
                type="text"
                name="passwordAdmin"
                value={formData.passwordAdmin}
                onChange={handleChange}
                required
                fullWidth
              />
              <Spacer y={3} />
              <Button type="submit" color="primary" className="w-full">
                Initialiser l&apos;organisation
              </Button>
              <Spacer y={3} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartUpPageComponent;
