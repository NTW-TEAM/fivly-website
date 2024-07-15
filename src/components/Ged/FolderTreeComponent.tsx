import React, { useState, useEffect } from "react";
import localApi from "@/services/localAxiosApi";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";

interface TreeNode {
  id?: number;
  name: string;
  path: string;
  children?: TreeNode[];
}

interface FolderTreeProps {
  initialPath: string;
  onFileSelect: (files: TreeNode[]) => void;
}

const FolderTreeComponent: React.FC<FolderTreeProps> = ({
  initialPath,
  onFileSelect,
}) => {
  const [data, setData] = useState<TreeNode[]>([]);

  const fetchFolderContents = async (path: string) => {
    const response = await localApi.post("/api/ged/folder/contents", { path });
    if (!response || !response.data) {
      throw new Error("Failed to fetch folder contents");
    }
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFolderContents(initialPath);
        const folders = response.folders.map((folder: any) => ({
          ...folder,
          children: [],
        }));
        setData([...folders]);
      } catch (error) {
        console.error("Error fetching folder contents:", error);
      }
    };

    fetchData();
  }, [initialPath]);

  const renderTree = (nodes: TreeNode[]) => {
    return nodes.map((node) => (
      <TreeNodeComponent
        key={node.path}
        node={node}
        onFileSelect={onFileSelect}
        fetchFolderContents={fetchFolderContents}
      />
    ));
  };

  return <div className="p-2">{renderTree(data)}</div>;
};

interface TreeNodeComponentProps {
  node: TreeNode;
  onFileSelect: (files: TreeNode[]) => void;
  fetchFolderContents: (
    path: string,
  ) => Promise<{ folders: any[]; files: any[] }>;
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  node,
  onFileSelect,
  fetchFolderContents,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<TreeNode[]>(node.children || []);
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = async () => {
    if (!isOpen) {
      try {
        const response = await fetchFolderContents(node.path);
        const folders = response.folders.map((folder: any) => ({
          ...folder,
          children: [],
        }));
        const files = response.files.map((file: any) => ({
          ...file,
          children: undefined,
        }));
        setChildren([...folders]);
        onFileSelect(files);
      } catch (error) {
        console.error("Error fetching folder contents:", error);
      }
    } else {
      setChildren([]);
      onFileSelect([]);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <div className="flex cursor-pointer items-center" onClick={handleClick}>
        {isOpen ? (
          <FcOpenedFolder className="mr-2" />
        ) : (
          <FcFolder className="mr-2" />
        )}
        <span>{node.name}</span>
      </div>
      {isOpen && children.length > 0 && (
        <div className="ml-4">{renderTree(children)}</div>
      )}
    </div>
  );

  function renderTree(nodes?: TreeNode[]) {
    if (!nodes) return null;
    return nodes.map((childNode) => (
      <TreeNodeComponent
        key={childNode.path}
        node={childNode}
        onFileSelect={onFileSelect}
        fetchFolderContents={fetchFolderContents}
      />
    ));
  }
};

export default FolderTreeComponent;
