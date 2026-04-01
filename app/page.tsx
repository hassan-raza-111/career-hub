import Link from "next/link";
import {
  FaUserGraduate,
  FaMagic,
  FaComments,
  FaMobileAlt,
  FaEnvelope,
  FaPhone,
  FaFileAlt,
  FaChalkboardTeacher,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              #1 Career Platform for Students
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Build Your
              <span className="block text-indigo-200">Dream Career</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-indigo-100 max-w-xl">
              Professional career counseling and resume builder to help you land
              your dream job. Start your journey today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/resume"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
              >
                <FaFileAlt /> Build Resume Now
              </Link>
              <Link
                href="/career-counseling"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <FaChalkboardTeacher /> Get Counseling
              </Link>
            </div>
          </div>
          <div className="shrink-0 hidden md:block">
            <FaUserGraduate className="text-[200px] text-white/15" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="5,000+" label="Resumes Created" />
            <StatCard number="1,200+" label="Sessions Booked" />
            <StatCard number="98%" label="Satisfaction Rate" />
            <StatCard number="500+" label="Career Switches" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
            How It Works
          </h2>
          <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
            Get started in just 3 simple steps
          </p>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              step={1}
              title="Fill Your Details"
              description="Enter your personal information, experience, education, and skills into our easy-to-use form."
            />
            <StepCard
              step={2}
              title="Preview Resume"
              description="See a live preview of your professional resume as you type. Make adjustments in real time."
            />
            <StepCard
              step={3}
              title="Download PDF"
              description="Download your polished resume as a PDF file, ready to send to employers."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
            Why Choose CareerHub?
          </h2>
          <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
            Everything you need to kickstart your career
          </p>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaMagic className="text-3xl text-indigo-600" />}
              title="Easy Resume Builder"
              description="Create professional resumes in minutes with our step-by-step form and live preview."
            />
            <FeatureCard
              icon={<FaComments className="text-3xl text-indigo-600" />}
              title="Expert Counseling"
              description="Book 1-on-1 sessions with career experts who guide you toward the right path."
            />
            <FeatureCard
              icon={<FaMobileAlt className="text-3xl text-indigo-600" />}
              title="Mobile Friendly"
              description="Access the platform from any device — phone, tablet, or desktop."
            />
            <FeatureCard
              icon={<FaFileAlt className="text-3xl text-indigo-600" />}
              title="PDF Download"
              description="Download your resume as a clean, professional PDF ready for applications."
            />
            <FeatureCard
              icon={<FaCheckCircle className="text-3xl text-indigo-600" />}
              title="Free to Use"
              description="No hidden charges. Build your resume and book counseling sessions for free."
            />
            <FeatureCard
              icon={<FaStar className="text-3xl text-indigo-600" />}
              title="Professional Templates"
              description="Clean, modern resume layout trusted by recruiters and hiring managers."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
            What Our Users Say
          </h2>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Ahmed Khan"
              role="Software Engineer"
              quote="CareerHub helped me create an amazing resume that got me noticed by top tech companies. Highly recommended!"
            />
            <TestimonialCard
              name="Sara Ali"
              role="Marketing Manager"
              quote="The career counseling session was incredibly helpful. I finally have clarity about my career direction."
            />
            <TestimonialCard
              name="Usman Tariq"
              role="Fresh Graduate"
              quote="As a fresh graduate, I had no idea how to build a resume. CareerHub made it so simple and professional."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Build Your Career?
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Join thousands of professionals who have already built their dream
            resumes with CareerHub.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resume"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Get Started <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
            Get In Touch
          </h2>
          <p className="mt-3 text-center text-gray-600">
            Have a question? We&apos;d love to hear from you.
          </p>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
              <ContactForm />
            </div>
            {/* Contact Info */}
            <div className="flex flex-col justify-center gap-6">
              <div className="flex items-center gap-4 bg-gray-50 px-6 py-5 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Us</p>
                  <p className="text-sm text-gray-600">info@careerhub.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 px-6 py-5 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                  <FaPhone className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Call Us</p>
                  <p className="text-sm text-gray-600">+92 300 1234567</p>
                </div>
              </div>
              <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                <p className="text-sm text-indigo-800 font-medium">Office Hours</p>
                <p className="text-sm text-indigo-600 mt-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-sm text-indigo-600">Saturday: 10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl sm:text-4xl font-bold text-indigo-600">
        {number}
      </p>
      <p className="mt-1 text-sm text-gray-600">{label}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto">
        {step}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-7 hover:shadow-md transition-shadow border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function TestimonialCard({
  name,
  role,
  quote,
}: {
  name: string;
  role: string;
  quote: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
      <div className="flex gap-1 text-yellow-400 mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-sm" />
        ))}
      </div>
      <p className="text-gray-600 text-sm italic">&quot;{quote}&quot;</p>
      <div className="mt-5 border-t pt-4">
        <p className="font-semibold text-gray-900 text-sm">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
}
