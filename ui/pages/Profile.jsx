"use client";

import Image from "next/image";
import Input from "../atoms/Input";
import { useDispatch } from "react-redux";
import { getloginuser, updateloginuser } from "@/redux/slice/user-slice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useFile from "@/hooks/useFile";
import Link from "next/link";

const Profile = () => {
  const dispatch = useDispatch();
  const { uploadFile } = useFile();

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    specialization: "",
    mobile: "",
    email: "",
    role: "",
    avatar: "",
  });

  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [updating, setUpdating] = useState(false); // loading state for form

  const getuserdetails = async () => {
    const res = await dispatch(getloginuser());
    const user = res.payload?.user;
    if (user) {
      setFormData({
        name: user.name || "",
        employeeId: user.employeeId || "",
        specialization: user.specialization || "",
        mobile: user.mobile || "",
        email: user.email || "",
        avatar: user.avatar || "",
        role: user.role || "",
      });
    }
  };

  useEffect(() => {
    getuserdetails();
  }, []);

  const validateFields = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.specialization.trim()) return "Specialization is required";
    if (!formData.email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Invalid email format";
    return null;
  };

  const handleupdate = async (e) => {
    e.preventDefault();

    if (uploadingPhoto) {
      toast.error("Please wait until photo upload completes");
      return;
    }

    const validationError = validateFields();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setUpdating(true);
    try {
      const res = await dispatch(updateloginuser(formData));
      if (res.payload) {
        toast.success(res.payload.message || "Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
      await getuserdetails();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const result = await uploadFile(file);
      const imageUrl =
        result?.image ||
        result?.url ||
        result?.secure_url ||
        (typeof result === "string" && result);

      if (imageUrl) {
        setFormData((prev) => ({ ...prev, avatar: imageUrl }));
        toast.success("Profile photo uploaded");
      } else {
        toast.error("Upload failed: Invalid response from server");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload error");
    } finally {
      setUploadingPhoto(false);
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="font-bold text-3xl">Profile Information</h2>
      <div className="bg-white p-3 lg:p-4 rounded-xl border-quinary border">
        <form className="lg:w-[60%] space-y-4 mx-auto" onSubmit={handleupdate}>
          {/* Avatar Upload */}
          <div className="flex flex-col gap-2 justify-center items-center relative">
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploadingPhoto || updating}
            />
            <label
              htmlFor="avatar-upload"
              className={`cursor-pointer ${
                uploadingPhoto || updating
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
              title={uploadingPhoto ? "Uploading photo..." : "Upload Photo"}
            >
              <Image
                className="w-24 h-24 rounded-full object-cover border"
                src={formData.avatar || "/icon/uploadImage.png"}
                alt="Profile Photo"
                width={100}
                height={100}
              />
              <span className="text-blue-700 text-center block pt-2">
                {uploadingPhoto ? "Uploading..." : "Upload Photo"}
              </span>
            </label>
          </div>

          {/* Input Fields */}
          <Input
            label={"Full Name *"}
            icon={"ri-user-smile-line"}
            placeholder={"Enter your full name"}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={uploadingPhoto || updating}
          />

          <Input
            label={"Employee ID"}
            placeholder={"Enter Employee ID"}
            value={formData.employeeId}
            disabled // non-editable
          />

          <Input
            label={"Specialization *"}
            icon={"ri-graduation-cap-line"}
            placeholder={"Enter your specialization"}
            value={formData.specialization}
            onChange={(e) =>
              setFormData({ ...formData, specialization: e.target.value })
            }
            disabled={uploadingPhoto || updating}
          />

          <div className="flex flex-col lg:flex-row items-center gap-4">
            <Input
              label={"Phone Number"}
              icon={"ri-phone-line"}
              placeholder={"+91 xxx xxx xxx"}
              value={formData.mobile}
              disabled // non-editable
            />
            <Input
              label={"Email Address *"}
              icon={"ri-mail-line"}
              placeholder={"name@gmail.com"}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={uploadingPhoto || updating}
            />
            <Input
              label={"Role"}
              icon={"ri-user-settings-line"}
              placeholder={"Assessor/Trainer"}
              value={formData.role}
              disabled // non-editable
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end pt-6 gap-4">
            <Link
              href={"/"}
              type="button"
              className="border-[#D1D5DB] cursor-pointer rounded-md py-2 px-4 border"
              disabled={uploadingPhoto || updating}
            >
              Cancil
            </Link>
            <button
              type="submit"
              className="bg-primary  text-white py-2 px-4 rounded-md flex items-center gap-2"
              disabled={uploadingPhoto || updating}
            >
              {updating && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              )}
              {updating ? "Updating..." : "Update Info"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
