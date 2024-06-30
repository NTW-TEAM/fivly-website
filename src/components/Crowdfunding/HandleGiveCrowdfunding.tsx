import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import localApi from "@/services/localAxiosApi";
import { Assembly } from "@/types/Assembly";
import { Crowdfunding } from "@/types/Crowdfunding";
import { SiCrowdsource } from "react-icons/si";

const HandleGiveCrowdfunding = ({crowdfunding}: {crowdfunding: Crowdfunding; }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const amount = parseInt(formData.get("amount") as string, 10);

        const body = {
          amount: amount,
          crowdfundingId: crowdfunding.id,
        };

        await localApi
            .post(`/api/stripe/crowdfunding/give`, body)
            .then(async (response) => {
                if (response.data.statusCode === 201) {
                  ToastHandler.toast("Redirection vers la page de paiement...", "info");
                  window.location.href = response.data.sessionUrl;
                } else {
                  ToastHandler.toast(
                    response.data.data || "Erreur lors de la création de la page de paiement",
                    "error",
                  );
                }
            })
            .catch((error) => {
                ToastHandler.toast("Erreur lors de la création de la campagne de financement", "error");
                console.error("error", error);
            })
            .finally(() => {
                onOpenChange();
            });

    }
   
    return (
      <div>
        <Button onClick={onOpen} color="primary">
          <SiCrowdsource className="fill-white" />
        </Button>

        <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <ModalContent>
              <ModalHeader>Ajouter de l&apos;argent à la campagne de financement ({crowdfunding.title})</ModalHeader>
              <ModalBody>
                <Input
                  name="amount"
                  label="Montant (€)"
                  type="number"
                  placeholder="Montant (€)"
                  required
                  defaultValue=""
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => onOpenChange()}
                >
                  Fermer
                </Button>
                <Button color="success" variant="light" type="submit">
                  Ajouter
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </div>
    );
};

export default HandleGiveCrowdfunding;
