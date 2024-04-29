import ToastHandler from "@/tools/ToastHandler";
import { Members } from "@/types/members";
import { Roles } from "@/types/roles";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { FaPlus, FaPlusCircle, FaTimesCircle } from "react-icons/fa"; // Assurez-vous d'avoir installé react-icons

const RoleMembersDisplay = ({ user }: { user: Members }) => {
  const [roles, setRoles] = useState(user.roles);

  return (
    <div className="flex items-center gap-1">
      {roles.map((role, i) =>
        role.name.toLowerCase() !== "member" ? (
          <div key={role.name} className="flex items-center gap-1">
            <div className="flex items-center gap-2 rounded bg-primary px-2 py-1 text-sm text-white">
              <span>{role.name}</span>
            </div>
          </div>
        ) : (
          <div key={role.name}></div>
        ),
      )}
    </div>
  );
};

export default RoleMembersDisplay;
