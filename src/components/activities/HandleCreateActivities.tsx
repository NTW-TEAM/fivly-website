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
import {Activity} from "@/types/activity";
import {ActivityType} from "@/types/activityType";
import {ActivityCreateDTO} from "@/types/ActivityCreateDTO";
import {Members} from "@/types/members";

const HandleCreateActivities = ({activities, setActivities}: {activities: Activity[]; setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [activityTypes, setActivityTypes] = React.useState<ActivityType[]>([]);
    const [members, setMembers] = React.useState<Members[]>([]);

    const getAllActivityType = async () => {
        return new Promise<ActivityType[]>((resolve, reject) => {
        localApi
            .get(`/api/activity-types`)
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

    const getAllActivities = async () => {
        return new Promise<Activity[]>((resolve, reject) => {
        localApi
            .post(`/api/activities/search`)
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

    React.useEffect(() => {
        getAllActivityType().then((activityTypes) => {
            setActivityTypes(activityTypes);
        });

        getAllMembers().then((members) => {
            setMembers(members);
        });
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body: ActivityCreateDTO = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            beginDateTime: formData.get("startDate") as string,
            endDateTime: formData.get("endDate") as string,
            activityType: formData.get("activityType") as string,
            owner: parseInt(formData.get("userId") as string),
        };
        console.log(body);
        await localApi
            .post(`/api/activities`, body)
            .then(async (response) => {
                if (response.data.statusCode === 201) {
                    const activities = await getAllActivities();
                    setActivities(activities);
                }
                else {
                    ToastHandler.toast(response.data, "error");
                }
            })
            .catch((error) => {
                ToastHandler.toast("Erreur lors de l'ajout de l'activité", "error");
                console.error("error", error);
            })
            .finally(() => {
                onOpenChange();
            });
        ToastHandler.toast("Activité ajouté avec succès", "success");
    }
   
    return (
      <div>
        <Button onClick={onOpen} color="primary">
          Ajouter une activité
        </Button>

        <Modal isOpen={isOpen} onClose={() => onOpenChange()} size="lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <ModalContent>
              <ModalHeader>Ajouter une nouvelle activité</ModalHeader>
              <ModalBody>
                <Input
                  label="Titre de l'activité"
                  type="text"
                  name="title"
                  defaultValue=""
                  isRequired
                />
                <Input
                  label="Description de l'activité"
                  type="text"
                  name="description"
                  defaultValue=""
                  isRequired
                />
                <Input
                  label="Date de début"
                  type="datetime-local"
                  name="startDate"
                  defaultValue=""
                  isRequired
                />
                <Input
                  label="Date de fin"
                  type="datetime-local"
                  name="endDate"
                  defaultValue=""
                  isRequired
                />
                <Select label="Type d'activité" name="activityType" isRequired>
                  {activityTypes && activityTypes.map((activityType) => (
                    <SelectItem
                      key={activityType.name}
                      value={activityType.name}
                    >
                      {activityType.name}
                    </SelectItem>
                  ))}
                </Select>

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

export default HandleCreateActivities;
