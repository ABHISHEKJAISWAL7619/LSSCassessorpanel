// import Image from "next/image";
// import Link from "next/link";

// const CurrentBatch = () => {

//   const [, set] = useState();
// const allassesment = async () => {
//     let res = await dispatch(getallbatchAssessment());
//     if (res.payload?.data) {
//       setAssessments(res.payload.data);
//     }
//   };

//   return (
//     <div className="rounded-xl shadow-lg overflow-hidden bg-white p-4 lg:col-span-3 ">
//       <h3 className="flex  justify-between items-center text-secondary font-semibold">
//         Assessments{" "}
//         <Link
//           className="text-xs border rounded px-3 border-gray-500"
//           href={"/batches"}
//         >
//           {" "}
//           View All
//         </Link>
//       </h3>
//       <div className="overflow-x-auto ">
//         <div className="min-w-[1000px] lg:min-w-full">
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th>Batch Name</th>
//                 <th>Assessor Name</th>
//                 <th>Start Date</th>
//                 <th>Students Appeared</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="flex gap-2 justify-center items-center">
//                   PMKVY
//                 </td>
//                 <td>Riya Yadav</td>
//                 <td>02/05/2025</td>
//                 <td>42</td>
//                 <td>Current</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentBatch;
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getallbatchAssessment } from "@/redux/slice/Assesment-slice";
import { getallbatch } from "@/redux/slice/batch-slice";

const CurrentBatch = () => {
  const dispatch = useDispatch();
  const [assessments, setAssessments] = useState([]);
  const [batches, setBatches] = useState([]);

  // Fetch all batch assessments
  const fetchAssessments = async () => {
    const res = await dispatch(getallbatchAssessment());
    if (res.payload?.data) {
      setAssessments(res.payload.data);
    }
  };

  // Fetch all batches
  const fetchBatches = async () => {
    const res = await dispatch(getallbatch());
    if (res.payload?.data) {
      setBatches(res.payload.data);
    }
  };

  useEffect(() => {
    fetchAssessments();
    fetchBatches();
  }, [dispatch]);

  // Get the latest assessment
  const latestAssessment = [...assessments].sort(
    (a, b) =>
      new Date(b.assessmentDate).getTime() -
      new Date(a.assessmentDate).getTime()
  )[0];

  // Find related batch by batchId
  const relatedBatch = batches.find(
    (batch) => batch._id === latestAssessment?.batchId
  );

  return (
    <div className="rounded-xl shadow-lg overflow-hidden bg-white p-4 lg:col-span-3">
      <h3 className="flex justify-between items-center text-secondary font-semibold">
        Assessments{" "}
        <Link
          className="text-xs border rounded px-3 border-gray-500"
          href={"/batches"}
        >
          View All
        </Link>
      </h3>

      <div className="overflow-x-auto">
        <div className="min-w-[1000px] lg:min-w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th>Batch Name</th>
                <th>Assessor Name</th>
                <th>Start Date</th>
                <th>Students Appeared</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {latestAssessment && relatedBatch ? (
                <tr>
                  <td className="flex gap-2 justify-center items-center">
                    {relatedBatch.name}
                  </td>
                  <td>{latestAssessment.assessorName}</td>
                  <td>
                    {new Date(
                      latestAssessment.assessmentDate
                    ).toLocaleDateString()}
                  </td>
                  <td>{latestAssessment.totalCandidatesAppeared}</td>
                  <td>Current</td>
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
