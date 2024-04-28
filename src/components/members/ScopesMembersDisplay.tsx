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

const ScopesMembersDisplay = ({ user }: { user: Members }) => {
  const [scopes, setScopes] = useState(user.scopes);

  return (
    <div className="flex items-center gap-1">
      {scopes.map((scope, i) =>
        scope.name.toLowerCase() !== "member" ? (
          <div key={scope.name} className="flex items-center gap-1">
            <div className="flex items-center gap-2 rounded bg-purple-700 px-2 py-1 text-sm text-white">
              <span>{scope.description}</span>
            </div>
          </div>
        ) : (
          <div key={scope.name}></div>
        ),
      )}
    </div>
  );
};

export default ScopesMembersDisplay;
