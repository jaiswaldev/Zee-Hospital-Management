// components/ui/tabs.jsx
import { useState } from "react";

export const Tabs = ({ children }) => <div>{children}</div>;

export const TabsList = ({ children }) => (
  <div className="flex border-b mb-4">{children}</div>
);

export const TabsTrigger = ({ label, isActive, onClick }) => (
  <button
    className={`px-4 py-2 text-sm font-medium ${
      isActive ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export const TabsContent = ({ isActive, children }) =>
  isActive ? <div>{children}</div> : null;
