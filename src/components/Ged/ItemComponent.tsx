// components/ItemComponent.tsx
import React, { useState } from "react";
import { FaDownload, FaFile, FaFolder } from "react-icons/fa";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import { FaLock, FaDeleteLeft } from "react-icons/fa6";
import { BiRename } from "react-icons/bi";
import { LuFolderInput } from "react-icons/lu";
import ToastHandler from "@/tools/ToastHandler";
import localApi from "@/services/localAxiosApi";
import { FcFolder, FcFile, FcPlus } from "react-icons/fc";
import AddItemModal from "./AddItemModal";
import { TreeNode } from "@/types/TreeNode";

interface ItemComponentProps {
  item: TreeNode;
  updateFileName?: (path: string, newName: string) => void;
  deleteFile?: (path: string) => void;
  onFolderSelect?: (path: string) => void;
  addItem?: (newItem: TreeNode) => void;
  currentPath: string;
}

const ItemComponent: React.FC<ItemComponentProps> = ({
  item,
  updateFileName = () => {},
  deleteFile = () => {},
  onFolderSelect = () => {},
  addItem = () => {},
  currentPath,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadFile = async () => {
    try {
      const response = await localApi.get(
        `/api/ged/file/download?path=${item.path}`,
        {
          responseType: "blob",
        },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", item.name);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      ToastHandler.toast("Fichier télécharger avec succès", "success");
    } catch (error) {
      console.error("Error downloading file:", error);
      ToastHandler.toast("Erreur lors du téléchargement du fichier", "error");
    }
  };

  const handleRenameItem = async () => {
    const newName = prompt(
      `Enter new name for the ${item.type === "file" ? "file" : "folder"}:`,
      item.name,
    );
    if (newName) {
      try {
        const route =
          item.type === "file"
            ? "/api/ged/file/rename"
            : "/api/ged/folder/rename";
        await localApi.put(route, {
          path: item.path,
          newName,
        });
        updateFileName?.(item.path, newName);
        ToastHandler.toast(
          `${item.type === "file" ? "Fichier" : "Dossier"} renommé avec succès`,
          "success",
        );
      } catch (error) {
        ToastHandler.toast(
          `Erreur lors du renommage du ${item.type === "file" ? "fichier" : "dossier"}`,
          "error",
        );
      }
    }
  };

  const handleDeleteItem = async () => {
    if (
      confirm(
        `Voulez vous vraiment supprimer le ${item.type === "file" ? "fichier" : "dossier"} ${
          item.name
        } ?`,
      )
    ) {
      try {
        const route =
          item.type === "file" ? "/api/ged/file" : "/api/ged/folder";
        await localApi.delete(route, {
          params: { path: item.path },
        });
        deleteFile?.(item.path);
        ToastHandler.toast(
          `${item.type === "file" ? "Fichier" : "Dossier"} supprimé avec succès`,
          "success",
        );
      } catch (error) {
        ToastHandler.toast(
          `Erreur lors de la suppression du ${item.type === "file" ? "fichier" : "dossier"}`,
          "error",
        );
      }
    }
  };

  const handleFolderClick = () => {
    onFolderSelect?.(item.path);
  };

  const handleAddItemClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (item.type === "add") {
    return (
      <>
        <div
          className="flex cursor-pointer flex-col items-center rounded border p-2 shadow-md"
          onClick={handleAddItemClick}
        >
          <FcPlus className="mb-2 text-3xl" />
          <span className="text-sm">Add Item</span>
        </div>
        <AddItemModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          addItem={addItem}
          currentPath={currentPath}
        />
      </>
    );
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className="flex cursor-pointer flex-col items-center rounded border p-2 shadow-md"
          onClick={item.type === "folder" ? handleFolderClick : undefined}
          title={item.name}
        >
          {item.type === "file" ? (
            <FcFile className="mb-2 text-3xl" />
          ) : (
            <FcFolder className="mb-2 text-3xl" />
          )}
          <span className={`text-sm ${item.name.length > 9 ? 'overflow-hidden' : ''}`}>{item.name.length > 9 ? `${item.name.substring(0, 9)}...` : item.name}</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        {item.type === "file" && (
          <ContextMenuItem inset onClick={handleDownloadFile}>
            Télécharger
            <ContextMenuShortcut>
              <FaDownload />
            </ContextMenuShortcut>
          </ContextMenuItem>
        )}
        <ContextMenuItem inset onClick={handleRenameItem}>
          Renommer
          <ContextMenuShortcut>
            <BiRename />
          </ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem inset onClick={handleDeleteItem}>
          Supprimer
          <ContextMenuShortcut>
            <FaDeleteLeft />
          </ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Autres</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Déplacer
              <ContextMenuShortcut>
                <LuFolderInput />
              </ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Permission
              <ContextMenuShortcut>
                <FaLock />
              </ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ItemComponent;
