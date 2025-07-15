import React from "react";
import { useAuth } from "../../context/AuthContext";

const DoctorHeader = () => {
  const { auth } = useAuth();

  return (
    <div className="bg-gradient-primary p-3">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 rounded-2xl bg-blue-400 p-4 sm:p-6">
        {/* Left Side Text */}
        <div className="text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
            Welcome back, Dr. {auth.userName || "Doctor"}!
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base">
            <span className="text-red-500 font-semibold">
              Account Verification Pending:
            </span>
            <p className="text-black font-medium">
              You need to complete your verification.
            </p>
          </div>
        </div>

        {/* Right Side Avatar */}
        <div className="hidden md:block flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-300 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-200 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHeader;
