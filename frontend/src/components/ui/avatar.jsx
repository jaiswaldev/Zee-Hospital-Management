// components/ui/avatar.jsx
export const Avatar = ({ children, className = "" }) => (
  <div className={`rounded-full ${className}`}>
    {children}
  </div>
);

export const AvatarImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-10 h-10 object-cover" />
);

export const AvatarFallback = ({ children }) => (
  <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
    {children}
  </div>
);
