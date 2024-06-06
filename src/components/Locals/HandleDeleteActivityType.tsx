import React from "react";
import ToastHandler from "@/tools/ToastHandler";
import { FaTrash } from "react-icons/fa";
import { ActivityType } from "@/types/activityType";
import localApi from "@/services/localAxiosApi";

const HandleDeleteActivityType = ({activityTypes, setActivityTypes, activityTypeDelete}: {activityTypes: ActivityType[]; setActivityTypes: React.Dispatch<React.SetStateAction<ActivityType[]>>; activityTypeDelete: ActivityType;}) => {
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

    function deleteActivityType(): void {
      localApi
        .delete(
          `/api/activity-types/${activityTypeDelete.name}`,
        )
        .then((response) => {
          if (response.status === 200) {
            ToastHandler.toast("Type d'activité supprimé", "success");
            getAllActivityType().then((data) => {
              setActivityTypes(data);
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
        <button className="text-primary" onClick={deleteActivityType}>
          <FaTrash />
        </button>
      </div>
    );
};

export default HandleDeleteActivityType;
