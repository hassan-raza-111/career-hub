"use client";

import { useState, useRef, useEffect } from "react";
import { FaDownload, FaEye, FaPlus, FaTrash, FaSave, FaSpinner } from "react-icons/fa";
import AuthGuard from "../components/AuthGuard";

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  experiences: ExperienceItem[];
  educations: EducationItem[];
  skills: string;
  languages: string;
}

const emptyExperience: ExperienceItem = {
  company: "",
  role: "",
  duration: "",
  description: "",
};
const emptyEducation: EducationItem = {
  degree: "",
  institution: "",
  year: "",
};

const initialData: ResumeData = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  address: "",
  summary: "",
  experiences: [{ ...emptyExperience }],
  educations: [{ ...emptyEducation }],
  skills: "",
  languages: "",
};

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [generated, setGenerated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Load saved resume from API on mount
  useEffect(() => {
    fetch("/api/resume")
      .then((res) => res.json())
      .then((result) => {
        if (result.resume) {
          const r = result.resume;
          setData({
            fullName: r.fullName || "",
            jobTitle: r.jobTitle || "",
            email: r.email || "",
            phone: r.phone || "",
            address: r.address || "",
            summary: r.summary || "",
            skills: r.skills || "",
            languages: r.languages || "",
            experiences:
              r.experiences?.length > 0
                ? r.experiences.map((e: ExperienceItem) => ({
                    company: e.company,
                    role: e.role,
                    duration: e.duration,
                    description: e.description,
                  }))
                : [{ ...emptyExperience }],
            educations:
              r.educations?.length > 0
                ? r.educations.map((e: EducationItem) => ({
                    degree: e.degree,
                    institution: e.institution,
                    year: e.year,
                  }))
                : [{ ...emptyEducation }],
          });
          setGenerated(true);
        }
      })
      .catch(() => {});
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleExperienceChange(
    index: number,
    field: keyof ExperienceItem,
    value: string
  ) {
    const updated = [...data.experiences];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, experiences: updated });
  }

  function handleEducationChange(
    index: number,
    field: keyof EducationItem,
    value: string
  ) {
    const updated = [...data.educations];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, educations: updated });
  }

  function addExperience() {
    setData({
      ...data,
      experiences: [...data.experiences, { ...emptyExperience }],
    });
  }

  function removeExperience(index: number) {
    if (data.experiences.length <= 1) return;
    setData({
      ...data,
      experiences: data.experiences.filter((_, i) => i !== index),
    });
  }

  function addEducation() {
    setData({
      ...data,
      educations: [...data.educations, { ...emptyEducation }],
    });
  }

  function removeEducation(index: number) {
    if (data.educations.length <= 1) return;
    setData({
      ...data,
      educations: data.educations.filter((_, i) => i !== index),
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGenerated(true);
    handleSave();
  }

  async function handleDownloadPDF() {
    if (!previewRef.current) return;
    const html2canvas = (await import("html2canvas-pro")).default;
    const jsPDF = (await import("jspdf")).default;

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${data.fullName || "resume"}.pdf`);
  }

  return (
    <AuthGuard>
      {/* Hero */}
      <section className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Resume Builder</h1>
          <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto">
            Create a professional resume in minutes and download it as PDF
          </p>
        </div>
      </section>

      {/* Builder */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Side */}
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 h-fit">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Fill Your Details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Personal Info */}
                <fieldset className="space-y-4">
                  <legend className="text-lg font-semibold text-indigo-600 mb-2">
                    Personal Information
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Full Name" name="fullName" value={data.fullName} onChange={handleChange} required />
                    <Input label="Job Title" name="jobTitle" value={data.jobTitle} onChange={handleChange} required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Email" name="email" type="email" value={data.email} onChange={handleChange} required />
                    <Input label="Phone" name="phone" type="tel" value={data.phone} onChange={handleChange} />
                  </div>
                  <Input label="Address" name="address" value={data.address} onChange={handleChange} placeholder="City, Country" />
                </fieldset>

                {/* Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                  <textarea
                    name="summary"
                    rows={3}
                    value={data.summary}
                    onChange={handleChange}
                    placeholder="Brief summary of your career goals and experience..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none text-sm"
                  />
                </div>

                {/* Experience */}
                <fieldset className="space-y-3">
                  <div className="flex items-center justify-between">
                    <legend className="text-lg font-semibold text-indigo-600">Experience</legend>
                    <button type="button" onClick={addExperience} className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                      <FaPlus className="text-xs" /> Add
                    </button>
                  </div>
                  {data.experiences.map((exp, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3 relative">
                      {data.experiences.length > 1 && (
                        <button type="button" onClick={() => removeExperience(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-600">
                          <FaTrash className="text-sm" />
                        </button>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(i, "company", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                        <input placeholder="Role" value={exp.role} onChange={(e) => handleExperienceChange(i, "role", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                      </div>
                      <input placeholder="Duration (e.g. 2020 - Present)" value={exp.duration} onChange={(e) => handleExperienceChange(i, "duration", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                      <textarea placeholder="Job description..." rows={2} value={exp.description} onChange={(e) => handleExperienceChange(i, "description", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none" />
                    </div>
                  ))}
                </fieldset>

                {/* Education */}
                <fieldset className="space-y-3">
                  <div className="flex items-center justify-between">
                    <legend className="text-lg font-semibold text-indigo-600">Education</legend>
                    <button type="button" onClick={addEducation} className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                      <FaPlus className="text-xs" /> Add
                    </button>
                  </div>
                  {data.educations.map((edu, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3 relative">
                      {data.educations.length > 1 && (
                        <button type="button" onClick={() => removeEducation(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-600">
                          <FaTrash className="text-sm" />
                        </button>
                      )}
                      <input placeholder="Degree (e.g. BS Computer Science)" value={edu.degree} onChange={(e) => handleEducationChange(i, "degree", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input placeholder="Institution" value={edu.institution} onChange={(e) => handleEducationChange(i, "institution", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                        <input placeholder="Year (e.g. 2016 - 2020)" value={edu.year} onChange={(e) => handleEducationChange(i, "year", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                      </div>
                    </div>
                  ))}
                </fieldset>

                {/* Skills & Languages */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Skills" name="skills" value={data.skills} onChange={handleChange} placeholder="JavaScript, Python, React..." />
                  <Input label="Languages" name="languages" value={data.languages} onChange={handleChange} placeholder="English, Urdu..." />
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                    <FaEye /> Generate Resume
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="px-5 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                    {saved ? "Saved!" : "Save"}
                  </button>
                </div>
              </form>
            </div>

            {/* Preview Side */}
            <div className="h-fit sticky top-20">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                  <h2 className="text-lg font-bold text-gray-900">Resume Preview</h2>
                  {generated && (
                    <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                      <FaDownload /> Download PDF
                    </button>
                  )}
                </div>

                {!generated ? (
                  <div className="flex flex-col items-center justify-center py-20 px-6 text-gray-400">
                    <FaEye className="text-5xl mb-4" />
                    <p className="text-center">Fill in the form and click &quot;Generate Resume&quot; to see your preview here.</p>
                  </div>
                ) : (
                  <div ref={previewRef} className="p-6 sm:p-8 bg-white">
                    <div className="border-b-2 border-indigo-600 pb-4 mb-5">
                      <h3 className="text-2xl font-bold text-gray-900">{data.fullName || "Your Name"}</h3>
                      <p className="text-indigo-600 font-medium text-lg">{data.jobTitle || "Job Title"}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                        {data.email && <span>{data.email}</span>}
                        {data.phone && <span>{data.phone}</span>}
                        {data.address && <span>{data.address}</span>}
                      </div>
                    </div>

                    {data.summary && (
                      <div className="mb-5">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Professional Summary</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
                      </div>
                    )}

                    {data.experiences.some((e) => e.company || e.role) && (
                      <div className="mb-5">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Experience</h4>
                        <div className="space-y-3">
                          {data.experiences.filter((e) => e.company || e.role).map((exp, i) => (
                            <div key={i} className="border-l-2 border-indigo-200 pl-4">
                              <p className="font-semibold text-sm text-gray-900">{exp.role}{exp.company && ` at ${exp.company}`}</p>
                              {exp.duration && <p className="text-xs text-gray-500">{exp.duration}</p>}
                              {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {data.educations.some((e) => e.degree || e.institution) && (
                      <div className="mb-5">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Education</h4>
                        <div className="space-y-2">
                          {data.educations.filter((e) => e.degree || e.institution).map((edu, i) => (
                            <div key={i} className="border-l-2 border-indigo-200 pl-4">
                              <p className="font-semibold text-sm text-gray-900">{edu.degree}</p>
                              <p className="text-xs text-gray-500">{edu.institution}{edu.year && ` | ${edu.year}`}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {data.skills && (
                      <div className="mb-5">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.skills.split(",").map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium">{skill.trim()}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {data.languages && (
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.languages.split(",").map((lang, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">{lang.trim()}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AuthGuard>
  );
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
      />
    </div>
  );
}
