import { ModeToggle } from "@/components/general/mode-toggle";
import { WebRoutes } from "@/lib/constants/routes/web-routes";
import Link from "next/link";

export const GeneralHeader = () => {
  return (
    <header className="flex items-center justify-between border-b px-4 py-2">
      <Link
        href={WebRoutes.home}
        className="font-bold"
      >
        Safi Siddiqui
      </Link>

      <ModeToggle />
    </header>
  );
};
