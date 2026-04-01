"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaLock, FaSignInAlt } from "react-icons/fa";
import { getCurrentUser } from "../lib/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setAuthenticated(!!user);
      setChecked(true);
    });
  }, []);

  if (!checked) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
          <FaLock className="text-3xl text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Please sign in to access this feature. Create a free account to get started.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          <FaSignInAlt /> Sign In
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
