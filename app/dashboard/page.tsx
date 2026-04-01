"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaUser,
  FaFileAlt,
  FaCalendarCheck,
  FaEnvelope,
  FaSignOutAlt,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { getCurrentUser, logout, AuthUser } from "../lib/auth";

interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  summary: string;
  skills: string;
}

interface SessionData {
  id: number;
  name: string;
  email: string;
  sessionTime: string;
  experience: string;
}

interface ContactData {
  id: number;
  subject: string;
  message: string;
  sentAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);

      const [resumeRes, sessionsRes, contactsRes] = await Promise.all([
        fetch("/api/resume").then((r) => r.json()).catch(() => ({})),
        fetch("/api/sessions").then((r) => r.json()).catch(() => ({})),
        fetch("/api/contact").then((r) => r.json()).catch(() => ({})),
      ]);

      setResume(resumeRes.resume || null);
      setSessions(sessionsRes.sessions || []);
      setContacts(contactsRes.contacts || []);
      setLoading(false);
    }
    loadDashboard();
  }, [router]);

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-indigo-200 text-sm font-medium">Welcome back,</p>
              <h1 className="text-3xl sm:text-4xl font-bold mt-1">{user?.name}</h1>
              <p className="text-indigo-200 mt-1">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-colors font-medium text-sm"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DashStatCard
              icon={<FaFileAlt className="text-indigo-600" />}
              label="Resume"
              value={resume?.fullName ? "Created" : "Not Created"}
              color={resume?.fullName ? "green" : "yellow"}
            />
            <DashStatCard
              icon={<FaCalendarCheck className="text-indigo-600" />}
              label="Sessions Booked"
              value={String(sessions.length)}
              color="blue"
            />
            <DashStatCard
              icon={<FaEnvelope className="text-indigo-600" />}
              label="Messages Sent"
              value={String(contacts.length)}
              color="purple"
            />
            <DashStatCard
              icon={<FaClock className="text-indigo-600" />}
              label="Member Since"
              value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-PK", { month: "short", year: "numeric" }) : "Today"}
              color="gray"
            />
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Resume Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaFileAlt className="text-indigo-600" /> Your Resume
              </h2>
              <Link href="/resume" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                {resume?.fullName ? "Edit" : "Create"} <FaArrowRight className="text-xs" />
              </Link>
            </div>
            <div className="p-6">
              {resume?.fullName ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                      <FaUser className="text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{resume.fullName}</h3>
                      <p className="text-sm text-indigo-600">{resume.jobTitle}</p>
                      <p className="text-xs text-gray-500 mt-1">{resume.email} {resume.phone && `| ${resume.phone}`}</p>
                    </div>
                  </div>
                  {resume.summary && <p className="text-sm text-gray-600 line-clamp-2">{resume.summary}</p>}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {resume.skills && resume.skills.split(",").slice(0, 5).map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium">{skill.trim()}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <FaCheckCircle className="text-green-500 text-sm" />
                    <span className="text-sm text-green-600 font-medium">Resume ready for download</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaExclamationCircle className="text-4xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">You haven&apos;t created a resume yet.</p>
                  <Link href="/resume" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                    <FaFileAlt /> Create Resume
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Booked Sessions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaCalendarCheck className="text-indigo-600" /> Booked Sessions
              </h2>
              <Link href="/career-counseling" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                Book New <FaArrowRight className="text-xs" />
              </Link>
            </div>
            <div className="p-6">
              {sessions.length > 0 ? (
                <div className="space-y-3">
                  {sessions.slice(0, 5).map((session) => (
                    <div key={session.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{session.name}</p>
                        <p className="text-xs text-gray-500">{session.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-indigo-600">
                          {new Date(session.sessionTime).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(session.sessionTime).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {sessions.length > 5 && <p className="text-xs text-gray-500 text-center pt-2">+{sessions.length - 5} more sessions</p>}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaExclamationCircle className="text-4xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No sessions booked yet.</p>
                  <Link href="/career-counseling" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                    <FaCalendarCheck /> Book Session
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Contact Messages */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaEnvelope className="text-indigo-600" /> Sent Messages
              </h2>
              <Link href="/#contact" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                Send New <FaArrowRight className="text-xs" />
              </Link>
            </div>
            <div className="p-6">
              {contacts.length > 0 ? (
                <div className="space-y-3">
                  {contacts.slice(0, 5).map((msg) => (
                    <div key={msg.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900 text-sm">{msg.subject}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(msg.sentAt).toLocaleDateString("en-PK", { day: "numeric", month: "short" })}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">{msg.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaExclamationCircle className="text-4xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No messages sent yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/resume" className="flex items-center gap-3 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <FaFileAlt className="text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Resume Builder</p>
                <p className="text-xs text-gray-500">Create or edit your resume</p>
              </div>
            </Link>
            <Link href="/career-counseling" className="flex items-center gap-3 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <FaCalendarCheck className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Book Session</p>
                <p className="text-xs text-gray-500">Get career counseling</p>
              </div>
            </Link>
            <Link href="/about" className="flex items-center gap-3 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <FaUser className="text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">About Us</p>
                <p className="text-xs text-gray-500">Learn about CareerHub</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function DashStatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    blue: "bg-blue-50 text-blue-700",
    purple: "bg-purple-50 text-purple-700",
    gray: "bg-gray-50 text-gray-700",
  };
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-xs text-gray-500 font-medium">{label}</span>
      </div>
      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${colorMap[color] || colorMap.gray}`}>
        {value}
      </span>
    </div>
  );
}
