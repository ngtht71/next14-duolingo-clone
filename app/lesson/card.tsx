import Image from "next/image";

import { useCallback } from "react";
import { useAudio, useKey } from "react-use";

import { cn } from "@/lib/utils";
import { challenges } from "@/db/schema";

type Props = {
  id: number;
  imageSrc: string | null;
  audioSrc: string | null;
  text: string;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none",
  type: typeof challenges.$inferSelect["type"];
  lessonId: number
};

export const Card = ({
  id,
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  onClick,
  status,
  disabled,
  type,
  lessonId
}: Props) => {
  const [audio, _, controls] = useAudio({ src: audioSrc || "" });

  const handleClick = useCallback(() => {
    if (disabled) return;
// this audio shit is async, it never returns (because we made it) so onClick is never reached.
    //controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);
  if(lessonId === 6) {
    return (
      <div onClick = {handleClick} className="w-full p-2 border-2 rounded-xl">
        <iframe src="http://127.0.0.1:8000/" className="h-full w-full"></iframe>
      </div>
    )
  }
  else return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
        selected && status === "correct" 
          && "border-green-300 bg-green-100 hover:bg-green-100",
        selected && status === "wrong" 
          && "border-rose-300 bg-rose-100 hover:bg-rose-100",
        disabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "lg:p-3 w-full"
      )}
    >
      {audio}
      {imageSrc && type === "SELECT" && (
        <div
          className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full"
        >
          <video src={imageSrc} className="h-full" loop autoPlay/>
        </div>
      )}
      <div className={cn(
        "flex items-center justify-between",
        type === "ASSIST" && "flex-row-reverse",
      )}>
        {type === "ASSIST" && <div />}
        {type !== "SELECT" && <p className={cn(
          "text-neutral-600 text-sm lg:text-base",
          selected && "text-sky-500",
          selected && status === "correct" 
            && "text-green-500",
          selected && status === "wrong" 
            && "text-rose-500",
        )}>
          {text}
        </p>}
        <div className={cn(
          "lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold",
          selected && "border-sky-300 text-sky-500",
          selected && status === "correct" 
            && "border-green-500 text-green-500",
          selected && status === "wrong" 
            && "border-rose-500 text-rose-500",
        )}>
          {shortcut}
        </div>
      </div>
    </div>
  );
};
