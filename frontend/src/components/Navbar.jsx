import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Menu,
  X,
  Stethoscope,
  LogOut,
  User,
  Settings,
  Bell,
} from "lucide-react";
import Popup from "../pages/Popup";
import Login from "./Login";
import Register from "./Register";
import RoleSelector from "./Roleselector";
import axiosInstance from "../Utils/AxiosInstance";
import { toast } from "sonner";
import { FaUserPlus } from "react-icons/fa";

const Navbar = ({ isLoggedIn, setIsAuthenticated, userRole, userName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const location = useLocation();
  const Backend_API = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const closeModal = () => {
    setModalType(null);
    setSelectedRole(null);
  };

  const handleSwitchToLogin = () => {
    setModalType("login");
    setSelectedRole(null);
  };

  const handleSwitchToRegister = () => {
    setModalType("signup");
    setSelectedRole(null);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setModalType("signup");
  };

  const handleBackToRoleSelector = () => {
    setModalType("roleselector");
    setSelectedRole(null);
  };

  const handleLogout = async () => {
    const endpoint =
      userRole === "patient"
        ? `${Backend_API}/patient/auth/logout`
        : `${Backend_API}/doctor/auth/logout`;
    try {
      const res = await axiosInstance.post(endpoint);
      const message = res?.data?.message || "Logged out successfully.";
      toast.success(message);
      if (typeof setIsAuthenticated === "function") {
        setIsAuthenticated(false);
      }
      setTimeout(() => {
        navigate("/");
      }, 300);
    } catch (error) {
      const message = error?.response?.data?.message || "Logout failed.";
      toast.error(message);
      // window.location.href = "/";
    }
  };

  const getDashboardPath = () => {
    if (userRole === "doctor") return "/doctor";
    if (userRole === "patient") return "/patient";
    return "/";
  };

  const getUserInitials = (name) => {
    if (!name || typeof name !== "string") return "NA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-white border-b-1 border-gray-800 shadow-xl sticky top-0 z-500 flex flex-col items-center justify-center">
      <div className="w-full mx-auto  py-3 flex items-center justify-between px-4 h-10">
        <Link to={getDashboardPath()} className="flex items-center space-x-2">
          <img src="/logo1.png" alt="Logo" className="h-20 w-40" />
        </Link>

        {isLoggedIn ? (
          <>
            <div className="hidden lg:flex items-center space-x-6">
              {userRole === "doctor" && (
                <>
                  <div className="hidden lg:flex justify-evenly space-x-10">
                    <Link
                      to="/"
                      className="relative group text-black font-semibold"
                    >
                      Home
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link
                      to="/store"
                      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                    >
                      Store
                    </Link>

                    <Link
                      to="/appointments"
                      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                    >
                      Appointments
                    </Link>

                    <Link
                      to="/about"
                      className="relative group text-black font-semibold"
                    >
                      About
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link
                      to="/blog"
                      className="relative group text-black font-semibold"
                    >
                      Blogs
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </div>
                </>
              )}

              {userRole === "patient" && (
                <>
                  <div className="hidden lg:flex justify-evenly space-x-10">
                    <Link
                      to="/"
                      className="relative group text-black font-semibold"
                    >
                      Home
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link
                      to="/store"
                      className="relative group text-black font-semibold"
                    >
                      Store
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link
                      to="/doctors"
                      className="relative group text-black font-semibold"
                    >
                      Doctors &#9662;
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                      <div className="absolute top-full left-0 mt-4 w-[28rem] bg-white shadow-lg rounded-lg flex p-4 border z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="w-1/2 pr-4 cursor-pointer">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Our Doctors
                          </h3>
                          <p className="text-sm text-gray-600">
                            Meet our team of experienced healthcare
                            professionals
                          </p>
                        </div>
                        <div className="w-1/2 flex flex-col space-y-2 cursor-pointer">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">
                              Specialties
                            </h4>
                            <p className="text-sm text-gray-600">
                              Browse doctors by medical specialty
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">
                              Appointments
                            </h4>
                            <p className="text-sm text-gray-600">
                              Schedule an appointment with our doctors
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/about"
                      className="relative group text-black font-semibold"
                    >
                      About
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link
                      to="/blog"
                      className="relative group text-black font-semibold"
                    >
                      Blogs
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </div>
                </>
              )}
            </div>
            <div className="hidden lg:flex flex-row gap-5">
              <div className="bg-gray-200 rounded-xl hover:bg-gray-300">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {userName ? (
                    
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full cursor-pointer"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {getUserInitials(userName)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  ) : (
                   
                    <div className="bg-gray-200 rounded-xl hover:bg-gray-300">
                      <Button variant="ghost" size="icon" className="relative">
                        <FaUserPlus className="text-gray-700" />
                      </Button>
                    </div>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-white"
                  align="end"
                  forceMount
                >
                  <DropdownMenuItem className="hover:bg-gray-300 cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  {userRole === "patient" && (
                    <DropdownMenuItem className="hover:bg-gray-300 cursor-pointer">
                      <Link
                        to="/my-appointments"
                        className="flex items-center w-full text-gray-700"
                      >
                        <Stethoscope className="mr-2 h-4 w-4" />
                        <span>My Appointments</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {userRole === "doctor" && (
                    <DropdownMenuItem className="hover:bg-gray-300 cursor-pointer">
                      <Link
                        to="/my-appointments"
                        className="flex items-center w-full text-gray-700"
                      >
                        <Stethoscope className="mr-2 h-4 w-4" />
                        <span>My Appointments</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="hover:bg-gray-300 cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 hover:bg-gray-300 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <>
            <div className="hidden lg:flex justify-evenly space-x-10">
              <Link to="/" className="relative group text-black font-semibold">
                Home
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/about"
                className="relative group text-black font-semibold"
              >
                About
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/blog"
                className="relative group text-black font-semibold"
              >
                Blogs
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
            <div className="hidden lg:flex items-center  space-x-6">
              <Button
                variant="outline"
                size="sm"
                className="outline outline-gray-300 hover:outline-gray-500 rounded-md w-20 h-10 items-center justify-center flex cursor-pointer"
                onClick={() => setModalType("login")}
              >
                Log In
              </Button>

              <Button
                size="sm"
                className=" bg-blue-600 text-white hover:bg-blue-700 w-25 h-10 rounded-md items-center justify-center flex cursor-pointer"
                onClick={() => setModalType("roleselector")}
              >
                Sign Up
              </Button>
            </div>
          </>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggedIn ? (
              <>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="mt-3 space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-600 hover:text-blue-600"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-600 hover:text-blue-600"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </div>
                <div>
                  {userRole === "doctor" && (
                    <>
                      <Link
                        to="/appointments"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Appointments
                      </Link>
                      <Link
                        to="/patients"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Patients
                      </Link>
                    </>
                  )}

                  {userRole === "patient" && (
                    <>
                      <Link
                        to="/my-appointments"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Appointments
                      </Link>
                      <Link
                        to="/doctors"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Find Doctors
                      </Link>
                    </>
                  )}
                </div>
                <DropdownMenuSeparator />

                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center gap-5">
                  <div className="w-[90%] h-px bg-gray-500 my-2"></div>
                  <div className="flex flex-col space-y-5 items-center justify-center ">
                    <Link
                      to="/"
                      className="text-gray-800 hover:text-blue-600 font-medium"
                    >
                      Home
                    </Link>
                    <Link
                      to="/about"
                      className="text-gray-800 hover:text-blue-600 font-medium"
                    >
                      About
                    </Link>
                    <Link
                      to="/blog"
                      className="text-gray-800 hover:text-blue-600 font-medium"
                    >
                      Blogs
                    </Link>
                  </div>

                  <Button
                    size="sm"
                    className="outline bg-gray-700 rounded-md w-full h-10 items-center justify-center flex cursor-pointer text-white"
                    onClick={() => setModalType("login")}
                  >
                    Log In
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <Popup isOpen={modalType !== null} onClose={closeModal}>
        {modalType === "login" ? (
          <Login
            onSwitchToRegister={() => setModalType("roleselector")}
            onLoginSuccess={closeModal}
          />
        ) : modalType === "roleselector" ? (
          <RoleSelector
            onRoleSelect={handleRoleSelect}
            onSwitchToLogin={() => setModalType("login")}
          />
        ) : (
          <Register
            selectedRole={selectedRole}
            onSwitchToLogin={handleSwitchToLogin}
            onBackToRoleSelector={handleBackToRoleSelector}
          />
        )}
      </Popup>
    </nav>
  );
};

export default Navbar;
