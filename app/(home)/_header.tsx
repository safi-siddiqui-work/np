import { ModeToggle } from "@/components/general/mode-toggle";
import { WebRoutes } from "@/constants/routes/web-routes";
import Link from "next/link";

export const HomeHeader = () => {
  return (
    <header className="flex justify-between p-4">
      <Link
        href={WebRoutes.home}
        className=""
      >
        Home
      </Link>
      
      <Link
        href={WebRoutes.home}
        className=""
      >
        Home
      </Link>

      <ModeToggle />
    </header>
  );
};
