import Image from "next/image";

const StatsCard = ({ title, span, icon, count, growth, timeline }) => {
  return (
    <div className="bg-white w-full p-4 flex flex-col justify-between rounded-xl shadow-lg">
      <div className="flex justify-between  pb-6">
        <div>
          <p className=" capitalize text-tertiary text-sm font-medium">
            {title} <br /> {span}
          </p>
          <span className="text-secondary text-2xl font-bold">{count}</span>
        </div>
        <Image
          className="w-14 h-14 "
          src={icon}
          alt="group"
          width="100"
          height="100"
        />
      </div>
      <p className="text-[#606060] font-medium">
        <span className="text-[#00B69B]">
          <i className="ri-arrow-right-up-long-fill text-sm"></i> {growth}%{" "}
        </span>
        Up from {timeline}
      </p>
    </div>
  );
};

export default StatsCard;
