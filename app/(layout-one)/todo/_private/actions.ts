"use server";

import { ApiRoutes } from "@/lib/constants/routes/api-routes";
import { FetchAction } from "@/lib/fetch";
import { ResponseAction, ResponseActionReturnType } from "@/lib/response";
import { ZodError } from "zod";
import { CreateTodoSchema } from "./schemas";

export const CreateTodoAction = async (
  data: FormData,
): ResponseActionReturnType =>
  ResponseAction(async () => {
    const obj = CreateTodoSchema?.parse({
      name: data?.get("name"),
    });

    const response = await FetchAction({
      url: ApiRoutes?.todos?.create,
      method: "POST",
      jsonBody: obj,
    });
    if (!response?.success && response?.errors) {
      throw new ZodError(response?.errors);
    }

    return {
      success: response?.success,
    };
  });
