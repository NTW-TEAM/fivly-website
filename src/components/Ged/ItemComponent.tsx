import React from "react";
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
import axios from "axios";
import ToastHandler from "@/tools/ToastHandler";
import localApi from "@/services/localAxiosApi";

interface TreeNode {
  id?: number;
  name: string;
  path: string;
  type: "file" | "folder";
}

interface ItemComponentProps {
  item: TreeNode;
  updateFileName: (path: string, newName: string) => void;
  deleteFile: (path: string) => void;
  onFolderSelect: (path: string) => void;
}

const ItemComponent: React.FC<ItemComponentProps> = ({
  item,
  updateFileName,
  deleteFile,
  onFolderSelect,
}) => {
  const handleDownload = async () => {
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

  const handleRename = async () => {
    const newName = prompt("Enter new name for the file:", item.name);
    if (newName) {
      try {
        await localApi.put("/api/ged/file/rename", {
          path: item.path,
          newName,
        });
        updateFileName(item.path, newName);
        ToastHandler.toast("Fichier renommé avec succès", "success");
      } catch (error) {
        console.error("Error renaming file:", error);
        ToastHandler.toast("Erreur lors du renommage du fichier", "error");
      }
    }
  };

  const handleDelete = async () => {
    if (confirm(`Voulez vous vraiment supprimer le fichier ${item.name} ?`)) {
      try {
        await localApi.delete(`/api/ged/file`, {
          params: { path: item.path },
        });
        deleteFile(item.path);
        ToastHandler.toast("Fichier supprimé avec succès", "success");
      } catch (error) {
        console.error("Error deleting file:", error);
        ToastHandler.toast("Erreur lors de la suppression du fichier", "error");
      }
    }
  };

  const handleFolderClick = () => {
    onFolderSelect(item.path);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className="flex cursor-pointer flex-col items-center rounded border p-2 shadow-md"
          onClick={item.type === "folder" ? handleFolderClick : undefined}
        >
          {item.type === "file" ? (
            <FaFile className="mb-2 text-3xl" />
          ) : (
            <FaFolder className="mb-2 text-3xl" />
          )}
          <span className="text-sm">{item.name}</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        {item.type === "file" && (
          <ContextMenuItem inset onClick={handleDownload}>
            Télécharger
            <ContextMenuShortcut>
              <FaDownload />
            </ContextMenuShortcut>
          </ContextMenuItem>
        )}
        <ContextMenuItem inset onClick={handleRename}>
          Renommer
          <ContextMenuShortcut>
            <BiRename />
          </ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem inset onClick={handleDelete}>
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
