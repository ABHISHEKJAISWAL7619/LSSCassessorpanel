"use client";

import Image from "next/image";
import Input from "../atoms/Input";
import { useDispatch } from "react-redux";
import { getloginuser, updateloginuser } from "@/redux/slice/user-slice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useFile from "@/hooks/useFile";

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

  // Upload state to show loading indicator
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Fetch user details
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

  // Handle profile update
  const handleupdate = async (e) => {
    e.preventDefault();
    if (uploadingPhoto) {
      toast.error("Please wait until photo upload completes");
      return;
    }
    const res = await dispatch(updateloginuser(formData));
    if (res.error) {
      toast.error("Update failed. Please try again.");
    } else {
      toast.success("User profile updated successfully");
      await getuserdetails();
    }
  };

  // Handle image upload with uploading state
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingPhoto(true); // Start uploading
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
      setUploadingPhoto(false); // Done uploading
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
              disabled={uploadingPhoto}
            />
            <label
              htmlFor="avatar-upload"
              className={`cursor-pointer ${
                uploadingPhoto ? "opacity-50 pointer-events-none" : ""
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
              <span className="text-[#4379EE] text-center block pt-2">
                {uploadingPhoto ? "Uploading..." : "Upload Photo"}
              </span>
            </label>
            {uploadingPhoto && (
              <div className="absolute top-28 text-blue-600 font-semibold">
                Uploading photo...
              </div>
            )}
          </div>

          {/* Input Fields */}
          <Input
            label={"Full Name"}
            icon={"ri-user-smile-line"}
            placeholder={"Enter your full name"}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={uploadingPhoto}
          />

          <Input
            label={"Employee ID"}
            placeholder={"Enter Employee ID"}
            value={formData.employeeId}
            onChange={(e) =>
              setFormData({ ...formData, employeeId: e.target.value })
            }
            disabled={uploadingPhoto}
          />

          <Input
            label={"Specialization"}
            icon={"ri-graduation-cap-line"}
            placeholder={"Enter your specialization"}
            value={formData.specialization}
            onChange={(e) =>
              setFormData({ ...formData, specialization: e.target.value })
            }
            disabled={uploadingPhoto}
          />

          <div className="flex flex-col lg:flex-row items-center gap-4">
            <Input
              label={"Phone Number"}
              icon={"ri-phone-line"}
              placeholder={"+91 xxx xxx xxx"}
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              disabled={uploadingPhoto}
            />
            <Input
              label={"Email Address"}
              icon={"ri-mail-line"}
              placeholder={"name@gmail.com"}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={uploadingPhoto}
            />
            <Input
              label={"Role"}
              icon={"ri-user-settings-line"}
              placeholder={"Assessor/Trainer"}
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              disabled={uploadingPhoto}
            />
          </div>

          {/* Info Box */}
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

          {/* Buttons */}
          <div className="flex justify-end pt-6 gap-4">
            <button
              type="button"
              className="border-[#D1D5DB] rounded-md py-2 px-4 border"
              onClick={() =>
                setFormData({
                  name: "",
                  employeeId: "",
                  specialization: "",
                  mobile: "",
                  email: "",
                  role: "",
                  avatar: "",
                })
              }
              disabled={uploadingPhoto}
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-md"
              disabled={uploadingPhoto}
            >
              Update Info
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
