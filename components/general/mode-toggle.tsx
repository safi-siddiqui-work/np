"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getThemeCookie, setThemeCookie } from "@/lib/cookies/theme";
import { useCallback, useEffect } from "react";

export function ModeToggle() {
  const { setTheme, systemTheme } = useTheme();

  const setThemeCB = useCallback(
    async (th: "dark" | "light" | "system") => {
      if (th == "system" && systemTheme) {
        await setThemeCookie(systemTheme);
        setTheme(systemTheme);
      } else {
        await setThemeCookie(th);
        setTheme(th);
      }
    },
    [setTheme, systemTheme],
  );

  useEffect(() => {
    getThemeCookie()?.then((res) => {
      if (!res) {
        setThemeCB("system");
      }
    });
  }, [setThemeCB]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setThemeCB("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeCB("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeCB("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
