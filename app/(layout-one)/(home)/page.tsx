import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WebRoutes } from "@/lib/constants/routes/web-routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-5xl font-bold">SAFI SIDDIQUI</h1>
        <h2 className="text-xl">Python FastAPI | React Next.js</h2>

        <div className="flex flex-wrap gap-2">
          <Button>Full Stack Developer</Button>
          <Button>Python Automation</Button>
          <Button>AI Engineer</Button>
          <Button>API Integration</Button>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-4">
        <Link href={WebRoutes?.todo}>Todo App</Link>
      </div>
    </div>
  );
}
