"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../atoms/Input";
import Textarea from "../atoms/Textarea";
import toast from "react-hot-toast";
import { getallassessor } from "@/redux/slice/user-slice";
import { getallbatch } from "@/redux/slice/batch-slice";
import { createbatchAssessment } from "@/redux/slice/Assesment-slice";
import { useRouter } from "next/navigation";

const AddAssessment = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [assessors, setAssessors] = useState([]);
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialState = {
    batchId: "",
    assessor: "",
    assessorName: "",
    assessorId: "",
    assessmentDate: "",
    assessmentType: "Theory",
    location: "",
    state: "",
    timeOfReporting: "",
    assessmentTime: "",
    totalCandidatesAppeared: "",
    candidatesPassed: "",
    remarks: "",
  };

  const [formData, setFormData] = useState(initialState);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res1 = await dispatch(getallassessor());
      const res2 = await dispatch(getallbatch());
      if (res1.payload?.data) setAssessors(res1.payload.data);
      if (res2.payload?.data) setBatches(res2.payload.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        setError(`Please fill all required fields`);
        return;
      }
    }

    const payload = {
      ...formData,
      assessmentDate: new Date(formData.assessmentDate).toISOString(),
      totalCandidatesAppeared: Number(formData.totalCandidatesAppeared),
      candidatesPassed: Number(formData.candidatesPassed),
    };

    setIsSubmitting(true);
    try {
      const res = await dispatch(createbatchAssessment(payload));
      if (res.payload) {
        toast.success(res.payload.message || "Assessment created");
        router.push("/daily-report");
      } else {
        toast.error(res.payload?.message || "Failed to create");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssessorChange = (e) => {
    const selectedId = e.target.value;
    const selected = assessors.find((a) => a._id === selectedId);

    setFormData((prev) => ({
      ...prev,
      assessor: selectedId,
      assessorName: selected?.name || "",
      assessorId: selected?.employeeId || "",
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        <span className="ml-4 text-blue-700 font-medium">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Add Assessment</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Batch */}
        <div>
          <label className="block text-sm font-medium mb-1">Batch Name</label>
          <select
            className="w-full bg-background outline-0 p-2 border border-[#D1D5DB] rounded-lg"
            value={formData.batchId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, batchId: e.target.value }))
            }
          >
            <option value="">Select Batch</option>
            {batches.map((batch) => (
              <option key={batch._id} value={batch._id}>
                {batch.name}
              </option>
            ))}
          </select>
        </div>

        {/* Assessor */}
        <div>
          <label className="block text-sm font-medium mb-1">Assessor</label>
          <select
            className="w-full bg-background outline-0 p-2 border border-[#D1D5DB] rounded-lg"
            value={formData.assessor}
            onChange={handleAssessorChange}
          >
            <option value="">Select Assessor</option>
            {assessors.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <Input label="Assessor Name" value={formData.assessorName} disabled />
          <Input label="Assessor ID" value={formData.assessorId} disabled />
        </div>

        <Input
          type="date"
          label="Assessment Date"
          value={formData.assessmentDate}
          onChange={(e) =>
            setFormData({ ...formData, assessmentDate: e.target.value })
          }
        />

        <div>
          <label className="block text-sm font-medium mb-1">
            Assessment Type
          </label>
          <select
            className="w-full bg-background outline-0 p-2 border border-[#D1D5DB] rounded-lg"
            value={formData.assessmentType}
            onChange={(e) =>
              setFormData({ ...formData, assessmentType: e.target.value })
            }
          >
            <option value="Theory">Theory</option>
            <option value="Practical">Practical</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
          <Input
            label="State"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <Input
            type={"time"}
            label="Time of Reporting"
            value={formData.timeOfReporting}
            onChange={(e) =>
              setFormData({ ...formData, timeOfReporting: e.target.value })
            }
          />
          <Input
            placeholder={"ex-4hrs"}
            label="Assessment Time"
            value={formData.assessmentTime}
            onChange={(e) =>
              setFormData({ ...formData, assessmentTime: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <Input
            type={"number"}
            label="Total Candidates Appeared"
            value={formData.totalCandidatesAppeared}
            onChange={(e) =>
              setFormData({
                ...formData,
                totalCandidatesAppeared: e.target.value,
              })
            }
          />
          <Input
            type={"number"}
            label="Candidates Passed"
            value={formData.candidatesPassed}
            onChange={(e) =>
              setFormData({ ...formData, candidatesPassed: e.target.value })
            }
          />
        </div>

        <Textarea
          label="Remarks"
          value={formData.remarks}
          onChange={(e) =>
            setFormData({ ...formData, remarks: e.target.value })
          }
        />

        <span className="text-red-500">{error}</span>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="border border-gray-300 cursor-pointer px-4 py-2 rounded"
            onClick={() => setFormData(initialState)}
            disabled={isSubmitting}
          >
            Clear
          </button>
          <button
            type="submit"
            className="bg-primary cursor-pointer text-white px-4 py-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAssessment;
