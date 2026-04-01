"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBriefcase, FaBars, FaTimes, FaSignInAlt, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { getCurrentUser, logout } from "../lib/auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, [pathname]);

  async function handleLogout() {
    await logout();
    setUser(null);
    setMenuOpen(false);
    router.push("/");
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/career-counseling", label: "Career Counseling" },
    { href: "/resume", label: "Resume Builder" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-indigo-600"
        >
          <FaBriefcase className="text-2xl" />
          <span>CareerHub</span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    pathname === "/dashboard"
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  <FaTachometerAlt className="text-xs" /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5"
                >
                  <FaSignOutAlt className="text-xs" /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
              >
                <FaSignInAlt className="text-xs" /> Login
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-2xl text-gray-700 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <ul className="px-4 py-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-3 px-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-t mt-2 pt-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block py-3 px-3 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaTachometerAlt className="inline mr-2 text-xs" />
                    Dashboard ({user.name})
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-3 px-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <FaSignOutAlt className="inline mr-2 text-xs" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block py-3 px-3 rounded-lg text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaSignInAlt className="inline mr-2 text-xs" />
                  Login / Sign Up
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
