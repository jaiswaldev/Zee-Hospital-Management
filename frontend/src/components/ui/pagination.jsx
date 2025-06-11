// components/ui/pagination.jsx
export const Pagination = ({ children }) => (
  <div className="flex justify-center mt-4">{children}</div>
);

export const PaginationContent = ({ children }) => (
  <nav className="inline-flex items-center space-x-1">{children}</nav>
);

export const PaginationItem = ({ children }) => <div>{children}</div>;

export const PaginationLink = ({ children, isActive = false, ...props }) => (
  <button
    className={`px-3 py-1 rounded ${
      isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
    }`}
    {...props}
  >
    {children}
  </button>
);

export const PaginationPrevious = (props) => (
  <PaginationLink {...props}>Previous</PaginationLink>
);

export const PaginationNext = (props) => (
  <PaginationLink {...props}>Next</PaginationLink>
);
