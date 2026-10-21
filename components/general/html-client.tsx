import { getThemeCookie } from "@/lib/cookies/theme";
import { cn } from "cn";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default async function HtmlClient({
  children,
}: {
  children: ReactNode;
}) {
  const theme = await getThemeCookie();
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        "h-full scroll-smooth font-sans antialiased",
        theme,
      )}
      style={{
        colorScheme: theme,
      }}
    >
      {children}
    </html>
  );
}
