"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getallbatchAssessment } from "@/redux/slice/Assesment-slice";
import Pagination from "../common/pagination";

const Batches = ({ page }) => {
  const dispatch = useDispatch();
  const [assessments, setAssessments] = useState([]);
  const [Count, setCount] = useState(0);

  const fetchData = async () => {
    const res1 = await dispatch(
      getallbatchAssessment({ filter: { limit: 8, page } })
    );
    setCount(res1.payload.count);
  };
  useEffect(() => {
    fetchData();
  }, [dispatch, page]);

  const assesment = useSelector((state) => state.assesment);
  console.log(assesment.assesment);
  useEffect(() => {
    if (assesment) {
      setAssessments(assesment.assesment);
    }
  }, [assesment]);

  return (
    <section>
      <Link href="/">
        <Image
          className="w-8 mb-6 h-8"
          src="/icon/back.png"
          alt="back"
          width={100}
          height={100}
        />
      </Link>

      <div className="space-y-6 bg-white p-6 rounded-xl">
        <h3 className="flex text-2xl justify-between items-center text-secondary font-semibold">
          Assessments{" "}
          <Link
            className="text-xs border rounded px-3 border-gray-500"
            href="/batches"
          >
            View All
          </Link>
        </h3>

        <div className="overflow-x-auto">
          <div className="min-w-[1000px] lg:min-w-full">
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th>Batch Name</th>
                  <th>Assessor Name</th>
                  <th>Date</th>
                  <th>Students Appeared</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {assessments.length > 0 ? (
                  assessments.map((item) => (
                    <tr key={item._id} className="border-b border-quinary">
                      <td>{item.batchId.name}</td>
                      <td>{item.assessorName}</td>
                      <td>
                        {new Date(item.assessmentDate).toLocaleDateString()}
                      </td>
                      <td>{item.totalCandidatesAppeared}</td>

                      <td>Current</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-gray-500">
                      No assessments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination total={Count} pageSize={8} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Batches;
