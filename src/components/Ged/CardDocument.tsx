import { File } from "@/types/file";
import React, { ReactNode } from "react";
import { MdFileDownload, MdOutlinePushPin } from "react-icons/md";

const CardDocument: React.FC<File> = ({
  title,
  size,
  dateImport,
  userImport,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">

        <div className="flex items-end justify-between">
          <h4 className="text-title-sm font-bold text-black dark:text-white">Document épinglé !</h4>
          <MdOutlinePushPin className="text-2xl text-primary rotate-45" />
        </div>

        <div className="flex gap-4 mt-4 items-center">
          <div className="h-25 w-50 bg-meta-2 dark:bg-meta-4 rounded-md flex items-center justify-center">
            <MdFileDownload className="text-7xl text-primary" />
          </div>
          <div className="w-60 flex flex-col gap-2">
            <span className="text-sm font-medium">{title}</span>
            <span className="text-sm font-medium">{size}</span>
            <span className="text-sm font-medium">{dateImport}</span>
            <span className="text-sm font-medium">par {userImport}</span>
          </div>
        </div>

        

    </div>
  );
};

export default CardDocument;
