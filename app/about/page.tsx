import {
  FaBullseye,
  FaEye,
  FaUsers,
  FaAward,
  FaHandshake,
  FaRocket,
} from "react-icons/fa";

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold">About CareerHub</h1>
          <p className="mt-4 text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto">
            Empowering individuals to build successful careers through guidance
            and tools
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
            Our Story
          </h2>
          <div className="mt-8 text-gray-600 space-y-4 text-center max-w-3xl mx-auto">
            <p>
              CareerHub was founded with a simple mission: to make career
              guidance accessible to everyone. We believe that every individual
              deserves the right tools and guidance to build a successful career,
              regardless of their background.
            </p>
            <p>
              Our platform combines a powerful resume builder with expert career
              counseling to provide a complete career development solution. Whether
              you&apos;re a fresh graduate taking your first steps into the
              professional world or an experienced professional looking for a career
              change, CareerHub is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-5">
                <FaBullseye className="text-2xl text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
              <p className="mt-3 text-gray-600">
                To empower job seekers and professionals with the tools,
                guidance, and confidence they need to achieve their career goals.
                We strive to make professional career development accessible to
                everyone.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-5">
                <FaEye className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
              <p className="mt-3 text-gray-600">
                To become the leading career development platform that bridges
                the gap between talent and opportunity. We envision a world
                where everyone has access to quality career guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
            Our Values
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ValueCard
              icon={<FaUsers className="text-2xl text-indigo-600" />}
              title="User First"
              description="Everything we build is designed with our users in mind. Your success is our success."
            />
            <ValueCard
              icon={<FaAward className="text-2xl text-indigo-600" />}
              title="Quality"
              description="We maintain the highest standards in our tools and counseling services."
            />
            <ValueCard
              icon={<FaHandshake className="text-2xl text-indigo-600" />}
              title="Trust"
              description="We build lasting relationships based on transparency and reliability."
            />
            <ValueCard
              icon={<FaRocket className="text-2xl text-indigo-600" />}
              title="Innovation"
              description="We continuously improve our platform with the latest technology."
            />
            <ValueCard
              icon={<FaBullseye className="text-2xl text-indigo-600" />}
              title="Accessibility"
              description="Career guidance should be available to everyone, everywhere."
            />
            <ValueCard
              icon={<FaEye className="text-2xl text-indigo-600" />}
              title="Transparency"
              description="No hidden fees, no surprises. What you see is what you get."
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Our Team
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            A passionate team dedicated to helping you succeed
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamCard
              name="Ahmed Qazi"
              role="Founder & Developer"
              initials="AQ"
            />
            <TeamCard
              name="Dr. Fatima Shah"
              role="Lead Career Counselor"
              initials="FS"
            />
            <TeamCard
              name="Ali Hassan"
              role="UI/UX Designer"
              initials="AH"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}

function TeamCard({
  name,
  role,
  initials,
}: {
  name: string;
  role: string;
  initials: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl font-bold text-white">{initials}</span>
      </div>
      <h3 className="font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  );
}
