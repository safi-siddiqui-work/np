import { $ZodIssue } from "zod/v4/core";

export type ResponseBodyType = {
  success?: boolean;
  data?: ResponseBodyDataType;
  errors?: $ZodIssue[];
};

export type ResponseBodyDataType = {
  todo?: TodoType;
};

type TodoType = {
  name?: string;
};
