type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  return (
    <div className="sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <div></div>

      <h1 className="font-bold text-lg">
        {/* {title} */}
        {/* Tiêu đề khóa học */}
        SignLingo
      </h1>
      <div />
    </div>
  );
};
