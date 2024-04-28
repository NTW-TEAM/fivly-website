import ToastHandler from "@/tools/ToastHandler";
import { Members } from "@/types/members";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FaPen } from "react-icons/fa";
import RoleMembersDisplay from "./RoleMembersDisplay";
import ScopesMembersDisplay from "./ScopesMembersDisplay";
import axios from "axios";
import React from "react";

const HandleEditMembers = ({ user }: { user: Members }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userState, setUserState] = React.useState<Members>(user);

  /**
   * Handle submit form
   * @param e
   * @returns void
   */
  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios.patch(`/api/users/${user.id}`, user).then((res) => {
      if (res.status === 200) {
        setUserState(user);
        ToastHandler.toast("Membre modifié avec succès", "success");
      } else {
        ToastHandler.toast("Erreur lors de la modification du membre", "error");
      }
    });

    onOpenChange();

  }


  return (
    <div>
      <button onClick={onOpen}><FaPen /></button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <ModalContent>
              {(onClose) => (
                <div>
                  <ModalHeader className="flex flex-col gap-1">
                    Modifier {userState?.firstName} {userState?.lastName}
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex gap-2">
                    <Input label="First Name" defaultValue={userState?.firstName} type="text" isRequired onChange={(e) => userState.firstName = e.target.value} />
                    <Input label="Last Name" defaultValue={userState?.lastName} type="text" isRequired onChange={(e) => userState.lastName = e.target.value} />
                    </div>
                    <Input label="Email" defaultValue={userState?.email} type="email" isRequired onChange={(e) => userState.email = e.target.value} />
                    <Input label="Phone" defaultValue={userState?.phoneNumber} type="tel" isRequired onChange={(e) => userState.phoneNumber = e.target.value} />
                    <Input label="Numéro de rue" defaultValue={userState?.numberAndStreet} type="text" isRequired onChange={(e) => userState.numberAndStreet = e.target.value} />
                    <Input label="Code postal" defaultValue={userState?.postalCode} type="text" isRequired onChange={(e) => userState.postalCode = e.target.value} />
                    <Input label="Ville" defaultValue={userState?.city} type="text" isRequired onChange={(e) => userState.city = e.target.value} />
                    <Input label="Pays" defaultValue={userState?.country} type="text" isRequired onChange={(e) => userState.country = e.target.value} />

                    <div className="flex flex-col gap-2">
                      <label>Rôles</label>
                      <div className="flex items-center gap-1">
                        <RoleMembersDisplay user={userState} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label>Permissions</label>
                      <div className="flex items-center gap-1">
                        <ScopesMembersDisplay user={userState} />
                      </div>
                    </div>
                    
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Fermer
                    </Button>
                    <Button color="success" variant="light" type="submit">
                      Enregistrer
                    </Button>
                  </ModalFooter>
                </div>
              )}
            </ModalContent>
          </form>
        </Modal>
    </div>
  );
};

export default HandleEditMembers;
