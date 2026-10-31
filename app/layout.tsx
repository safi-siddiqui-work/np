import HtmlClient from "@/lib/shadcn/components/general/html-client";
import { ThemeProvider } from "@/lib/shadcn/components/providers/theme-provider";
import { Particles } from "@/lib/shadcn/components/ui/particles";
import { Toaster } from "@/lib/shadcn/components/ui/toast";
import { TooltipProvider } from "@/lib/shadcn/components/ui/tooltip";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Safi Siddiqui",
  description: "Next.js TypeScript | Software | Business | Sales",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HtmlClient>
        <body className="flex min-h-full flex-col">
          <Particles className="absolute top-0 -z-1 h-full w-full" />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </HtmlClient>
    </Suspense>
  );
}
