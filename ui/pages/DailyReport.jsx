"use client";

import Image from "next/image";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Textarea from "../atoms/Textarea";
import { getallassessor } from "@/redux/slice/user-slice";
import { getallbatch } from "@/redux/slice/batch-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createbatchAssessment,
  getallbatchAssessment,
} from "@/redux/slice/Assesment-slice";
import toast from "react-hot-toast";

const DailyReport = () => {
  const dispatch = useDispatch();

  const [assessors, setAssessors] = useState([]);
  const [batches, setBatches] = useState([]);
  const [assessments, setAssessments] = useState([]);

  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [selectedAssessorId, setSelectedAssessorId] = useState("");
  const [assessorName, setAssessorName] = useState("");
  const [assessorId, setAssessorId] = useState("");
  const [assessmentDate, setAssessmentDate] = useState("");
  const [assessmentType, setAssessmentType] = useState("Theory");
  const [location, setLocation] = useState("");
  const [stateName, setStateName] = useState("");
  const [timeOfReporting, setTimeOfReporting] = useState("");
  const [assessmentTime, setAssessmentTime] = useState("");
  const [totalCandidatesAppeared, setTotalCandidatesAppeared] = useState("");
  const [candidatesPassed, setCandidatesPassed] = useState("");
  const [avgScore, setAvgScore] = useState("");
  const [remarks, setRemarks] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [error, seterror] = useState();
  const itemsPerPage = 3;

  const fetchAssessors = async () => {
    const res = await dispatch(getallassessor());
    if (res.payload?.data) {
      setAssessors(res.payload.data);
    }
  };

  const fetchBatches = async () => {
    const res = await dispatch(getallbatch());
    if (res.payload?.data) {
      setBatches(res.payload.data);
    }
  };

  const allassesment = async () => {
    let res = await dispatch(getallbatchAssessment());
    if (res.payload?.data) {
      setAssessments(res.payload.data);
    }
  };

  useEffect(() => {
    fetchAssessors();
    fetchBatches();
    allassesment();
  }, [dispatch]);

  const handleAssessorChange = (e) => {
    const selectedName = e.target.value;
    if (selectedName === "Select Assessor") {
      setSelectedAssessorId("");
      setAssessorName("");
      setAssessorId("");
    } else {
      const assessor = assessors.find((a) => a.name === selectedName);
      setSelectedAssessorId(assessor?._id || "");
      setAssessorName(assessor?.name || "");
      setAssessorId(assessor?.assessorId || "");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    seterror("");
    const formData = {
      batchId: selectedBatchId,
      assessor: selectedAssessorId,
      assessorName,
      assessorId,
      assessmentDate: assessmentDate
        ? new Date(assessmentDate).toISOString()
        : null,
      assessmentType,
      location,
      state: stateName,
      timeOfReporting,
      assessmentTime,
      totalCandidatesAppeared: Number(totalCandidatesAppeared),
      candidatesPassed: Number(candidatesPassed),
      avgScore: Number(avgScore),
      remarks,
    };

    if (!formData.batchId) {
      seterror("Please select a batch");
      return;
    }
    if (!formData.assessor) {
      seterror("Please select an assessor");
      return;
    }
    if (!formData.assessorName) {
      seterror(" assessorName  is required");
      return;
    }
    if (!formData.assessorId) {
      seterror(" assessorId  is required");
      return;
    }

    if (!formData.assessmentDate) {
      seterror("Please select an assessment date");
      return;
    }
    if (!formData.assessmentType) {
      seterror("Please select an assessment type");
      return;
    }
    if (!formData.location) {
      seterror("Please select a location");
      return;
    }
    if (!formData.state) {
      seterror("Please select a state");
      return;
    }
    if (!formData.timeOfReporting) {
      seterror("Please select a time of reporting");
      return;
    }
    if (!formData.assessmentTime) {
      seterror("Please select an assessment time");
      return;
    }

    if (!formData.candidatesPassed) {
      seterror(" candidatespassed is required");
      return;
    }
    if (!formData.totalCandidatesAppeared) {
      seterror("totalcandidatesappeared is required");
      return;
    }
    if (!formData.avgScore) {
      seterror(" avgScore is required");
      return;
    }
    if (!formData.remarks) {
      seterror(" remarks is required");
      return;
    }

    dispatch(createbatchAssessment(formData)).then(() => {
      allassesment();
      clearForm();
    });

    dispatch(createbatchAssessment(formData)).then((res) => {
      if (res?.payload) {
        toast.success(res.payload.message || "Assessment created successfully");
        allassesment();
        clearForm();
      } else {
        toast.error(res.payload?.message || "Something went wrong");
      }
    });
  };

  const clearForm = () => {
    setSelectedBatchId("");
    setSelectedAssessorId("");
    setAssessorName("");
    setAssessorId("");
    setAssessmentDate("");
    setAssessmentType("Theory");
    setLocation("");
    setStateName("");
    setTimeOfReporting("");
    setAssessmentTime("");
    setTotalCandidatesAppeared("");
    setCandidatesPassed("");
    setAvgScore("");
    setRemarks("");
  };

  const paginatedData = assessments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="space-y-6">
      <h2 className="font-bold text-3xl">Batch Assessment Input</h2>
      <div className="bg-white p-3 lg:p-4 rounded-xl border border-quinary">
        <form className="lg:w-[60%] space-y-4 mx-auto" onSubmit={handleSubmit}>
          <Select
            label={"Batch Name"}
            name={"batchname"}
            value={
              batches.find((b) => b._id === selectedBatchId)?.name ||
              "Select Batch"
            }
            onChange={(e) => {
              const selectedName = e.target.value;
              const batch = batches.find((b) => b.name === selectedName);
              setSelectedBatchId(batch?._id || "");
            }}
            options={["Select Batch", ...batches.map((batch) => batch.name)]}
          />

          <Select
            label={"Assessor Name"}
            name={"AssessorName"}
            value={
              assessors.find((a) => a._id === selectedAssessorId)?.name ||
              "Select Assessor"
            }
            onChange={handleAssessorChange}
            options={["Select Assessor", ...assessors.map((a) => a.name)]}
          />

          <div className="flex flex-col lg:flex-row items-center gap-4">
            <Input
              label={"Enter your name"}
              icon={"ri-user-smile-line"}
              placeholder={"Enter Assessor Name"}
              value={assessorName}
              onChange={(e) => setAssessorName(e.target.value)}
            />
            <Input
              label={"Assessor ID"}
              placeholder={"Enter your ID"}
              value={assessorId}
              onChange={(e) => setAssessorId(e.target.value)}
            />
          </div>

          <div className="flex lg:w-1/2 flex-col lg:flex-row items-center gap-4">
            <Input
              type="date"
              label={"Assessment Date"}
              placeholder={"Select date"}
              value={assessmentDate}
              onChange={(e) => setAssessmentDate(e.target.value)}
            />
          </div>

          <Select
            label={"Assessment Type"}
            options={["Theory"]}
            value={assessmentType}
            onChange={(e) => setAssessmentType(e.target.value)}
          />

          <div className="flex flex-col lg:flex-row items-center gap-4">
            <Input
              label={"Location/ Center Name"}
              placeholder={"Enter center name"}
              icon={"ri-map-pin-line"}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Input
              label={"State"}
              placeholder={"Enter state"}
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-4">
            <Input
              label={"Time of Reporting"}
              placeholder={"HH:mm"}
              value={timeOfReporting}
              onChange={(e) => setTimeOfReporting(e.target.value)}
            />
            <Input
              label={"Assessment Time"}
              placeholder={"e.g., 4 hrs"}
              value={assessmentTime}
              onChange={(e) => setAssessmentTime(e.target.value)}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-4">
            <Input
              label={"Total Candidates Appeared"}
              placeholder={"Enter total candidates"}
              value={totalCandidatesAppeared}
              onChange={(e) => setTotalCandidatesAppeared(e.target.value)}
            />
            <Input
              label={"Candidates Passed"}
              placeholder={"Enter candidates passed"}
              value={candidatesPassed}
              onChange={(e) => setCandidatesPassed(e.target.value)}
            />
          </div>

          <Input
            label={"Average Score"}
            icon={"ri-gemini-line"}
            placeholder={"Enter average score"}
            value={avgScore}
            onChange={(e) => setAvgScore(e.target.value)}
          />

          <Textarea
            label={"Remarks"}
            placeholder={"Enter remarks"}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />

          <div className="border-[#BFDBFE] rounded-xl gap-2 border p-4 bg-[#EFF6FF]">
            <span className="space-x-2 flex gap-2 items-center text-[#1E40AF] font-medium text-sm">
              <Image
                className="w-4 h-4"
                src={"/icon/i.png"}
                width={100}
                height={100}
                alt="info"
              />
              Tips for filling the form
            </span>
            <ul className="list-disc text-sm ps-10 text-[#1D4ED8]">
              <li>All fields marked with * are mandatory</li>
              <li>Use your official email address</li>
              <li>Phone number should include country code</li>
            </ul>
          </div>
          <span className="text-red-500">{error}</span>
          <div className="flex justify-end pt-6 gap-4">
            <button
              type="reset"
              className="border-[#D1D5DB] rounded-md py-2 px-4 border"
              onClick={(e) => {
                e.preventDefault();
                clearForm();
              }}
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {paginatedData.length > 0 && (
        <div className="mt-10 bg-white p-4 rounded-xl shadow-md overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4 text-secondary">
            Batch Assessments
          </h3>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4">Batch Name</th>
                <th className="py-2 px-4">Assessment Date</th>
                <th className="py-2 px-4">Assessment Type</th>
                <th className="py-2 px-4">Assessor Name</th>
                <th className="py-2 px-4">Time of Reporting</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => {
                const batch = batches.find((b) => b._id === item.batchId);
                return (
                  <tr key={item._id}>
                    <td className="py-2 px-4 text-left ">
                      {batch?.name || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-left ">
                      {new Date(item.assessmentDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4  text-left">
                      {item.assessmentType}
                    </td>
                    <td className="py-2 px-4  text-left">
                      {item.assessorName}
                    </td>
                    <td className="py-2 px-4  text-left">
                      {item.timeOfReporting}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage * itemsPerPage >= assessments.length}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default DailyReport;
