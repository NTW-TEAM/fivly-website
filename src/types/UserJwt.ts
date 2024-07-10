import { Roles } from "./roles";
import { Scopes } from "./Scopes";

export type UserJwt = {
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
  isActive: boolean;
  scopes: Scopes[];
  roles: Roles[];
  iat: number;
  exp: number;
};
