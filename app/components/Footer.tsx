import Link from "next/link";
import {
  FaBriefcase,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              <FaBriefcase />
              CareerHub
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              Your trusted platform for career counseling and professional
              resume building.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/career-counseling"
                  className="hover:text-white transition-colors"
                >
                  Career Counseling
                </Link>
              </li>
              <li>
                <Link
                  href="/resume"
                  className="hover:text-white transition-colors"
                >
                  Resume Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Resume Building</li>
              <li>Career Counseling</li>
              <li>Interview Preparation</li>
              <li>Skill Assessment</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-indigo-400" />
                info@careerhub.com
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-indigo-400" />
                +92 300 1234567
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-indigo-400" />
                Karachi, Pakistan
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} CareerHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
