// components/ui/badge.jsx
export const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full ${className}`}
  >
    {children}
  </span>
);
