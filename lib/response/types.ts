import { $ZodIssue } from "zod/v4/core";

export type ResponseBodyType = {
  success?: boolean;
  data?: unknown;
  errors?: $ZodIssue[];
};
