import localApi from "@/services/localAxiosApi";
import ToastHandler from "@/tools/ToastHandler";
import { Members } from "@/types/members";
import { Scopes } from "@/types/scopes";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";

const HandleScopesMembers = ({ user }: { user: Members }) => {
  const [scopes, setScopes] = useState(user.scopes);
  const [allScopes, setAllScopes] = useState([]);
  const [scope, setScope] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllScopes = async () => {
    try {
      await localApi.get(`/api/scopes`).then((response) => {
        if (response.status === 200) {
          setAllScopes(response.data);
        }
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  const onOpenModal = async () => {
    await getAllScopes();
    onOpen();
  };

  const updateUserScope = (userId: number, scopes: String[]) => async () => {
    return new Promise(async (resolve, reject) => {
      try {

        await localApi
          .put(`/api/users/${userId}/scopes`, {
            scopes: scopes,
          })
          .then((response) => {
            if (response.status !== 200) {
              ToastHandler.toast("Error", "error");
              reject();
            }

            ToastHandler.toast("Permissions modified", "success");
            resolve("success");
          });
      } catch (error) {
        console.error("error", error);
        reject();
      }
    });
  }

  const deleteScope = (userId: number, scopeName: string) => async () => {
    let scopesBody = scopes.map((s) => s.name);
    scopesBody = scopesBody.filter((s) => s !== scopeName);

    await updateUserScope(userId, scopesBody)();

    //update the state of the scopes
    setScopes(scopes.filter((s) => s.name !== scopeName))
  };

  const addScope = (userId: number, newScopes: string) => async () => {
    if (!newScopes) {
      ToastHandler.toast("Please select a permissions ", "error");
      return;
    }

    scopes.forEach((s) => {
      if (s.name === newScopes) {
        ToastHandler.toast("Permission already exists", "error");
        return;
      }
    });

    let scopesBody = scopes.map((s) => s.name);
    scopesBody.push(newScopes);

    await updateUserScope(userId, scopesBody)();

    setScopes([...scopes, { name: newScopes }]);
  };

  return (
    <div className="flex items-center gap-1">
      {scopes.map((scope, i) =>
        scope.name.toLowerCase() !== "member" ? (
          <div key={scope.name} className="flex items-center gap-1">
            <div className="flex items-center gap-2 rounded bg-purple-700 px-2 py-1 text-sm text-white">
              <span>{scope.description}</span>
              <button onClick={deleteScope(user.id, scope.name)}>
                <FaTimesCircle />
              </button>
            </div>
          </div>
        ) : (
          <div key={scope.name}></div>
        ),
      )}

      <button
        className="flex items-center gap-2 px-2 py-2"
        onClick={onOpenModal}
      >
        <FaPlusCircle />
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Ajouter des permissions à {user.firstName} {user.lastName}
              </ModalHeader>
              <ModalBody>
                <label htmlFor="permissions">Permissions</label>
                <select onChange={(e) => setScope(e.target.value)}>
                  <option value="">Select a permission</option>
                  {allScopes.map((scope: Scopes, i) => (
                    <option
                      key={scope.name}  
                      value={scope.name}
                      {...(scopes.find((s) => s.name === scope.name)
                        ? { disabled: true }
                        : {})}
                    >
                      {scope.description}
                    </option>
                  ))}
                </select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Annuler
                </Button>
                <Button
                  color="success"
                  variant="light"
                  onPress={addScope(user.id, scope)}
                >
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

export default HandleScopesMembers;
