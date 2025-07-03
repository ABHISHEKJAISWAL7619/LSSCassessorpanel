"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getallbatchAssessment,
  deletebatchAssessment,
} from "@/redux/slice/Assesment-slice";
import { getallbatch } from "@/redux/slice/batch-slice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OverlayModal from "../common/OverlayModal";
import Pagination from "../common/pagination";

const DailyReport = ({ page }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [assessments, setAssessments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [Count, setCount] = useState();
  const fetchData = async () => {
    const res1 = await dispatch(
      getallbatchAssessment({ filter: { limit: 4, page } })
    );
    console.log(res1);
    setCount(res1.payload.count);
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const confirmDelete = async () => {
    const res = await dispatch(deletebatchAssessment(selectedId));
    if (res.payload?.message) {
      toast.success(res.payload.message);
      fetchData();
    } else {
      toast.error(res.payload?.message || "Failed to delete");
    }
    setShowModal(false);
    setSelectedId(null);
  };

  const assesment = useSelector((state) => state.assesment);
  console.log(assesment.assesment);
  useEffect(() => {
    if (assesment) {
      setAssessments(assesment.assesment);
    }
  }, [assesment]);

  return (
    <section className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Batch Assessments</h2>
        <Link
          href="/daily-report/new"
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Add New Assessment
        </Link>
      </div>

      {assessments.length > 0 ? (
        <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4">Batch Name</th>
                <th className="py-2 px-4">Assessment Date</th>
                <th className="py-2 px-4">Assessment Type</th>
                <th className="py-2 px-4">Assessor Name</th>
                <th className="py-2 px-4">Time of Reporting</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className="py-2 text-left px-4">
                      {item?.batchId?.name || "N/A"}
                    </td>
                    <td className="py-2 text-left px-4">
                      {new Date(item?.assessmentDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 text-left px-4">
                      {item.assessmentType}
                    </td>
                    <td className="py-2 text-left px-4">
                      {item?.assessorName}
                    </td>
                    <td className="py-2 text-left px-4">
                      {item?.timeOfReporting}
                    </td>
                    <td className="py-2 text-left px-4">
                      <button
                        onClick={() => {
                          setSelectedId(item._id);
                          setShowModal(true);
                        }}
                      >
                        <i className="ri-delete-bin-6-line ri-xl text-red-500 cursor-pointer"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination total={Count} pageSize={4} />
        </div>
      ) : (
        <p>No assessments found.</p>
      )}

      {showModal && (
        <OverlayModal
          content={
            <div className="bg-white rounded-lg p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-center">Are you sure?</h3>
              <p className="text-center">
                Do you really want to delete this assessment?
              </p>
              <div className="flex justify-center cursor-default gap-4 pt-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedId(null);
                  }}
                  className="border cursor-pointer px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          }
        />
      )}
    </section>
  );
};

export default DailyReport;
