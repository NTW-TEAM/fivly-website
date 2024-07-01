// components/FileComponent.tsx
import React from "react";
import { FaFile } from "react-icons/fa";
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

interface TreeNode {
  id?: number;
  name: string;
  path: string;
}

interface FileComponentProps {
  file: TreeNode;
}

const FileComponent: React.FC<FileComponentProps> = ({ file }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex flex-col items-center rounded border p-2 shadow-md">
          <FaFile className="mb-2 text-3xl" />
          <span className="text-sm">{file.name}</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Open
          <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Download
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>
          Delete
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Actions</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Rename</ContextMenuItem>
            <ContextMenuItem>Move</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default FileComponent;
