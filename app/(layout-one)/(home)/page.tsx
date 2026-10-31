import { WebRoutes } from "@/lib/constants/routes/web-routes";
import { Button } from "@/lib/shadcn/components/ui/button";
import { ListTodoIcon } from "lucide-react";
import Link from "next/link";
import { HomeHero } from "./_private/home-hero";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <HomeHero />

      <div className="flex flex-wrap gap-4">
        <Button
          render={
            <Link href={WebRoutes?.todo}>
              <ListTodoIcon />
              Todo App
            </Link>
          }
          nativeButton={false}
        />
      </div>
    </div>
  );
}
