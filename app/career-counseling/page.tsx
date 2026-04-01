"use client";

import { useState, useEffect } from "react";
import {
  FaCalendarCheck,
  FaUserTie,
  FaLaptop,
  FaClipboardList,
  FaCheckCircle,
  FaHistory,
  FaTrash,
  FaSpinner,
} from "react-icons/fa";
import AuthGuard from "../components/AuthGuard";

interface BookedSession {
  id: number;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  experience: string;
  sessionTime: string;
  message: string;
  createdAt: string;
}

export default function CareerCounseling() {
  const [submitted, setSubmitted] = useState(false);
  const [sessions, setSessions] = useState<BookedSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    experience: "",
    sessionTime: "",
    message: "",
  });

  useEffect(() => {
    fetch("/api/sessions")
      .then((res) => res.json())
      .then((data) => {
        if (data.sessions) setSessions(data.sessions);
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.session) {
        setSessions([data.session, ...sessions]);
      }
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        jobTitle: "",
        experience: "",
        sessionTime: "",
        message: "",
      });
    } catch {
      alert("Failed to book session. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteSession(id: number) {
    try {
      await fetch(`/api/sessions?id=${id}`, { method: "DELETE" });
      setSessions(sessions.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete session.");
    }
  }

  return (
    <AuthGuard>
      {/* Hero */}
      <section className="bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold">Career Counseling</h1>
          <p className="mt-4 text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto">
            Discover your perfect career path with expert guidance and
            personalized advice
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
            Our Counseling Services
          </h2>
          <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive career guidance tailored to your needs
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<FaUserTie className="text-2xl text-indigo-600" />}
              title="1-on-1 Counseling"
              description="Personal sessions with experienced career advisors."
            />
            <ServiceCard
              icon={<FaLaptop className="text-2xl text-indigo-600" />}
              title="Online Sessions"
              description="Get guidance from the comfort of your home via video call."
            />
            <ServiceCard
              icon={<FaClipboardList className="text-2xl text-indigo-600" />}
              title="Skill Assessment"
              description="Identify your strengths and areas for improvement."
            />
            <ServiceCard
              icon={<FaCalendarCheck className="text-2xl text-indigo-600" />}
              title="Interview Prep"
              description="Mock interviews and tips from industry professionals."
            />
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
            What You&apos;ll Get
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Personalized career roadmap",
              "Industry-specific guidance",
              "Resume & portfolio review",
              "Interview preparation tips",
              "Networking strategies",
              "Salary negotiation advice",
              "Job search techniques",
              "Confidence building exercises",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-3">
                <FaCheckCircle className="text-green-500 shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booked Sessions History */}
      {sessions.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 flex items-center justify-center gap-3">
              <FaHistory className="text-indigo-600" />
              Your Booked Sessions
            </h2>
            <div className="mt-10 space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">{session.name}</p>
                    <p className="text-sm text-gray-600">{session.email}</p>
                    {session.experience && (
                      <span className="inline-block text-xs bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full">
                        {session.experience}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-indigo-600">
                        {new Date(session.sessionTime).toLocaleDateString("en-PK", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(session.sessionTime).toLocaleTimeString("en-PK", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="text-red-400 hover:text-red-600 p-2"
                      title="Remove session"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Form */}
      <section className={`py-16 md:py-20 ${sessions.length > 0 ? "bg-white" : "bg-gray-50"}`}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
              Book Your Session
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Fill in the form below and we&apos;ll schedule your session
            </p>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <FaCheckCircle className="text-green-500 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-green-600">
                  Session Booked Successfully!
                </h3>
                <p className="mt-2 text-gray-600">
                  We&apos;ll reach out to confirm your appointment shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Job Title</label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white text-sm"
                    >
                      <option value="">Select</option>
                      <option value="Student">Student</option>
                      <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                      <option value="Mid Level (3-7 years)">Mid Level (3-7 years)</option>
                      <option value="Senior Level (8+ years)">Senior Level (8+ years)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Session Time</label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.sessionTime}
                      onChange={(e) => setFormData({ ...formData, sessionTime: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What do you need help with?</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your career goals and challenges..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? <><FaSpinner className="animate-spin" /> Booking...</> : "Book Session"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </AuthGuard>
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}
