import React from "react";
import { FaUsers } from "react-icons/fa";
import {Assembly} from "@/types/Assembly";

interface AssemblyCardProps {
    assembly: Assembly;
    description: string;
    datetime: string;
    location: string;
    quorum: number;
}

const AssemblyCard: React.FC<AssemblyCardProps> = ({
    assembly,
                                                       description,
                                                       datetime,
                                                       location,
                                                       quorum,
                                                   }) => {
    return (
        <a href={`/assemblies/${assembly.id}`} key={assembly.id}>

            <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <FaUsers className="fill-primary dark:fill-white" />
                </div>

                <div className="mt-4">
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                        {description}
                    </h4>
                    <span className="text-sm font-medium">{new Date(datetime).toLocaleString()}</span>
                    <br />
                    <span className="text-sm font-medium">Lieu: {location}</span>
                    <br />
                    <span className="text-sm font-medium">Quorum: {quorum}</span>
                </div>
            </div>
        </a>
    );
};

export default AssemblyCard;
