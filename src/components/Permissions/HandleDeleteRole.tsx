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
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { Roles } from "@/types/roles";
import { Scopes } from "@/types/scopes";
import axios from "axios";
import ToastHandler from "@/tools/ToastHandler";
import { FaTrash } from "react-icons/fa";

const HandleDeleteRole = ({roles, setRoles, roleToDelete}: {roles: Roles[]; setRoles: React.Dispatch<React.SetStateAction<Roles[]>>; roleToDelete: Roles;}) => {

    const getAllRoles = async () => {
        return new Promise<Roles[]>((resolve, reject) => {
        axios
            .get(`http://localhost:3001/api/roles`)
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

    function deleteRole(): void {
        axios
            .delete(`http://localhost:3001/api/roles/${roleToDelete.name}`)
            .then((response) => {
                if (response.status === 200) {
                    ToastHandler.toast("Rôle supprimé avec succès", "success");
                    getAllRoles().then((data) => {
                        setRoles(data);
                    });
                }
            })
            .catch((error) => {
                console.error("error", error);
                ToastHandler.toast("Erreur lors de la suppression du rôle", "error");
            });

    }

    return (
      <div>
        <button className="text-primary" onClick={deleteRole}>
          <FaTrash />
        </button>
      </div>
    );
};

export default HandleDeleteRole;
