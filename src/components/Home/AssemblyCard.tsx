import React from "react";
import { FaUsers } from "react-icons/fa";
import {Assembly} from "@/types/Assembly";
import {Button} from "@nextui-org/react";

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
            <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark" key={assembly.id}>
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <FaUsers className="fill-primary dark:fill-white" />
                </div>

                <div className="mt-4">
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                        {description}
                    </h4>
                    <span className="text-sm font-medium">{new Date(datetime).toLocaleString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    })}
                    </span>

                    <br/>
                    <span className="text-sm font-medium">Lieu: {location}</span>
                    <br/>
                    <span className="text-sm font-medium">Quorum: {quorum}</span>


                    <div className="mt-4 flex justify-end gap-2">
                        <a href={`/assemblies/${assembly.id}`}>
                            <Button color="primary">Voir plus</Button>
                        </a>
                    </div>
                </div>
            </div>
    );
};

export default AssemblyCard;
