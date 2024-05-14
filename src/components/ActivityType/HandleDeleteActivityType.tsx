import React from "react";
import axios from "axios";
import ToastHandler from "@/tools/ToastHandler";
import { FaTrash } from "react-icons/fa";
import { ActivityType } from "@/types/activityType";

const HandleDeleteActivityType = ({activityTypes, setActivityTypes, activityTypeDelete}: {activityTypes: ActivityType[]; setActivityTypes: React.Dispatch<React.SetStateAction<ActivityType[]>>; activityTypeDelete: ActivityType;}) => {
    const getAllActivityType = async () => {
      return new Promise<ActivityType[]>((resolve, reject) => {
      axios
          .get(`http://localhost:3001/api/activity-types`)
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
      axios
        .delete(
          `http://localhost:3001/api/activity-types/${activityTypeDelete.name}`,
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
