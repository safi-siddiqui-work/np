import HtmlClient from "@/components/general/html-client";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Safi Siddiqui",
  description: "Safi Siddiqui",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HtmlClient>
        <body className="flex min-h-full flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        </body>
      </HtmlClient>
    </Suspense>
  );
}
