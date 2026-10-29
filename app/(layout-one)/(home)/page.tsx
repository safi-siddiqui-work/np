import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ProfileData } from "@/lib/constants/data/profile";
import { WebRoutes } from "@/lib/constants/routes/web-routes";
import { ListTodoIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <Avatar
          // size="lg"
          className="size-20"
        >
          <AvatarImage
            src={ProfileData?.image}
            alt="SAFI"
          />
          <AvatarFallback>SAFI</AvatarFallback>
        </Avatar>
        <h1 className="text-5xl font-bold">SAFI SIDDIQUI</h1>
        <h2 className="text-xl">{ProfileData?.headline}</h2>

        <div className="flex flex-wrap justify-center gap-2">
          {ProfileData?.skills?.map((a) => (
            <Button
              key={a}
              variant={"outline"}
            >
              {a}
            </Button>
          ))}
        </div>
      </div>

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
