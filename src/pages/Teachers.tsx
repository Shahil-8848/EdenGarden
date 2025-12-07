import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../assets/edenLogo.png";
import Pic1 from "../SchoolPics/Teachers/GitaMiss.jpg";
import Pic2 from "../SchoolPics/Teachers/RajeshSir.jpg";
import Pic3 from "../SchoolPics/Teachers/BarshaMiss.jpg";
import Pic4 from "../SchoolPics/Teachers/KhemSir.jpg";
import Pic5 from "../SchoolPics/Teachers/GitaRamSir.jpg";
import Pic6 from "../SchoolPics/Teachers/Madan.png";

import Pic8 from "../SchoolPics/Teachers/RupeshSir.jpg";
import Pic9 from "../SchoolPics/Teachers/kamalSir.jpg";
import Pic10 from "../SchoolPics/Teachers/Prakash.png";
import Pic11 from "../SchoolPics/Teachers/shahilSir.png";
import Pic12 from "../SchoolPics/Teachers/Dipjwal.jpg";
import Pic13 from "../SchoolPics/Teachers/MonikaMiss.jpg";
import Pic14 from "../SchoolPics/Teachers/RemaMiss.jpg";
import Pic15 from "../SchoolPics/Teachers/TulashaMiss.jpg";
import Pic16 from "../SchoolPics/Teachers/MenukaMiss.jpg";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- TYPES & DATA ---

interface Teacher {
  id: string;
  name: string;
  title: string;
  subject: string;
  image: string;
  level: "higher" | "secondary" | "primary";
}

const teachersData: Teacher[] = [
  {
    id: "1",
    name: "Khemraj Sharma Acharya",
    title: "Vice Principal",
    subject: "English",
    image: Pic4,
    level: "higher",
  },
  {
    id: "6",
    name: "Gitaram Acharya",
    title: "Coordinator",
    subject: "Social Studies",
    image: Pic5,
    level: "higher",
  },
  // Using a more consistent placeholder for other teachers
  {
    id: "2",
    name: "Madan Dhungana",
    title: "H.O.D Science",
    subject: "Physics",
    image: Pic6,
    level: "higher",
  },
  {
    id: "3",
    name: "Shahil Budathoki",
    title: "Teacher",
    subject: "Computer Science",
    image: Pic11,
    level: "higher",
  },
  {
    id: "5",
    name: "Barsha Magar",
    title: "H.O.D Mathematics",
    subject: "Accounts",
    image: Pic3,
    level: "higher",
  },
  {
    id: "4",
    name: "Dipjwal Banskota",
    title: "Teacher",
    subject: "Mathematics",
    image: Pic12,
    level: "higher",
  },

  {
    id: "7",
    name: "Rajesh Gajurel",
    title: "Teacher",
    subject: "Social Studies",
    image: Pic2,
    level: "secondary",
  },
  {
    id: "8",
    name: "Prakash Pandey",
    title: "Accountant",
    subject: "Economics",
    image: Pic10,
    level: "higher",
  },
  {
    id: "9",
    name: "Monika Giri",
    title: "Teacher",
    subject: "Maths",
    image: Pic13,
    level: "primary",
  },
  {
    id: "10",
    name: "Geeta Bastola",
    title: "Teacher",
    subject: "Nepali",
    image: Pic1,
    level: "secondary",
  },
  {
    id: "11",
    name: "Nischal Mainali",
    title: "Teacher",
    subject: "Nepali",
    image: "/api/placeholder/400/400",
    level: "primary",
  },
  {
    id: "12",
    name: "Rupesh Karki",
    title: "Teacher",
    subject: "Nepali",
    image: Pic8,
    level: "secondary",
  },
  {
    id: "13",
    name: "Kamal Adhikari",
    title: "Teacher",
    subject: "Nepali",
    image: Pic9,
    level: "secondary",
  },
  {
    id: "14",
    name: "Sushma Mohara",
    title: "Teacher",
    subject: "Science",
    image: "/api/placeholder/400/400",
    level: "primary",
  },
  {
    id: "15",
    name: "Tulasha Niroula",
    title: "Teacher",
    subject: "English",
    image: Pic15,
    level: "primary",
  },
  {
    id: "16",
    name: "Sanjay Rajbanshi",
    title: "Teacher",
    subject: "Computer & Health",
    image: "/api/placeholder/400/400",
    level: "secondary",
  },
  {
    id: "17",
    name: "Shikha Dahal",
    title: "Teacher",
    subject: "E.C.A",
    image: "/api/placeholder/400/400",
    level: "primary",
  },
  {
    id: "17",
    name: "Reema Shah",
    title: "Teacher",
    subject: "English",
    image: Pic14,
    level: "secondary",
  },
  {
    id: "17",
    name: "Kritika Kattel",
    title: "Teacher",
    subject: "English",
    image: "/api/placeholder/400/400",
    level: "secondary",
  },
  {
    id: "18",
    name: "Menuka Siwakoti ",
    title: "Teacher",
    subject: "Nepali",
    image: Pic16,
    level: "secondary",
  },
];

const levelConfig = {
  higher: { title: "Higher Secondary", order: 1 },
  secondary: { title: "Secondary Level", order: 2 },
  primary: { title: "Primary Level", order: 3 },
};

// --- SVG & UI COMPONENTS ---

