import { Scopes } from "./scopes";

export type activityTypesRoles = {
  id: string | number | undefined;
  name: string;
  description: string;
  scopes: Scopes[];
};