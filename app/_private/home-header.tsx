import { ModeToggle } from "@/components/general/mode-toggle";
import { WebRoutes } from "@/constants/routes/web-routes";
import Link from "next/link";

export const HomeHeader = () => {
  return (
    <header className="flex justify-between border-b px-4 pt-4">
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
