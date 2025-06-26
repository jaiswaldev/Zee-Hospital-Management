import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Stethoscope, User } from "lucide-react";

const RoleSelector = ({ onRoleSelect, onSwitchToLogin }) => {
  return (
    <div className="max-w-3xl mx-auto mb-4 h-100">
      <div className="text-center mb-2">
        <div className="text-l font-bold text-gray-900 mb-2">
          Choose Your Role
        </div>
        <div className="text-gray-600 text-s">
          Select how you want to register in our system
        </div>
      </div>

      <div className="flex flex-row gap-4 justify-center">
        {/* Doctor Card */}
        <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-blue-500 bg-gray-200 backdrop-blur-sm flex-1 ">
          <CardContent className="p-4 text-center items-center flex flex-col">
            <div className="bg-blue-100 rounded-full p-4 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-l font-extrabold text-gray-900 mb-2">
              Doctor
            </div>
            <div className="text-gray-600 mb-2 leading-relaxed text-sm font-bold">
              Register as a medical professional to manage patients and
              appointments.
            </div>
            <div className="mt-2 text-gray-400">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <div>Manage patient records</div>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <div>Schedule appointments</div>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <div>Digital prescriptions</div>
              </div>
            </div>
            <div className="mt-4 text-xl">
              <Button onClick={() => onRoleSelect("doctor")}>
                Register as Doctor
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patient Card */}
        <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-blue-500 bg-gray-200 backdrop-blur-sm flex-1 ">
          <CardContent className="p-4 text-center items-center flex flex-col">
            <div className="bg-blue-100 rounded-full p-4 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-l font-extrabold text-gray-900 mb-2">
              Patient
            </div>
            <div className="text-gray-600 mb-2 leading-relaxed text-sm font-bold">
              Register as a patient to book appointments and access medical
              records.
            </div>
            <div className="mt-2 text-gray-400 ">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <div>Book appointments</div>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <div>View medical records</div>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <div>Prescription tracking</div>
              </div>
            </div>
            <div className="mt-4 text-xl">
              <Button onClick={() => onRoleSelect("patient")}>
                Register as Patient
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-2 text-xl text-gray-600 flex justify-end">
        Already Registered?{" "}
        <div className="text-blue-600 hover:text-blue-800 font-medium ml-1">
          <button
            onClick={onSwitchToLogin}
            
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
