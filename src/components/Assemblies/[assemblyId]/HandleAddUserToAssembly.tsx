import {
    Button,
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
import {Assembly} from "@/types/Assembly";
import {Members} from "@/types/members";

const HandleAddUserToAssembly = ({
  setAssembly,
  assemblyId,
}: {
  setAssembly: React.Dispatch<React.SetStateAction<Assembly | null>>;
  assemblyId: number;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [members, setMembers] = React.useState<Members[]>([]);

  const getAssembly = async (id: number): Promise<Assembly> => {
    return new Promise<Assembly>((resolve, reject) => {
      localApi
        .get(`/api/assemblies/${id}`)
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

  const getAllMembers = async () => {
    return new Promise<Members[]>((resolve, reject) => {
      localApi
        .get(`/api/users`)
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

    const userId = formData.get("userId") as string;

    await localApi
      .post(`/api/assemblies/${assemblyId}/participate/${userId}`)
      .then(async (response) => {
        if (response.data.statusCode === 201) {
          getAssembly(assemblyId).then((data) => {
            setAssembly(data);
          });
          ToastHandler.toast("Membre ajouté à l'assemblée avec succès", "success");
        } else {
          ToastHandler.toast(response.data.data, "error");
        }
      })
      .catch((error) => {
        ToastHandler.toast("Erreur lors de l'ajout du membre", "error");
        console.error("error", error);
      })
      .finally(() => {
        onOpenChange();
      });
  };

  React.useEffect(() => {
    getAllMembers().then((members) => setMembers(members));
  }, []);

  return (
    <div>
      <Button onClick={onOpen} color="primary">
        Ajouter un membre
      </Button>

      <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ModalContent>
            <ModalHeader>Ajouter un membre à l&apos;assemblée</ModalHeader>
            <ModalBody>
              <Select name="userId" label="Membre">
                {members.map((member) => (
                  <SelectItem
                    key={member.id}
                    value={member.id.toString()}
                    textValue={`${member.firstName} ${member.lastName}`}
                  >
                    {member.firstName} {member.lastName}
                  </SelectItem>
                ))}
              </Select>
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

export default HandleAddUserToAssembly;
