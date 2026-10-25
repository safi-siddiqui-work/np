import { ZodError } from "zod";
import { $ZodIssue } from "zod/v4/core";
import { ResponseAction } from "../response";
import { ResponseBodyDataType, ResponseBodyType } from "../response/types";

type RDDType = {
  type: string;
  loc: string[];
  msg: string;
};

type RDType = {
  detail?: RDDType[];
};

export const FetchAction = async ({
  url,
  method = "GET",
  jsonBody,
  formData,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  jsonBody?: object;
  formData?: FormData;
}): Promise<ResponseBodyType> =>
  ResponseAction(async () => {
    const response = await fetch(url, {
      method: method,
      headers: {
        // type == "json"
        "Content-Type": jsonBody
          ? "application/json"
          : "application/x-www-form-urlencoded",
      },
      body: jsonBody ? JSON.stringify(jsonBody) : formData,
    });
    const data = (await response.json()) as RDType;
    const res = ModifyResponse(data) as ResponseBodyDataType;

    return {
      success: true,
      data: res,
    };
  });

const ModifyResponse = (body: RDType): RDType => {
  // neglect body path to get field paths
  if (body?.detail) {
    const errors: $ZodIssue[] = body?.detail?.map(
      (item) =>
        ({
          code: "custom",
          path: [...item?.loc?.slice(1)],
          message: item?.msg,
        }) satisfies $ZodIssue,
    );

    throw new ZodError(errors);
  }
  return body;
};
