import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
const Tagline = ({ onGetStarted }) => {
  return (
    <div className="p-10 bg-gradient-to-br bg-white">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer">
              Modern Healthcare Management
            </Badge>
            <h1 className="text-2xl md:text-4xl font-bold  mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              <span className="text-black">
                Your Health,{" "}
              </span>
              Our Priority
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with verified doctors, book appointments, communicate
              securely, and manage your healthcare journey all in one
              comprehensive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onGetStarted("patient")}
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 cursor-pointer"
              >
                Join as Patient
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onGetStarted("doctor")}
                className="border-green-600 text-green-600 hover:bg-green-50 text-lg px-8 py-3 cursor-pointer"
              >
                Join as Doctor
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tagline;
