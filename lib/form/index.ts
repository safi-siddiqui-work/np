"use client";

import { ResponseAction, ResponseActionReturnType } from "@/lib/response";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export const FormAction = async <T extends FieldValues>(
  form: UseFormReturn<T>,
  // obj: ResponseBodyType,
  obj: ResponseActionReturnType,
): ResponseActionReturnType =>
  ResponseAction(async () => {
    const res = await obj;
    if (!res?.success) {
      res?.errors?.forEach((error) => {
        form?.setError(error?.path?.at(0) as Path<T>, {
          message: error?.message,
        });
      });
    }
    return {
      success: true,
      // data: res?.data,
    };
  });
