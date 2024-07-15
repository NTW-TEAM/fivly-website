// types/formidable.d.ts

declare module "formidable" {
  import { IncomingMessage } from "http";
  import { Stream } from "stream";

  export interface File {
    filepath: string;
    originalFilename?: string;
    mimetype?: string;
    size: number;
  }

  export interface Fields {
    [key: string]: string | string[];
  }

  export interface Files {
    [key: string]: File | File[];
  }

  export interface FormidableError extends Error {
    httpCode?: number;
  }

  export class IncomingForm extends Stream {
    parse(
      req: IncomingMessage,
      callback?: (err: FormidableError, fields: Fields, files: Files) => void,
    ): void;

    parse(
      req: IncomingMessage,
      callback?: (err: any, fields: any, files: any) => void,
    ): void;
  }
}
