import React from "react";
import { FaDownload, FaFile } from "react-icons/fa";
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
}

interface FileComponentProps {
  file: TreeNode;
  updateFileName: (path: string, newName: string) => void;
  deleteFile: (path: string) => void;
}

const FileComponent: React.FC<FileComponentProps> = ({
  file,
  updateFileName,
  deleteFile,
}) => {
  const handleDownload = async () => {
    try {
      const response = await localApi.get(
        `/api/ged/file/download?path=${file.path}`,
        {
          responseType: "blob",
        },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name);
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
    const newName = prompt("Enter new name for the file:", file.name);
    if (newName) {
      try {
        await localApi.put("/api/ged/file/rename", {
          path: file.path,
          newName,
        });
        updateFileName(file.path, newName);
        ToastHandler.toast("Fichier renommé avec succès", "success");
      } catch (error) {
        console.error("Error renaming file:", error);
        ToastHandler.toast("Erreur lors du renommage du fichier", "error");
      }
    }
  };

  const handleDelete = async () => {
    if (confirm(`Voulez vous vraiment supprimer le fichier ${file.name} ?`)) {
      try {
        await localApi.delete(`/api/ged/file`, {
          params: { path: file.path },
        });
        deleteFile(file.path);
        ToastHandler.toast("Fichier supprimé avec succès", "success");
      } catch (error) {
        console.error("Error deleting file:", error);
        ToastHandler.toast("Erreur lors de la suppression du fichier", "error");
      }
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex flex-col items-center rounded border p-2 shadow-md">
          <FaFile className="mb-2 text-3xl" />
          <span className="text-sm">{file.name}</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={handleDownload}>
          Télécharger
          <ContextMenuShortcut>
            <FaDownload />
          </ContextMenuShortcut>
        </ContextMenuItem>

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

export default FileComponent;
