"use client";
import StatsCard from "../molecules/StatsCard";
import data from "@/public/db/data.json";
import CertificationRate from "../charts/CertificationRate";
import OverlayModal from "../common/OverlayModal";
import { useEffect, useState } from "react";
// import AddBatch from "../molecules/AddBatch";
// import TopStudents from "../molecules/TopStudents";
import CurrentBatch from "../molecules/CurrentBatch";
import { useDispatch } from "react-redux";
import { getallstats } from "@/redux/slice/dashboard-slice";

const HomePage = () => {
  const [isBatch, setIsBatch] = useState(false);
  // const { stats } = data;
  let dispatch = useDispatch();
  const [Value, setValue] = useState({});
  console.log(Value);

  const getallvalue = async () => {
    let res = await dispatch(getallstats());
    setValue(res?.payload);
  };
  useEffect(() => {
    getallvalue();
  }, [dispatch]);

  let stats = [
    {
      title: "total students",
      span: "assessed",
      icon: "/icon/users.png",
      count: Value?.totalStudentsAssessed,
      growth: "8.5",
      timeline: "yesterday",
    },
    {
      title: "overall pass %",
      span: "",
      icon: "/icon/grow.png",
      count: Value?.overallPassPercent,
      growth: "1.3",
      timeline: "last week",
    },
    {
      title: "average marks",
      span: "theory",
      icon: "/icon/product.png",
      count: Value?.averageMarksTheory,
      growth: "4.3",
      timeline: "yesterday",
    },
    {
      title: "average marks",
      span: "practical",
      icon: "/icon/box.png",
      count: Value?.averageMarksPractical,
      growth: "1.8",
      timeline: "yesterday",
    },
    {
      title: "total batch",
      span: "assessed",
      icon: "/icon/add.png",
      count: Value?.totalBatchesAssessed,
      growth: "8.5",
      timeline: "last month",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex lg:flex-row flex-col justify-between gap-4 lg:items-center">
        <h2 className="text-secondary flex flex-col gap-4 font-bold text-3xl">
          <span className="text-[#606060] text-sm/1 font-semibold">
            Training partner Since 2016
          </span>
          Dashboard
        </h2>
        {/* <button
            onClick={() => setIsBatch(true)}
            className="text-white py-3.5 px-10 rounded-sm bg-primary text-sm"
          >
            + Add Batch
          </button> */}
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
        <CurrentBatch />
      </div>

      {/* <div className="rounded-xl shadow-lg h-96 bg-white p-4 col-span-3 ">
          <h2 className="text-secondary  flex items-center justify-between text-xl font-semibold">
            Certification Rate
            <select
              className="font-normal text-sm text-tertiary h-fit px-2 rounded border border-gray-300"
              name=""
              id=""
            >
              <option value="">January</option>
              <option value="">February</option>
              <option value="">March</option>
              <option value="">April</option>
            </select>
          </h2>

          <CertificationRate />
        </div> */}
      {/* <TopStudents /> */}
      {isBatch && (
        <OverlayModal
          content={<AddBatch onClose={() => setIsBatch(false)} />}
        />
      )}
    </section>
  );
};

export default HomePage;
