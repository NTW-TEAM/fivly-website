// GedPageComponent.tsx
"use client";
import React, { useState, useEffect } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import ItemComponent from "./ItemComponent";
import PathComponent from "./PathComponent";
import localApi from "@/services/localAxiosApi";
import { TreeNode } from "@/types/TreeNode";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { UserJwt } from "@/types/UserJwt";

interface GedPageComponentProps {
  user: UserJwt;
}

const GedPageComponent: React.FC<GedPageComponentProps> = ({ user }) => {
  const [items, setItems] = useState<TreeNode[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("/");

  const fetchFolderContents = async (path: string) => {
    const response = await localApi.post("/api/ged/folder/contents", { path });
    if (!response || !response.data) {
      throw new Error("Failed to fetch folder contents");
    }
    return response.data;
  };

  const handleFolderSelect = async (path: string) => {
    try {
      if (!path.endsWith("/")) {
        path += "/";
      }
      const response = await fetchFolderContents(path);
      const folders = response.folders.map((folderData: any) => ({
        ...folderData.folder,
        type: "folder",
        userPermissions: folderData.userPermissions.filter((permission: any) => permission.id && permission.access >= 1),
        rolePermissions: folderData.rolePermissions,
        requesterAccess: folderData.requesterAccess,
      }));
      const files = response.files.map((fileData: any) => ({
        ...fileData.file,
        type: "file",
        userPermissions: fileData.userPermissions,
        rolePermissions: fileData.rolePermissions,
        requesterAccess: fileData.requesterAccess,
      }));
      setItems([...folders, ...files]);
      setCurrentPath(path);
    } catch (error) {
      console.error("Error fetching folder contents:", error);
    }
  };

  const refreshFolderContents = () => {
    handleFolderSelect(currentPath);
  }

  useEffect(() => {
    handleFolderSelect("/");
  }, []);

  const updateFileName = (oldPath: string, newName: string) => {
    setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.path === oldPath) {
            const newPath = item.path.replace(
                /[^/]*\/?$/,
                newName + (item.type === "folder" ? "/" : "")
            );
            return { ...item, name: newName, path: newPath };
          }
          return item;
        })
    );
  };

  const deleteFile = (path: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.path !== path));
  };

  const addItem = (newItem: TreeNode) => {
    setItems((prevItems) => [{ ...newItem }, ...prevItems]);
    refreshFolderContents(); // Refresh the folder contents after adding an item
  };

  return (
      <DefaultLayout user={user}>
        <Breadcrumb pageName={"GED"} />
        <div className="grid grid-cols-5 gap-4">
          <div className="sm:display-none col-span-5 rounded-sm border border-stroke bg-white px-2 pb-2 pt-4.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4.5">
            <div className="container">
              <PathComponent
                  currentPath={currentPath}
                  onFolderSelect={handleFolderSelect}
              />
              <div className="mt-4 grid grid-cols-8 gap-4">
                <ItemComponent
                    item={{ name: "Add Item", path: "", type: "add" , userPermissions: [], rolePermissions: [], requesterAccess: 0}}
                    addItem={addItem}
                    currentPath={currentPath}
                    user={user}
                    refreshFolderContents={refreshFolderContents}
                />
                {
                  items.length === 0 ? (
                        items.map((item) => (
                              <ItemComponent
                                  key={item.id + item.type}
                                  item={item}
                                  updateFileName={updateFileName}
                                  deleteFile={deleteFile}
                                  onFolderSelect={handleFolderSelect}
                                  currentPath={currentPath}
                                  user={user}
                                  refreshFolderContents={refreshFolderContents} // Pass the function here
                              />
                          ))
                    ) : (
                        <div className="col-span-8">
                          <p className="text-center text-gray-500">Vous n'avez accès à aucun fichier ou dossier dans ce répertoire.</p>
                        </div>
                    )
                }

              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
  );
};

export default GedPageComponent;
