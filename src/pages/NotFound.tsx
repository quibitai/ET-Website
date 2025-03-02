import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#2A2D36]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 dark:text-[#E5E5EB]">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 dark:text-[#FF7A6E] dark:hover:text-[#FF9A8E] underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
