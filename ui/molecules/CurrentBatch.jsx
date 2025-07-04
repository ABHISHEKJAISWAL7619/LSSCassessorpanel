"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getallbatchAssessment } from "@/redux/slice/Assesment-slice";

const CurrentBatch = () => {
  const dispatch = useDispatch();

  const [firstAssessment, setFirstAssessment] = useState(null);
  console.log(firstAssessment);

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getallbatchAssessment());
      console.log("Fetched data:", res.payload?.data);

      const data = res?.payload?.data || [];

      if (data.length > 0) {
        setFirstAssessment(data[0]); // set first item
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="rounded-xl shadow-lg overflow-hidden bg-white p-4 lg:col-span-3">
      <h3 className="flex justify-between items-center text-secondary font-semibold">
        Assessments
        <Link
          className="text-xs border rounded px-3 border-gray-500"
          href={"/batches"}
        >
          View All
        </Link>
      </h3>

      <div className="overflow-x-auto mt-4">
        <div className="min-w-[1000px] lg:min-w-full">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th>Batch Name</th>
                <th>Assessor Name</th>
                <th>AssessmentType</th>
                <th>Start Date</th>
                <th>Students Appeared</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {firstAssessment ? (
                <tr>
                  <td className="text-left">
                    {firstAssessment?.batchId.name || "-"}
                  </td>
                  <td className="text-left">
                    {firstAssessment.assessorName || "-"}
                  </td>
                  <td className="text-left">
                    {firstAssessment.assessmentType || "-"}
                  </td>
                  <td className="text-left">
                    {firstAssessment.assessmentDate
                      ? new Date(
                          firstAssessment.assessmentDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="text-left">
                    {firstAssessment.totalCandidatesAppeared || 0}
                  </td>
                  <td className="text-green-600 font-semibold text-left">
                    Current
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No assessments available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CurrentBatch;
