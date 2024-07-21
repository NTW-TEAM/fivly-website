import {
    Button,
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
import {Crowdfunding} from "@/types/Crowdfunding";

const HandleCreateCrowdfunding = ({crowdfundings, setCrowdfundings}: {crowdfundings: Crowdfunding[]; setCrowdfundings: React.Dispatch<React.SetStateAction<Crowdfunding[]>>;}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const goalAmount = parseFloat(formData.get("goalAmount") as string);
        const beginDatetime = new Date(formData.get("beginDatetime") as string).toISOString();
        const endDatetime = new Date(formData.get("endDatetime") as string).toISOString();

        const body = {
          title: title,
          description: description,
          goalAmount: goalAmount,
          beginDatetime: beginDatetime,
          endDatetime: endDatetime,
        };

        await localApi
            .post(`/api/stripe/crowdfunding`, body)
            .then(async (response) => {
                if (response.data.statusCode === 201) {
                    getAllCrowdfunding().then((data) => {
                      setCrowdfundings(data);
                    });
                    ToastHandler.toast("La campagne de financement a été ajoutée avec succès", "success");
                }
                else {
                    console.log(response.data);
                    ToastHandler.toast(response.data.data, "error");
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
          Ajouter une campagne de financement
        </Button>

        <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <ModalContent>
              <ModalHeader>Ajouter une campagne de financement</ModalHeader>
              <ModalBody>
                <Input
                  name="title"
                  label="Titre"
                  placeholder="Titre"
                  required
                  defaultValue=""
                />
                <Input
                  name="description"
                  label="Description"
                  placeholder="Description"
                  required
                  defaultValue=""
                />
                <Input
                  name="goalAmount"
                  label="Montant Objectif (€)"
                  type="number"
                  placeholder="Montant Objectif"
                  required
                  defaultValue=""
                />
                <Input
                  name="beginDatetime"
                  label="Date et heure de début"
                  type="datetime-local"
                  placeholder="Date et heure de début"
                  required
                  defaultValue=""
                />
                <Input
                  name="endDatetime"
                  label="Date et heure de fin"
                  type="datetime-local"
                  placeholder="Date et heure de fin"
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

export default HandleCreateCrowdfunding;
