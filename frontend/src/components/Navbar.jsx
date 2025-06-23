// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { Button } from "./ui/button";
// import Popup from "../pages/Popup";
// import Login from "./Login";
// import Register from "./Register";
// import RoleSelector from "./Roleselector";

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [modalType, setModalType] = useState(null);
//   const [selectedRole, setSelectedRole] = useState(null);

//   const closeModal = () => {
//     setModalType(null);
//     setSelectedRole(null);
//   };

//   const handleSwitchToLogin = () => {
//     setModalType('login');
//     setSelectedRole(null);
//   };

//   const handleSwitchToRegister = () => {
//     setModalType('signup');
//     setSelectedRole(null);
//   };

//   const handleRoleSelect = (role) => {
//     setSelectedRole(role);
//     setModalType('signup');
//   };

//   const handleBackToRoleSelector = () => {
//     setModalType('roleselector');
//     setSelectedRole(null);
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white shadow-2xl z-50 border-b h-20">
//       <div className="w-full mx-auto h-full py-3 flex items-center justify-between px-4 sm:px-6 lg:px-8">
//         {/* Logo */}
//         <Link to="/" className="flex items-center space-x-2">
//           <img src="/logo1.png" alt="Logo" className="h-2 w-40" />
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex justify-evenly space-x-6">
//           <Link
//             to="/"
//             className="text-gray-800 hover:text-blue-600 font-medium"
//           >
//             Home
//           </Link>
//           <Link
//             to="/about"
//             className="text-gray-800 hover:text-blue-600 font-medium"
//           >
//             About
//           </Link>

//           {/* Hover-only Dropdown */}
//           <div className="relative group">
//             <button className="text-gray-800 hover:text-blue-600 font-medium focus:outline-none ">
//               Dr. Profiles &#9662;
//             </button>

//             <div className="absolute top-full left-0 mt-4 w-[28rem] bg-white shadow-lg rounded-lg flex p-4 border z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//               <div className="w-1/2 pr-4">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                   Our Doctors
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Meet our team of experienced healthcare professionals
//                 </p>
//               </div>
//               <div className="w-1/2 flex flex-col space-y-2">
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-900">
//                     Specialties
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     Browse doctors by medical specialty
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-900">
//                     Appointments
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     Schedule an appointment with our doctors
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <Link
//             to="/blog"
//             className="text-gray-800 hover:text-blue-600 font-medium"
//           >
//             Blogs
//           </Link>
//         </div>

//         <div className="gap-4 flex flex-row items-center">
//           <div className="outline outline-gray-300 hover:outline-gray-400 rounded-md w-20 h-10 items-center justify-center flex cursor-pointer">
//             <Button size="sm" className="text-black" onClick={() => setModalType('login')}>
//               Log In
//             </Button>
//           </div>
//           <div className="bg-blue-600 text-white hover:bg-blue-700 w-25 h-10 rounded-md items-center justify-center flex cursor-pointer">
//             <Button size="sm" className="font-light" onClick={() => setModalType('roleselector')}>
//               Sign Up
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu Icon */}
//         <div className="md:hidden">
//           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-3 border-t">
//           <Link
//             to="/"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className="block text-gray-800 font-medium hover:text-blue-600"
//           >
//             Home
//           </Link>
//           <Link
//             to="/about"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className="block text-gray-800 hover:text-blue-600 font-medium"
//           >
//             About
//           </Link>

//           <div>
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="block w-full text-left text-gray-800 font-medium hover:text-blue-600 focus:outline-none"
//             >
//               Dr. Profiles &#9662;
//             </button>

//             {dropdownOpen && (
//               <div className="mt-2 ml-4 space-y-2">
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-900">
//                     Our Doctors
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     Meet our team of experienced healthcare professionals
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-900">
//                     Specialties
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     Browse doctors by medical specialty
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-900">
//                     Appointments
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     Schedule an appointment with our doctors
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <Link
//             to="/blogs"
//             onClick={() => setIsMobileMenuOpen(false)}
//             className="block text-gray-800 font-medium hover:text-blue-600"
//           >
//             Blogs
//           </Link>
//           <div className="gap-2">
//             <Button size="sm" className="text-black" onClick={() => setModalType('login')}>
//               Log In
//             </Button>
//             <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setModalType('roleselector')}>
//               Sign up
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Modal */}
//       <Popup isOpen={modalType !== null} onClose={closeModal}>
//         {modalType === 'login' ? (
//           <Login onSwitchToRegister={() => setModalType('roleselector')} />
//         ) : modalType === 'roleselector' ? (
//           <RoleSelector
//             onRoleSelect={handleRoleSelect}
//             onSwitchToLogin={() => setModalType('login')}
//           />
//         ) : (
//           <Register
//             selectedRole={selectedRole}
//             onSwitchToLogin={handleSwitchToLogin}
//             onBackToRoleSelector={handleBackToRoleSelector}
//           />
//         )}
//       </Popup>
//     </nav>
//   );
// };

