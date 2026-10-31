import { ProfileData } from "@/lib/constants/data/profile";
import { Avatar, AvatarImage } from "@/lib/shadcn/components/ui/avatar";
import { Button } from "@/lib/shadcn/components/ui/button";
import {
  BoxIcon,
  DollarSignIcon,
  HandCoinsIcon,
  Layers2Icon,
  SparklesIcon,
} from "lucide-react";
import {
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";

export const HomeHero = () => {
  const techSkills = [
    {
      icon: SiNextdotjs,
      title: "Next.js",
    },
    {
      icon: Layers2Icon,
      title: "Full Stack",
    },
    {
      icon: SparklesIcon,
      title: "AI Engineer",
    },
    {
      icon: SiReact,
      title: "React",
    },
    {
      icon: SiTypescript,
      title: "TypeScript",
    },
    {
      icon: SiJavascript,
      title: "JavaScript",
    },
  ];
  const salesSkills = [
    {
      icon: BoxIcon,
      title: "Software",
    },
    {
      icon: DollarSignIcon,
      title: "Sales",
    },
    {
      icon: HandCoinsIcon,
      title: "Business",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center lg:py-20">
      <Avatar className="size-20">
        <AvatarImage
          src={ProfileData?.image}
          alt="SAFI"
        />
      </Avatar>
      <h1 className="text-5xl font-bold">SAFI SIDDIQUI</h1>
      {/* <h2 className="text-xl">{ProfileData?.headline}</h2> */}

      <div className="flex flex-wrap justify-center gap-2">
        {salesSkills?.map((a) => (
          <Button
            key={a?.title}
            size={"lg"}
            // variant={"secondary"}
          >
            <a.icon className="" />
            {a?.title}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {techSkills?.map((a) => (
          <Button
            key={a?.title}
            size={"lg"}
            variant={"outline"}
          >
            <a.icon className="" />
            {a?.title}
          </Button>
        ))}
      </div>
    </div>
  );
};
