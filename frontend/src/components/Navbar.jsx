import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import Popup from "../pages/Popup";
import Login from "./Login";
import Register from "./Register";
import RoleSelector from "./Roleselector";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const closeModal = () => {
    setModalType(null);
    setSelectedRole(null);
  };

  const handleSwitchToLogin = () => {
    setModalType('login');
    setSelectedRole(null);
  };

  const handleSwitchToRegister = () => {
    setModalType('signup');
    setSelectedRole(null);
  };
  
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setModalType('signup');
  };

  const handleBackToRoleSelector = () => {
    setModalType('roleselector');
    setSelectedRole(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-2xl z-50 border-b h-20">
      <div className="w-full mx-auto h-full py-3 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo1.png" alt="Logo" className="h-2 w-40" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-evenly space-x-6">
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

          {/* Hover-only Dropdown */}
          <div className="relative group">
            <button className="text-gray-800 hover:text-blue-600 font-medium focus:outline-none ">
              Dr. Profiles &#9662;
            </button>

            <div className="absolute top-full left-0 mt-4 w-[28rem] bg-white shadow-lg rounded-lg flex p-4 border z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="w-1/2 pr-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Our Doctors
                </h3>
                <p className="text-sm text-gray-600">
                  Meet our team of experienced healthcare professionals
                </p>
              </div>
              <div className="w-1/2 flex flex-col space-y-2">
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
            className="text-gray-800 hover:text-blue-600 font-medium"
          >
            Blogs
          </Link>
        </div>

        <div className="gap-4 flex flex-row items-center">
          <div className="outline outline-gray-300 hover:outline-gray-400 rounded-md w-20 h-10 items-center justify-center flex cursor-pointer">
            <Button size="sm" className="text-black" onClick={() => setModalType('login')}>
              Log In
            </Button>
          </div>
          <div className="bg-blue-600 text-white hover:bg-blue-700 w-25 h-10 rounded-md items-center justify-center flex cursor-pointer">
            <Button size="sm" className="font-light" onClick={() => setModalType('roleselector')}>
              Sign Up
            </Button>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-3 border-t">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-800 font-medium hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-800 hover:text-blue-600 font-medium"
          >
            About
          </Link>

          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="block w-full text-left text-gray-800 font-medium hover:text-blue-600 focus:outline-none"
            >
              Dr. Profiles &#9662;
            </button>

            {dropdownOpen && (
              <div className="mt-2 ml-4 space-y-2">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Our Doctors
                  </h4>
                  <p className="text-sm text-gray-600">
                    Meet our team of experienced healthcare professionals
                  </p>
                </div>
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
            )}
          </div>

          <Link
            to="/blogs"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-800 font-medium hover:text-blue-600"
          >
            Blogs
          </Link>
          <div className="gap-2">
            <Button size="sm" className="text-black" onClick={() => setModalType('login')}>
              Log In
            </Button>
            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setModalType('roleselector')}>
              Sign up
            </Button>
          </div>
        </div>
      )}

      {/* Modal */}
      <Popup isOpen={modalType !== null} onClose={closeModal}>
        {modalType === 'login' ? (
          <Login onSwitchToRegister={() => setModalType('roleselector')} />
        ) : modalType === 'roleselector' ? (
          <RoleSelector 
            onRoleSelect={handleRoleSelect} 
            onSwitchToLogin={() => setModalType('login')}
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