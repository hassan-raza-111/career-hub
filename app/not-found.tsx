import Link from "next/link";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
      <FaExclamationTriangle className="text-6xl text-indigo-300 mb-6" aria-hidden="true" />
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        Page Not Found
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
      >
        <FaHome /> Go Back Home
      </Link>
    </div>
  );
}
