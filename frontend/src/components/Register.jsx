import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { User, UserPlus, Stethoscope, Heart } from "lucide-react";
import { toast } from "sonner";

const Register = ({ selectedRole, onSwitchToLogin, onBackToRoleSelector }) => {
  const Backend_API = import.meta.env.VITE_BACKEND_URL;
  // if (!Backend_API) {
  //   console.error("VITE_BACKEND_URL is not defined in .env file");
  //   return <div>Error: Backend API URL is not configured.</div>;
  // }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    // Doctor specific fields
    licenseNumber: "",
    specialization: "",
    experience: "",
    qualifications: "",
    hospitalAffiliation: "",
    // Patient specific fields
    emergencyContactNumber: "",
    medicalHistory: "",
    allergies: "",
    bloodGroup: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    try {
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
      };

      if (selectedRole === "patient") {
        registrationData.emergencyContactNumber =
          formData.emergencyContactNumber;
        registrationData.medicalHistory = formData.medicalHistory;
        registrationData.allergies = formData.allergies;
        registrationData.bloodGroup = formData.bloodGroup;
      } else if (selectedRole === "doctor") {
        registrationData.licenseNumber = formData.licenseNumber;
        registrationData.specialization = formData.specialization;
        registrationData.experience = formData.experience;
        registrationData.qualifications = formData.qualifications;
        registrationData.hospitalAffiliation = formData.hospitalAffiliation;
      }

      const endpoint =
        selectedRole === "patient"
          ? `${Backend_API}/patient/auth/register`
          : `${Backend_API}/doctor/auth/register`;

      const res = await axios.post(endpoint, registrationData);
      const data = res.data; // <-- axios handles JSON parsing automatically

      toast.success(data?.message || "Registration successful!");
      // console.log("Registration successful.", data);

      onSwitchToLogin();
    } catch (err) {
      // console.error("Registration error.", err);
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "An error occurred during registration."
      );
    }
  };

  const doctorSpecializations = [
    "Cardiology",
    "Dermatology",
    "Emergency Medicine",
    "Endocrinology",
    "Gastroenterology",
    "General Medicine",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="h-100 p-2 sm:p-4 md:p-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="text-center ">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-blue-600 p-3 rounded-full mr-4">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <div className="text-xl font-bold text-gray-900">
              ZeeCare Portal
            </div>
          </div>
          <div className="text-lg text-gray-600">
            Join our healthcare community
          </div>
        </div>

        {/* Role Selection */}
        {!selectedRole && <RoleSelector onRoleSelect={selectedRole} />}

        {/* Registration Form */}
        {selectedRole && (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-4">
                {selectedRole === "doctor" ? (
                  <Stethoscope className="h-8 w-8 text-blue-600" />
                ) : (
                  <User className="h-8 w-8 text-green-600" />
                )}
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Register as {selectedRole === "doctor" ? "Doctor" : "Patient"}
              </CardTitle>

              <div
                onClick={onBackToRoleSelector}
                className="flex justify-start mt-2 text-gray-600 hover:text-gray-900 cursor-pointer w-fit"
              >
                ← Back
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Personal Information
                  </div>

                  <div className="md:grid md:grid-cols-2 gap-4 flex flex-col">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          type="text"
                          onChange={handleInputChange}
                          // required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          type="text"
                          onChange={handleInputChange}
                          // required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                        <Input
                          id="email"
                          name="email"
                          autoComplete="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          // required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth </Label>
                      <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                        <Select
                          onValueChange={(value) =>
                            handleSelectChange("gender", value)
                          }
                          // required
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent className="bg-white h-35 cursor-pointer">
                            <SelectItem
                              value="Male"
                              className="hover:bg-amber-50"
                            >
                              Male
                            </SelectItem>
                            <SelectItem
                              value="Female"
                              className="hover:bg-amber-50"
                            >
                              Female
                            </SelectItem>
                            <SelectItem
                              value="Other"
                              className="hover:bg-amber-50"
                            >
                              Other
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="address">Address </Label>
                    <div className="border-cyan-400 outline rounded-md shadow-sm">
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Role-specific fields */}
                {selectedRole === "doctor" && (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Stethoscope className="h-5 w-5 mr-2" />
                      Professional Information
                    </div>

                    <div className="md:grid md:grid-cols-2 gap-4 flex flex-col">
                      <div>
                        <Label htmlFor="licenseNumber">
                          Medical License Number
                        </Label>
                        <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                          <Input
                            id="licenseNumber"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleInputChange}
                            // required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="specialization">Specialization </Label>
                        <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                          <Select
                            onValueChange={(value) =>
                              handleSelectChange("specialization", value)
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                            <SelectContent className="bg-white h-50">
                              {doctorSpecializations.map((spec) => (
                                <SelectItem
                                  key={spec}
                                  value={spec.toLowerCase()}
                                  className="hover:bg-amber-50"
                                >
                                  {spec}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="experience">Years of Experience</Label>
                        <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                          <Input
                            id="experience"
                            name="experience"
                            type="number"
                            min="0"
                            max="50"
                            value={formData.experience}
                            onChange={handleInputChange}
                            // required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="hospitalAffiliation">
                          Hospital Affiliation
                        </Label>
                        <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                          <Input
                            id="hospitalAffiliation"
                            name="hospitalAffiliation"
                            value={formData.hospitalAffiliation}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="qualifications">Qualifications </Label>
                      <div className="border-cyan-400 outline rounded-md shadow-sm">
                        <Textarea
                          id="qualifications"
                          name="qualifications"
                          value={formData.qualifications}
                          onChange={handleInputChange}
                          // required
                          placeholder="e.g., MBBS, MD, Fellowship details..."
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedRole === "patient" && (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Heart className="h-5 w-5 mr-2" />
                      Medical Information
                    </div>

                    <div className="md:grid md:grid-cols-2 gap-4 flex flex-col">
                      <div>
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                          <Select
                            onValueChange={(value) =>
                              handleSelectChange("bloodGroup", value)
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select blood group" />
                            </SelectTrigger>
                            <SelectContent className="bg-white h-50">
                              {bloodGroups.map((group) => (
                                <SelectItem
                                  key={group}
                                  value={group}
                                  className="hover:bg-amber-50"
                                >
                                  {group}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="emergencyContactPhone">
                          Emergency Contact Number *
                        </Label>
                        <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                          <Input
                            id="emergencyContactNumber"
                            name="emergencyContactNumber"
                            type="tel"
                            value={formData.emergencyContactPhone}
                            onChange={handleInputChange}
                            // required
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="allergies">Known Allergies</Label>
                        <div className="border-cyan-400 outline rounded-md shadow-sm">
                          <Textarea
                            id="allergies"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleInputChange}
                            placeholder="List any known allergies..."
                            className="mt-1"
                            rows={3}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="medicalHistory">Medical History</Label>
                        <div className="border-cyan-400 outline rounded-md shadow-sm">
                          <Textarea
                            id="medicalHistory"
                            name="medicalHistory"
                            value={formData.medicalHistory}
                            onChange={handleInputChange}
                            placeholder="Brief medical history..."
                            className="mt-1"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Password Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 mb-4">
                    Account Security
                  </div>

                  <div className="md:grid md:grid-cols-2 gap-4 flex flex-col">
                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="new-password"
                          value={formData.password}
                          onChange={handleInputChange}
                          // required
                          className="mt-1"
                          minLength={8}
                        />
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Minimum 8 characters*
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">
                        Confirm Password *
                      </Label>
                      <div className="border-cyan-400 outline rounded-md shadow-sm h-10">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          autoComplete="new-password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          // required
                          className="mt-1"
                          minLength={6}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}

                <Button
                  type="submit"
                  className={`w-full h-10 flex items-center justify-center rounded-xl text-lg font-semibold transition-all duration-200 cursor-pointer ${
                    selectedRole === "doctor"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Register
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
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

export default Register;
