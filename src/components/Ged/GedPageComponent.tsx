"use client";
import React, { useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import DefaultLayout from "../Layouts/DefaultLayout";
import FolderTreeComponent from "./FolderTreeComponent";
import FileComponent from "./FileComponent";

interface TreeNode {
  id?: number;
  name: string;
  path: string;
  children?: TreeNode[];
}

const GedPageComponent: React.FC = () => {
  const [files, setFiles] = useState<TreeNode[]>([]);

  const handleFileSelect = (selectedFiles: TreeNode[]) => {
    setFiles(selectedFiles);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gestion éléctronique des documents" />
      <div className="grid grid-cols-5 gap-4">
        <div className="sm:display-none col-span-1 rounded-sm border border-stroke bg-white px-2 pb-2 pt-4.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4.5">
          <div className="container">
            <h1 className="text-center text-2xl font-bold text-black dark:text-white">
              GED
            </h1>
            <p className="mt-2 text-center text-xs dark:text-white">
              Gestion éléctronique des documents
            </p>
            <hr className="mb-3 mt-3 border-stroke" />
          </div>
          <FolderTreeComponent initialPath="/" onFileSelect={handleFileSelect} />
        </div>
        <div className="sm:display-none col-span-4 rounded-sm border border-stroke bg-white px-2 pb-2 pt-4.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4.5">
          <div className="container">
            <h1 className="text-center text-2xl font-bold text-black dark:text-white">
              Files
            </h1>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {files.map((file) => (
                <FileComponent key={file.path} file={file} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default GedPageComponent;
