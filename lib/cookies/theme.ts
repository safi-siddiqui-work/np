"use server";

import { cookies } from "next/headers";

export const setThemeCookie = async (theme: string) => {
  (await cookies()).set("theme", theme);
};

export const getThemeCookie = async () => {
  return (await cookies()).get("theme")?.value;
};