// export default Navbar;

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

const Navbar = ({
  isLoggedIn = false,
  userRole,
  userName = "User",
  userAvatar,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  // const navigate = useNavigate();
  const location = useLocation();

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

  const handleLogout = () => {
    navigate("/");
  };

  const getDashboardPath = () => {
    if(userRole === "doctor") return  "/doctor/dashboard";
    if(userRole === "patient") return  "/patient/dashboard";
    return "/";
  };

  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-white border-b-8 border-gray-800 shadow-xl sticky top-0 z-500 flex flex-col items-center justify-center">
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
      <div className="w-full mx-auto  py-3 flex items-center justify-between px-4 h-10">
        {/* Logo */}
        <Link to={getDashboardPath()} className="flex items-center space-x-2">
          <img src="/logo1.png" alt="Logo" className="h-2 w-40" />
        </Link>

        {/* <div className="hidden md:flex items-center space-x-8"> */}
        {isLoggedIn ? (
          <>
            <div className="hidden lg:flex items-center space-x-6">
              {userRole === "doctor" && (
                <>
                  <Link
                    to="/appointments"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                  >
                    Appointments
                  </Link>
                  <Link
                    to="/patients"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                  >
                    Patients
                  </Link>
                  <Link
                    to="/blog"
                    className="text-gray-800 hover:text-blue-600 font-medium cursor-pointer"
                  >
                    Blogs
                  </Link>
                </>
              )}

              {userRole === "patient" && (
                <>
                  <Link
                    to="/my-appointments"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                  >
                    My Appointments
                  </Link>
                  <Link
                    to="/doctors"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                  >
                    Find Doctors
                  </Link>
                  {/* Hover-only Dropdown */}
                  <div className="relative group">
                    <button className="text-gray-800 hover:text-blue-600 font-medium focus:outline-none cursor-pointer">
                      Dr. Profiles &#9662;
                    </button>

                    <div className="absolute top-full left-0 mt-4 w-[28rem] bg-white shadow-lg rounded-lg flex p-4 border z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="w-1/2 pr-4 cursor-pointer">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Our Doctors
                        </h3>
                        <p className="text-sm text-gray-600">
                          Meet our team of experienced healthcare professionals
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
                  </div>
                  <Link
                    to="/blog"
                    className="text-gray-800 hover:text-blue-600 font-medium cursor-pointer"
                  >
                    Blogs
                  </Link>
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
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full cursor-pointer"
                  >
                    <Avatar className="h-10 w-10">
                      {/* <AvatarImage src={userAvatar} alt={userName} /> */}
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {getUserInitials(userName)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-white"
                  align="end"
                  forceMount
                >
                  {/* <DropdownMenuLabel className="font-normal hover:bg-gray-300 cursor-pointer">
                    <div className="flex flex-col space-y-1 ">
                      <div className="text-xl font-medium leading-none">
                        {userName}
                      </div>
                      <div className="text-xs leading-none text-muted-foreground capitalize">
                        {userRole}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator /> */}
                  <DropdownMenuItem className="hover:bg-gray-300 cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
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
            <div className="hidden lg:flex items-center  space-x-6">
              <div className=" outline outline-gray-300 hover:outline-gray-500 rounded-md w-20 h-10 items-center justify-center flex cursor-pointer">
                <Button
                  size="sm"
                  className="text-black"
                  onClick={() => setModalType("login")}
                >
                  Log In
                </Button>
              </div>
              <div className="bg-blue-600 text-white hover:bg-blue-700 w-25 h-10 rounded-md items-center justify-center flex cursor-pointer">
                <Button
                  size="sm"
                  className="font-light"
                  onClick={() => setModalType("roleselector")}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </>
        )}
        {/* </div> */}

        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={48} /> : <Menu size={48} />}
          </Button>
        </div>
      </div>
      {/* <hr className="md:hidden my-4 border-t-6 border-gray-600 w-full" /> */}
      {isMobileMenuOpen && (
        <div className="lg:hidden w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-500">
            {isLoggedIn ? (
              <>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  {/* <div className="flex items-center px-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {getUserInitials(userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {userName}
                      </div>
                      <div className="text-sm font-medium text-gray-500 capitalize">
                        {userRole}
                      </div>
                    </div>
                  </div> */}
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

                  <div className="flex flex-col space-y-5 items-center justify-center w-full">
                    <div className=" outline bg-gray-700 rounded-md w-full h-10 items-center justify-center flex cursor-pointer text-white">
                      <Button
                        size="sm"
                        className="text-black"
                        onClick={() => setModalType("login")}
                      >
                        Log In
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* </div> */}
      {/* Modal */}
      <Popup isOpen={modalType !== null} onClose={closeModal}>
        {modalType === "login" ? (
          <Login onSwitchToRegister={() => setModalType("roleselector")} />
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
