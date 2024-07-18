import { MaterialModel } from "./MaterialModel";
import {local} from "@/types/local";

export type Material = {
  serialNumber: string;
  materialModel: MaterialModel;
  activities: [];
  local: local;
};
