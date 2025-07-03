// "use client";

// import Link from "next/link";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getallbatchAssessment } from "@/redux/slice/Assesment-slice";

// const CurrentBatch = () => {
//   const dispatch = useDispatch();

//   let Getallbatchassessment = async () => {
//     let res = await dispatch(getallbatchAssessment());
//     console.log(res.payload.data);
//   };

//   useEffect(() => {
//     Getallbatchassessment();
//   }, [dispatch]);

//   const { assesment: assessments = [] } = useSelector(
//     (state) => state.assesment
//   );

//   // Use index 0 assessment
//   const firstAssessment = assessments[0];
//   const relatedBatch = firstAssessment?.batchId;

//   return (
//     <div className="rounded-xl shadow-lg overflow-hidden bg-white p-4 lg:col-span-3">
//       <h3 className="flex justify-between items-center text-secondary font-semibold">
//         Assessments
//         <Link
//           className="text-xs border rounded px-3 border-gray-500"
//           href={"/batches"}
//         >
//           View All
//         </Link>
//       </h3>

//       <div className="overflow-x-auto mt-4">
//         <div className="min-w-[1000px] lg:min-w-full">
//           <table className="w-full text-sm text-left">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th>Batch Name</th>
//                 <th>Assessor Name</th>
//                 <th>Start Date</th>
//                 <th>Students Appeared</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {firstAssessment && relatedBatch ? (
//                 <tr>
//                   <td className="text-left">{relatedBatch.name}</td>
//                   <td className="text-left">{firstAssessment.assessorName}</td>
//                   <td className="text-left">
//                     {new Date(relatedBatch.startAt).toLocaleDateString()}
//                   </td>
//                   <td className="text-left">
//                     {firstAssessment.totalCandidatesAppeared}
//                   </td>
//                   <td className="text-green-600 font-semibold text-left ">
//                     Current
//                   </td>
//                 </tr>
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4 text-gray-500">
//                     No assessments available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentBatch;

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getallbatchAssessment } from "@/redux/slice/Assesment-slice";

const CurrentBatch = () => {
  const dispatch = useDispatch();

  const [firstAssessment, setFirstAssessment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getallbatchAssessment());
      const data = res?.payload?.data || [];
      console.log("Fetched Assessments:", data);

      if (data.length > 0) {
        setFirstAssessment(data[0]);
      }
    };

    fetchData();
  }, [dispatch]);

  const relatedBatch = firstAssessment?.batchId;

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
                <th>Start Date</th>
                <th>Students Appeared</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {firstAssessment && relatedBatch ? (
                <tr>
                  <td className="text-left">{relatedBatch.name}</td>
                  <td className="text-left">{firstAssessment.assessorName}</td>
                  <td className="text-left">
                    {new Date(relatedBatch.startAt).toLocaleDateString()}
                  </td>
                  <td className="text-left">
                    {firstAssessment.totalCandidatesAppeared}
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
