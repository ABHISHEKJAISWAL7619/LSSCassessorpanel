"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../atoms/Input";
import Textarea from "../atoms/Textarea";
import toast from "react-hot-toast";
import { getallassessor } from "@/redux/slice/user-slice";
import { getallbatch } from "@/redux/slice/batch-slice";
import { createbatchAssessment } from "@/redux/slice/Assesment-slice";
import { useRouter } from "next/navigation";

const Addassement = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [assessors, setAssessors] = useState([]);
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState("");

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
    avgScore: "",
    remarks: "",
  };

  const [formData, setFormData] = useState(initialState);

  const fetchData = async () => {
    const res1 = await dispatch(getallassessor());
    const res2 = await dispatch(getallbatch());
    if (res1.payload?.data) setAssessors(res1.payload.data);
    if (res2.payload?.data) setBatches(res2.payload.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.batchId ||
      !formData.assessor ||
      !formData.assessorName ||
      !formData.assessorId ||
      !formData.assessmentDate ||
      !formData.assessmentType ||
      !formData.location ||
      !formData.state ||
      !formData.timeOfReporting ||
      !formData.assessmentTime ||
      !formData.totalCandidatesAppeared ||
      !formData.candidatesPassed ||
      !formData.avgScore ||
      !formData.remarks
    ) {
      setError("Please fill all required fields");
      return;
    }

    const payload = {
      ...formData,
      assessmentDate: new Date(formData.assessmentDate).toISOString(),
      totalCandidatesAppeared: Number(formData.totalCandidatesAppeared),
      candidatesPassed: Number(formData.candidatesPassed),
      avgScore: Number(formData.avgScore),
    };

    const res = await dispatch(createbatchAssessment(payload));
    if (res.payload) {
      toast.success(res.payload.message || "Assessment created");
      router.push("/daily-report");
    } else {
      toast.error(res.payload?.message || "Failed to create");
    }
  };

  const handleAssessorChange = (e) => {
    const selectedId = e.target.value;
    const selected = assessors.find((a) => a._id === selectedId);
    setFormData((prev) => ({
      ...prev,
      assessor: selectedId,
      assessorName: selected?.name || "",
      assessorId: selected?.assessorId || "",
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Add Assessment</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* ✅ Batch dropdown (shows name, sends _id) */}
        <div>
          <label className="block text-sm font-medium mb-1">Batch Name</label>
          <select
            className="w-full  bg-background outline-0 p-2 border border-[#D1D5DB] rounded-lg"
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

        {/* ✅ Assessor dropdown */}
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

        {/* Assessor Details */}
        <div className="flex flex-col lg:flex-row gap-4">
          <Input
            label="Assessor Name"
            value={formData.assessorName}
            onChange={(e) =>
              setFormData({ ...formData, assessorName: e.target.value })
            }
          />
          <Input
            label="Assessor ID"
            value={formData.assessorId}
            onChange={(e) =>
              setFormData({ ...formData, assessorId: e.target.value })
            }
          />
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
            label="Time of Reporting"
            value={formData.timeOfReporting}
            onChange={(e) =>
              setFormData({ ...formData, timeOfReporting: e.target.value })
            }
          />
          <Input
            label="Assessment Time"
            value={formData.assessmentTime}
            onChange={(e) =>
              setFormData({ ...formData, assessmentTime: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <Input
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
            label="Candidates Passed"
            value={formData.candidatesPassed}
            onChange={(e) =>
              setFormData({ ...formData, candidatesPassed: e.target.value })
            }
          />
        </div>

        <Input
          label="Average Score"
          value={formData.avgScore}
          onChange={(e) =>
            setFormData({ ...formData, avgScore: e.target.value })
          }
        />

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
            className="border border-gray-300 px-4 py-2 rounded"
            onClick={() => setFormData(initialState)}
          >
            Clear
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addassement;
