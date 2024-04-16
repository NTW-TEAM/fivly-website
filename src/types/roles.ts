import { Scopes } from "./scopes";

export type Roles = {
    name: string;
    description: string;
    scopes: Scopes[];
};