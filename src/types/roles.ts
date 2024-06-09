import { Scopes } from "./Scopes";

export type Roles = {
  id: string | number | undefined;
  name: string;
  description: string;
  scopes: Scopes[];
};