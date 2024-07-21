import {Members} from "@/types/members";

export type Activity = {
    id: number;
    title: string;
    description: string;
    beginDateTime: string;
    endDateTime: string;
    activityType: string;
    creator: string;
    participants: Members[];
};
