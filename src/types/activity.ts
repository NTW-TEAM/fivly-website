import {Members} from "@/types/members";

export type MaterialSerialNumber = {
    serialNumber: string;
};

export type Activity = {
    id: number;
    title: string;
    description: string;
    beginDateTime: string;
    endDateTime: string;
    activityType: string;
    creator: string;
    participants: Members[];
    materials: MaterialSerialNumber[];
};
