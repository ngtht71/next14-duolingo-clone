import Image from "next/image";

type Props = {
  question: string;
};
export const LearningBubble: React.FC<{vidsrc: string | null | undefined}> = ({vidsrc}) => {
  return (
    <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[250px] w-full flex justify-center">
      {/* {vidsrc!=null && (<img
        src={vidsrc}
        alt="challenge video"
        className="hidden lg:block h-full"
      />) } */}
      {vidsrc!=null && (<video
        src={vidsrc}
        controls
        loop
        autoPlay
        className="hidden lg:block h-full"
      />) }
    </div>
  )
}
export const QuestionBubble = ({ question }: Props) => {
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <Image
        src="/mascot.svg"
        alt="Mascot"
        height={60}
        width={60}
        className="hidden lg:block"
      />
      <Image
        src="/mascot.svg"
        alt="Mascot"
        height={40}
        width={40}
        className="block lg:hidden"
      />
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
        {question}
        <div
          className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90"
        />
      </div>
    </div>
  );
};
