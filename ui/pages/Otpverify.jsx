"use client";

import { loginuser } from "@/redux/slice/auth-slice";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Otpverify = ({ mobile }) => {
  const [otp, setOtp] = useState("123456");
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Loading, setLoading] = useState("");

  useEffect(() => {
    if (mobile) {
      setPhoneNumber(mobile);
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const obj = {
        mobile: phoneNumber,
        otp: otp,
      };

      let res = await dispatch(loginuser(obj));

      if (res.payload?.message) {
        toast.success(res.payload.message);
        router.push("/");
      } else {
        toast.error(res.payload || "Login failed");
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Enter OTP</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            OTP
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
          disabled={Loading}
        >
          {Loading ? "Logining in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Otpverify;
