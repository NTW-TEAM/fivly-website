import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ToastHandler from "@/tools/ToastHandler";
import { FaPen } from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import { Assembly } from "@/types/Assembly";

const HandleEditAssembly = ({
  assemblies,
  setAssemblies,
  assemblyToEdit,
}: {
  assemblies: Assembly[];
  setAssemblies: React.Dispatch<React.SetStateAction<Assembly[]>>;
  assemblyToEdit: Assembly;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllAssembly = async () => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const description = formData.get("description") as string;
    const isGeneral = formData.get("isGeneral") === "";
    const hasStarted = formData.get("hasStarted") === "";
    const datetime = new Date(formData.get("datetime") as string).toISOString();
    const quorum = parseInt(formData.get("quorum") as string, 10);
    const location = formData.get("location") as string;

    const body = {
      description: description,
      isGeneral: isGeneral,
      hasStarted: hasStarted,
      datetime: datetime,
      quorum: quorum,
      location: location,
    };

    await localApi
      .patch(`/api/assemblies/${assemblyToEdit.id}`, body)
      .then(async (response) => {
        if (response.data.statusCode === 200) {
          getAllAssembly().then((data) => {
            setAssemblies(data);
          });
          ToastHandler.toast(
            "L'assemblée a été modifiée avec succès",
            "success",
          );
        } else {
          ToastHandler.toast(response.data, "error");
        }
      })
      .catch((error) => {
        ToastHandler.toast(
          "Erreur lors de la modification de l'assemblée",
          "error",
        );
        console.error("error", error);
      })
      .finally(() => {
        onOpenChange();
      });
  };

  return (
    <div>
      <button onClick={onOpen}>
        <FaPen />
      </button>

      <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ModalContent>
            <ModalHeader>Modifier {assemblyToEdit.description}</ModalHeader>
            <ModalBody>
              <Input
                name="description"
                label="Description"
                placeholder="Description"
                required
                defaultValue={assemblyToEdit.description}
              />
              <Input
                name="datetime"
                label="Date et heure"
                placeholder="Date et heure"
                type="datetime-local"
                required
                defaultValue={new Date(assemblyToEdit.datetime).toISOString().slice(0, 16)}
              />
              <Input
                name="quorum"
                label="Quorum"
                type="number"
                placeholder="Quorum"
                required
                defaultValue={String(assemblyToEdit.quorum)}
              />
              <Input
                name="location"
                label="Lieu"
                placeholder="Lieu"
                required
                defaultValue={assemblyToEdit.location}
              />
              <div className="flex gap-4">
                <Checkbox
                  name="isGeneral"
                  required
                  defaultChecked={assemblyToEdit.isGeneral}
                >
                  Est générale
                </Checkbox>
                <Checkbox
                  name="hasStarted"
                  required
                  defaultChecked={assemblyToEdit.hasStarted}
                >
                  A commencé
                </Checkbox>
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
                Enregistrer
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default HandleEditAssembly;
