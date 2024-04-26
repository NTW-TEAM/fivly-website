import ToastHandler from "@/tools/ToastHandler";
import { Members } from "@/types/members";
import { Roles } from "@/types/roles";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { FaPlus, FaPlusCircle, FaTimesCircle } from "react-icons/fa"; // Assurez-vous d'avoir installé react-icons

const HandleRoleMembers = ({ user }: { user: Members }) => {
  const [roles, setRoles] = useState(user.roles);
  const [allRoles, setAllRoles] = useState([]);
  const [role, setRole] = useState("");

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const getAllRoles = async () => {
    try {
      await axios
        .get(`http://localhost:3001/api/roles`)
        .then((response) => {
          if (response.status === 200) {
            setAllRoles(response.data);
          }
        });
    } catch (error) {
      console.error("error", error);
    }
  }

  const onOpenModal = async () => {
    await getAllRoles();  
    onOpen();
  }

  const deleteRole = (userId: number, roleName: string) => async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/users/${userId}/role/${roleName}`,
      ).then((response) => {
        if (response.data.statusCode === 200) {
            ToastHandler.toast("Role deleted", "success");
            setRoles(roles.filter(role => role.name !== roleName))
        }
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  const addRole = (userId: number, role: string) => async () => {
    if (!role) {
      ToastHandler.toast("Please select a role", "error");
      return;
    }
    try {
      await axios
        .put(`http://localhost:3001/api/users/${userId}/role/${role}`)
        .then((response) => {
          if (response.data.statusCode !== 200) {
            ToastHandler.toast("Error", "error");
            return;
          }

            ToastHandler.toast("Role added", "success");
            const roleInfo = allRoles.find((r: Roles) => r.name === role) as unknown as Roles;
            setRoles([...roles, roleInfo]);
        });
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {roles.map((role, i) =>
        role.name.toLowerCase() !== "member" ? (
          <div key={role.name} className="flex items-center gap-1">
            <div className="flex items-center gap-2 rounded bg-primary px-2 py-1 text-sm text-white">
              <span>{role.name}</span>
              <button onClick={deleteRole(user.id, role.name)}>
                <FaTimesCircle />
              </button>
            </div>
          </div>
        ) : (
          <div key={role.name}></div>
        ),
      )}

      <Button onPress={onOpenModal}><FaPlusCircle /></Button>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ajouter un rôle</ModalHeader>
              <ModalBody>
                <select onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select a role</option>
                  {allRoles.map((role: Roles, i) => (
                    <option key={role.name} value={role.name} {...(roles.find((r) => r.name === role.name) ? { disabled: true } : {})}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={addRole(user.id, role)}>
                  Ajouter
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default HandleRoleMembers;
