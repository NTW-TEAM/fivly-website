import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import localApi from "@/services/localAxiosApi";
import { Vote } from "@/types/Vote";

const HandleAddVoteToAssembly = ({
  setVotes,
  assemblyId,
}: {
  setVotes: React.Dispatch<React.SetStateAction<Vote[]>>;
  assemblyId: string | string[];
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllVotes = async (id: string): Promise<Vote[]> => {
    return new Promise<Vote[]>((resolve, reject) => {
      localApi
        .get(`/api/assemblies/${id}/vote-session`)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data.data);
          } else {
            reject(new Error("Failed to fetch assembly"));
          }
        })
        .catch((error) => {
          console.error("error", error);
          reject(new Error("Failed to fetch assembly"));
        });
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const body = {
      question: formData.get("question"),
      description: formData.get("description"),
      beginDateTime: new Date(formData.get("beginDateTime") as string).toISOString(),
      voteTimeInMinutes: parseInt(formData.get("voteTimeInMinutes") as string, 10),
      type: formData.get("type"),
      anonymous: formData.get("anonymous") === "true" ? true : false,
    };

    console.log("body", body)

    await localApi
      .post(`/api/assemblies/${assemblyId}/vote-session`, body)
      .then(async (response) => {
        if (response.data.statusCode === 201) {
          getAllVotes(assemblyId as string).then((data) => {
            setVotes(data);
          })
          ToastHandler.toast(
            "La session de vote a été ajoutée avec succès",
            "success",
          );
        } else {
          ToastHandler.toast(response.data.data, "error");
        }
      })
      .catch((error) => {
        ToastHandler.toast("Erreur lors de l'ajout de la session de vote", "error");
        console.error("error", error);
      })
      .finally(() => {
        onOpenChange();
      });
  };

  return (
    <div>
      <Button onClick={onOpen} color="primary">
        Ajouter une session de vote
      </Button>

      <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ModalContent>
            <ModalHeader>Ajouter une session de vote</ModalHeader>
            <ModalBody>
              <div>
                <label htmlFor="question">Question</label>
                <Input
                  id="question"
                  name="question"
                  type="text"
                  defaultValue=""
                  placeholder="Augmenter le salaire du conseil d'administration de 5% ?"
                  aria-describedby="question-helper"
                  required
                />

                <label htmlFor="description">Description</label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  defaultValue=""
                  placeholder="En vertu de l'article xxx, lorem ipsum dolo motor"
                  required
                />

                <label htmlFor="beginDateTime">Date et heure de début</label>
                <Input
                  id="beginDateTime"
                  name="beginDateTime"
                  type="datetime-local"
                  defaultValue=""
                  required
                />

                <label htmlFor="voteTimeInMinutes">
                  Durée du vote (en minutes)
                </label>
                <Input
                  id="voteTimeInMinutes"
                  name="voteTimeInMinutes"
                  type="number"
                  defaultValue=""
                  required
                />

                <label htmlFor="type">Type de vote</label>
                <Select
                  id="type"
                  name="type"
                  required
                  defaultSelectedKeys={["majority"]}
                  label="Type de vote"
                  disabledKeys={["unanimous"]}
                >
                  <SelectItem value="majority" key={"majority"}>
                    Majorité
                  </SelectItem>
                  <SelectItem value="unanimous" key={"unanime"} >
                    Unanime
                  </SelectItem>
                </Select>

                <label htmlFor="anonymous">Vote anonyme</label>
                <Select
                  id="anonymous"
                  name="anonymous"
                  required
                  defaultSelectedKeys={["true"]}
                  label="Vote anonyme"
                >
                  <SelectItem value="true" key={"true"}>
                    Oui
                  </SelectItem>
                  <SelectItem value="false" key={"false"}>
                    Non
                  </SelectItem>
                </Select>
              </div>
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

export default HandleAddVoteToAssembly;
