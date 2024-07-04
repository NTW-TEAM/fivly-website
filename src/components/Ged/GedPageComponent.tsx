// components/GedPageComponent.tsx
"use client";
import React, { useState, useEffect } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import ItemComponent from "./ItemComponent";
import PathComponent from "./PathComponent";
import localApi from "@/services/localAxiosApi";
import { TreeNode } from "@/types/TreeNode";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const GedPageComponent: React.FC = () => {
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
      const folders = response.folders.map((folder: any) => ({
        ...folder,
        type: "folder",
      }));
      const files = response.files.map((file: any) => ({
        ...file,
        type: "file",
      }));
      setItems([...folders, ...files]);
      setCurrentPath(path);
    } catch (error) {
      console.error("Error fetching folder contents:", error);
    }
  };

  useEffect(() => {
    handleFolderSelect("/");
  }, []);

  const updateFileName = (oldPath: string, newName: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.path === oldPath) {
          const newPath = item.path.replace(
            /[^/]*\/?$/,
            newName + (item.type === "folder" ? "/" : ""),
          );
          return { ...item, name: newName, path: newPath };
        }
        return item;
      }),
    );
  };

  const deleteFile = (path: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.path !== path));
  };

  const addItem = (newItem: TreeNode) => {
    setItems((prevItems) => [{ ...newItem }, ...prevItems]);
  };

  return (
    <DefaultLayout>
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
                item={{ name: "Add Item", path: "", type: "add" }}
                addItem={addItem}
                currentPath={currentPath}
              />
              {items.map((item) => (
                <ItemComponent
                  key={item.id + item.type}
                  item={item}
                  updateFileName={updateFileName}
                  deleteFile={deleteFile}
                  onFolderSelect={handleFolderSelect}
                  currentPath={currentPath}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default GedPageComponent;
