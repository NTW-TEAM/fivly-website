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
import localApi from "@/services/localAxiosApi";

interface TreeNode {
  id?: number;
  name: string;
  path: string;
}

interface FileComponentProps {
  file: TreeNode;
}

const FileComponent: React.FC<FileComponentProps> = ({ file }) => {

  const handleDownload = async () => {
    try {
      const response = await localApi.get(`/api/ged/file/download?path=${file.path}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log("URL:", url)
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
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
          <ContextMenuShortcut><FaDownload /></ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem inset>
          Renommer
          <ContextMenuShortcut><BiRename /></ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem inset>
          Supprimer
          <ContextMenuShortcut><FaDeleteLeft /></ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Autres</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
                Déplacer
                <ContextMenuShortcut><LuFolderInput /></ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
                Permission
                <ContextMenuShortcut><FaLock /></ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

      </ContextMenuContent>
    </ContextMenu>
  );
};

export default FileComponent;
