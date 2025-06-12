"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getallbatchAssessment } from "@/redux/slice/Assesment-slice";
import { getallbatch } from "@/redux/slice/batch-slice";

const Batches = () => {
  const dispatch = useDispatch();
  const [assessments, setAssessments] = useState([]);
  const [batches, setBatches] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const assessmentsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await dispatch(getallbatchAssessment());
      if (res1.payload?.data) setAssessments(res1.payload.data);

      const res2 = await dispatch(getallbatch());
      if (res2.payload?.data) setBatches(res2.payload.data);
    };

    fetchData();
  }, [dispatch]);

  const getBatchName = (batchId) => {
    const batch = batches.find((b) => b._id === batchId);
    return batch?.name || "Unknown";
  };

  // Pagination logic
  const indexOfLast = currentPage * assessmentsPerPage;
  const indexOfFirst = indexOfLast - assessmentsPerPage;
  const currentAssessments = assessments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(assessments.length / assessmentsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
                  <th>Students Passed</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentAssessments.length > 0 ? (
                  currentAssessments.map((item) => (
                    <tr key={item._id} className="border-b border-quinary">
                      <td>{getBatchName(item.batchId)}</td>
                      <td>{item.assessorName}</td>
                      <td>
                        {new Date(item.assessmentDate).toLocaleDateString()}
                      </td>
                      <td>{item.totalCandidatesAppeared}</td>
                      <td>{item.totalCandidatesPassed || "N/A"}</td>
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

            {/* Pagination Controls */}
            <div className="flex justify-end gap-4 mt-4 items-center text-sm">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Batches;
