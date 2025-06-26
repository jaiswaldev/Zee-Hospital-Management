import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Stethoscope, User } from "lucide-react";

const RoleSelector = ({ onRoleSelect, onSwitchToLogin }) => {
  return (
    <div className="max-w-3xl mx-auto mb-4 h-100 px-2 sm:px-0">
      <div className="text-center mb-2">
        <div className="text-l font-bold text-gray-900 mb-2">
          Choose Your Role
        </div>
        <div className="text-gray-600 text-s">
          Select how you want to register in our system
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Doctor Card */}
        <Card
          onClick={() => onRoleSelect("doctor")}
          className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-1 border-gray-400 hover:border-blue-400 bg-gray-200 backdrop-blur-sm flex-1 "
        >
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
            <div className="mt-4 text-l font-bold">Register as Doctor</div>
          </CardContent>
        </Card>

        {/* Patient Card */}
        <Card
          onClick={() => onRoleSelect("patient")}
          className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-1 border-gray-400 hover:border-blue-400 bg-gray-200 backdrop-blur-sm flex-1 "
        >
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
            <div className="mt-4 text-l font-bold">Register as Patient</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-2 text-xl text-gray-600 flex justify-end items-center">
        Already Registered?{" "}
        <Button
          onClick={onSwitchToLogin}
          className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer text-xl"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default RoleSelector;