// // Reusable Logo Component
// const LogoIcon: React.FC = () => (
//   <svg
//     className="w-10 h-10 text-white"
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M12 2L2 5v6.5c0 5.08 3.53 9.68 8.33 11.25.42.13.87.13 1.29 0C16.47 21.18 20 16.58 20 11.5V5L12 2zm0 17.5c-3.13-1.25-5.5-4.88-5.5-8.5V6.3l5.5-2.29 5.5 2.29v5.2c0 3.62-2.37 7.25-5.5 8.5z" />
//     <path d="M12 7.15l-3.5 3.5 1.41 1.41L12 9.97l2.09 2.09 1.41-1.41L12 7.15z" />
//   </svg>
// );

// SVG Component for the decorative waves
const Wave: React.FC<{ className: string; color: string }> = ({
  className,
  color,
}) => (
  <div className={`absolute -bottom-1 left-0 w-full h-10 ${className}`}>
    <svg
      className="w-full h-full"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
    >
      <path d="M0,50 C480,150 960,0 1440,50 L1440,100 L0,100 Z" fill={color} />
    </svg>
  </div>
);

// The NEW Teacher Card Component
const TeacherCard: React.FC<{ teacher: Teacher; index: number }> = ({
  teacher,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    // Animation for card entrance
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2"
    >
      {/* Dark Blue Header Section */}
      <div
        className="relative pt-8 pb-16"
        style={{ backgroundColor: "#4ccf14" }}
      >
        <div className="flex flex-col items-center space-y-2">
          {/* <img
            className="w-10 h-10  object--contain  rounded-full "
            src={logo}
            alt="logo"
          />
          <p className="font-semibold text-white/90 text-lg">EGEFS</p> */}
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <img
              className="w-10 h-10 object-contain" // object-contain is better for non-square logos
              src={logo}
              alt="EGEFS Logo"
            />
            <p
              className="font-serif text-xl font-bold text-white tracking-wider"
              style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.3)" }} // Royal text effect
            >
              EGEFS
            </p>
          </div>
        </div>

        {/* The double-layered wave effect */}
        <Wave color="#319f02" className="opacity-120" />
        <Wave color="#319f02" className="opacity-100" />
      </div>

      {/* Profile Image - Positioned to overlap */}
      <div className="absolute top-[120px] left-1/2 -translate-x-1/2">
        <img
          src={teacher.image}
          alt={teacher.name}
          className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-xl transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback to a generic avatar SVG
            const target = e.target as HTMLImageElement;
            target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Crect width='128' height='128' fill='%23e2e8f0'/%3E%3Ccircle cx='64' cy='52' r='28' fill='%2394a3b8'/%3E%3Cpath d='M64 88c30 0 46 20 46 36H18c0-16 16-36 46-36z' fill='%2394a3b8'/%3E%3C/svg%3E`;
          }}
        />
      </div>
      {/* group-hover:text-green-600  */}
      {/* Content Section */}
      <div className="px-6 pt-20 pb-6 text-center">
        <h3 className="text-xl font-bold text-gray-800transition-colors duration-300">
          {teacher.name}
        </h3>
        <p className="text-green-700 font-semibold text-sm mb-1">
          {teacher.title}
        </p>
        <p className="text-black-500 text-2px">{teacher.subject}</p>
      </div>
    </div>
  );
};

// Section Header with Updated Blue Theme
const SectionHeader: React.FC<{ title: string; count: number }> = ({
  title,
}) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-gray-800">{title}</h2>
        {/* <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium">
          {count} Teachers
        </span> */}
      </div>
      <div className="mt-3 h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const TeacherCatalog: React.FC = () => {
  // Group teachers by level for organized display
  const groupedTeachers = teachersData.reduce((acc, teacher) => {
    (acc[teacher.level] = acc[teacher.level] || []).push(teacher);
    return acc;
  }, {} as Record<string, Teacher[]>);

  // Sort levels based on the defined order
  const sortedLevels = Object.keys(groupedTeachers).sort(
    (a, b) =>
      levelConfig[a as keyof typeof levelConfig].order -
      levelConfig[b as keyof typeof levelConfig].order
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-green-200 bg-clip-text text-transparent mb-6">
              Our Faculty
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet our passionate educators shaping the future of learning with
              dedication, expertise, and care.
            </p>
          </div>

          {/* Faculty Grid by Level */}
          {sortedLevels.map((level) => {
            const teachers = groupedTeachers[level];
            const config = levelConfig[level as keyof typeof levelConfig];

            return (
              <div key={level} className="mb-20">
                <SectionHeader title={config.title} count={teachers.length} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-24">
                  {teachers.map((teacher, index) => (
                    <TeacherCard
                      key={`${teacher.id}-${index}`} // More unique key
                      teacher={teacher}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Stats Section with Updated Blue Theme */}
          {/* <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md text-center border-t-4 border-green-500">
              <div className="text-4xl font-bold text-green-600">
                {teachersData.length}
              </div>
              <div className="text-gray-700 font-medium mt-2">
                Dedicated Teachers
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md text-center border-t-4 border-indigo-500">
              <div className="text-4xl font-bold text-indigo-600">
                {Object.keys(levelConfig).length}
              </div>
              <div className="text-gray-700 font-medium mt-2">
                Academic Levels
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md text-center border-t-4 border-blue-500">
              <div className="text-4xl font-bold text-blue-600">
                {new Set(teachersData.map((t) => t.subject)).size}
              </div>
              <div className="text-gray-700 font-medium mt-2">
                Subjects Covered
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TeacherCatalog;
