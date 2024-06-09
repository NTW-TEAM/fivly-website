import { Roles } from "./Roles";
import { Scopes } from "./Scopes";

export type Members = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  numberAndStreet: string;
  postalCode: string;
  city: string;
  country: string;
  lastConnection: string;
  scopes: Scopes[];
  roles: Roles[];
};
