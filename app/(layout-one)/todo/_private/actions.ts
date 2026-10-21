"use server";

import { ResponseAction, ResponseActionReturnType } from "@/lib/response";
import { CreateTodoSchema } from "./schemas";

export const CreateTodoAction = async (
  data: FormData,
): ResponseActionReturnType =>
  ResponseAction(async () => {
    const obj = CreateTodoSchema?.parse({
      title: data?.get("title"),
    });

    // const response = await FetchAction({
    //   url: `${EnvServer?.API_URL}/todos`,
    //   method: "POST",
    // });

    return {
      success: true,
    };
  });
