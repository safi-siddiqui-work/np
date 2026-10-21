import { ZodError } from "zod";
import { ResponseBodyType } from "./types";

export type ResponseActionReturnType = ReturnType<typeof ResponseAction>;

export const ResponseAction = async (
  callback: () => Promise<ResponseBodyType>,
): Promise<ResponseBodyType> => {
  try {
    return await callback();
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        success: false,
        errors: err?.issues,
      };
    }

    return {
      success: false,
      errors: [
        {
          code: "custom",
          path: [],
          message: "An error occurred while processing the request.",
        },
      ],
    };
  }
};
