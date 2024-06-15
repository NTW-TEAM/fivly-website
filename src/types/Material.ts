import { MaterialModel } from "./MaterialModel";

export type Material = {
  serialNumber: string;
  materialModel: MaterialModel;
  activities: [];
  local: string | null;
};
