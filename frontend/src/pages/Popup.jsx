import React,{useEffect} from "react";
import { X } from "lucide-react";

const Popup = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling when popup is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore background scrolling when popup is closed
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-opacity-10 backdrop-blur-xs "
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl mx-2 sm:mx-4 max-w-2xl max-h-[80vh] overflow-y-auto transition-all duration-400 ease-in-out">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <X size={24} />
        </button>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 transition-all duration-150 ease-in-out">{children}</div>
      </div>
    </div>
  );
};

export default Popup;

// import React, { useEffect } from 'react';
// import { X } from 'lucide-react';

// const Popup = ({ isOpen, onClose, children }) => {
//   useEffect(() => {
//     if (isOpen) {
//       // Prevent background scrolling when popup is open
//       document.body.style.overflow = 'hidden';
//     } else {
//       // Restore background scrolling when popup is closed
//       document.body.style.overflow = 'unset';
//     }

//     // Cleanup function to restore scrolling when component unmounts
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Modal Content */}
//       <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
//         >
//           <X size={24} />
//         </button>

//         {/* Modal Body */}
//         <div className="p-6 max-h-[90vh] overflow-y-auto">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popup;
