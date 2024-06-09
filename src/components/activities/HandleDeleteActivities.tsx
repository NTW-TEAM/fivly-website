import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import { FaTrash } from "react-icons/fa";
import localApi from "@/services/localAxiosApi";
import { Activity } from "@/types/Activity";

const HandleDeleteActivities = ({activities, setActivities, activitieDelete}: {activities: Activity[]; setActivities: React.Dispatch<React.SetStateAction<Activity[]>>; activitieDelete: Activity;}) => {
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

    function deleteActivitie(): void {
      console.log(activitieDelete.id)
      localApi
        .delete(
          `/api/activities/${activitieDelete.id}`,
        )
        .then((response) => {
          if (response.status === 200) {
            ToastHandler.toast("Type d'activité supprimé", "success");
            getAllActivities().then((data) => {
              setActivities(data);
            });
          }
        })
        .catch((error) => {
          console.error("error", error);
          ToastHandler.toast("Erreur lors de la suppression du type d'activité", "error");
        });
    }

    return (
      <div>
        <button className="text-primary" onClick={deleteActivitie}>
          <FaTrash />
        </button>
      </div>
    );
};

export default HandleDeleteActivities;
