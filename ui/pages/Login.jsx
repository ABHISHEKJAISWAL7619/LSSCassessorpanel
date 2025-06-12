"use client";

import { Otpsend } from "@/redux/slice/auth-slice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formdata, setformdata] = useState({
    mobile: "7619965287",
    role: "assessor",
  });

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const { mobile, role } = formdata;

    try {
      const res = await dispatch(Otpsend(formdata));
      console.log(res);
      toast.success("OTP sent successfully");
      router.push(`/otp-verify?mobile=${mobile}`);
    } catch (err) {
      toast.error("Failed to send OTP");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h2>

        <form onSubmit={handleSendOtp}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              maxLength={10}
              value={formdata.mobile}
              onChange={handlechange}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formdata.role}
              onChange={handlechange}
              placeholder="Enter your role"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
