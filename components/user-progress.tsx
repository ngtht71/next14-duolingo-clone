import Image from "next/image";
import { InfinityIcon } from "lucide-react";

import { courses } from "@/db/schema";
import { Button } from "@/components/ui/button";

type Props = {
  // activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;

};

export const UserProgress = ({
  // activeCourse,
  points,
  hearts,

}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Button variant="ghost" className="text-orange-500">
        <Image src="/points.svg" height={28} width={28} alt="Points" className="mr-2" />
        {points}
      </Button>

      <Button variant="ghost" className="text-rose-500">
        <Image src="/heart.svg" height={22} width={22} alt="Hearts" className="mr-2" />
        {hearts}
      </Button>
    </div>
  );
};
