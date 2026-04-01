"use client";

import { FaExclamationCircle, FaRedo } from "react-icons/fa";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
      <FaExclamationCircle
        className="text-6xl text-red-300 mb-6"
        aria-hidden="true"
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Something Went Wrong
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
      >
        <FaRedo /> Try Again
      </button>
    </div>
  );
}
