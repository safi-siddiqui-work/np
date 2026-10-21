import { ResponseBodyType } from "../response/types";

export const FetchAction = async ({
  url,
  method = "GET",
  type = "json",
  jsonBody,
  formData,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  type?: "json" | "form-data";
  jsonBody?: object;
  formData?: FormData;
}): Promise<ResponseBodyType> => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        // "Content-Type":
        //   type == "json"
        //     ? "application/json"
        //     : "application/x-www-form-urlencoded",
      },
      body: type == "json" ? JSON.stringify(jsonBody) : formData,
    });
    const data = await response.json();
    console.log(response, data);
    return {
      success: true,
      data: [],
    };
  } catch (err) {
    return {
      success: false,
      errors: [
        {
          code: "custom",
          path: [],
          message: "An error occurred while fetching data.",
        },
      ],
    };
  }
};
