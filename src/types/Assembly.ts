import { AssemblyUser } from "./AssemblyUser";

export type Assembly = {
    id: number;
    isGeneral: boolean;
    hasStarted: boolean;
    datetime: string;
    description: string;
    quorum: number;
    location: string;
    participants: AssemblyUser[];
};
