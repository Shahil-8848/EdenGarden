"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import demo from "../SchoolPics/demo.jpg";
// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Types
interface Teacher {
  id: string;
  name: string;
  title: string;
  department: string;
  image: string;
  email: string;
  phone: string;
  education: string[];
  experience: string;
  specializations: string[];
  achievements: string[];
  bio: string;
  officeHours: string;
  subjects: string[];
}

// Sample teacher data
const teachersData: Teacher[] = [
  {
    id: "1",
    name: "Khemraj Sharma Acharya",
    title: "Head of Mathematics Department",
    department: "English",
    image:
      "https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-1/481240399_592520140281400_3142594933312340788_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=rYIUrkKP9tQQ7kNvwFpu7jh&_nc_oc=AdmSiS48YjJFwuUg5ltzDyK7z_z4rRJYvrA_rvi89RIi3y7UwNTi6LCGb-AGwTeiKUg&_nc_zt=24&_nc_ht=scontent.fktm1-1.fna&_nc_gid=1zd1EubV831R6FNm10Vh0w&oh=00_AfKWgHKX34bOffu03XPLPSVt7slFYXxPxFXbVa4EsQ8ekQ&oe=6842BF9C",
    email: "e.rodriguez@school.edu",
    phone: "+1 (555) 123-4567",
    education: [
      "Ph.D. in Mathematics - MIT",
      "M.S. in Applied Mathematics - Stanford",
    ],
    experience: "15 years",
    specializations: ["Calculus", "Statistics", "Advanced Algebra"],
    achievements: [
      "Teacher of the Year 2023",
      "Published 12 research papers",
      "National Math Excellence Award",
    ],
    bio: "Dr. Rodriguez brings passion and innovation to mathematics education, making complex concepts accessible to all students through interactive learning methods and real-world applications.",
    officeHours: "Mon-Fri: 2:00 PM - 4:00 PM",
    subjects: ["Calculus", "Statistics", "Algebra II"],
  },
  {
    id: "2",
    name: "Madan Dhungana",
    title: "Senior Science Teacher",
    department: "Science",
    image: demo,
    email: "m.chen@school.edu",
    phone: "+1 (555) 234-5678",
    education: [
      "M.S. in Chemistry - Harvard",
      "B.S. in Chemical Engineering - UC Berkeley",
    ],
    experience: "12 years",
    specializations: [
      "Organic Chemistry",
      "Environmental Science",
      "Laboratory Research",
    ],
    achievements: [
      "Science Fair Coordinator",
      "Green Chemistry Award",
      "Student Mentor Excellence",
    ],
    bio: "Professor Chen inspires students through hands-on experiments and real-world applications of scientific principles, fostering curiosity and critical thinking in the laboratory.",
    officeHours: "Tue-Thu: 1:30 PM - 3:30 PM",
    subjects: ["Chemistry", "Environmental Science", "AP Chemistry"],
  },
  {
    id: "3",
    name: "Gitaram Acharya",
    title: "English Literature Specialist",
    department: "English",
    image: demo,
    email: "s.johnson@school.edu",
    phone: "+1 (555) 345-6789",
    education: [
      "M.A. in English Literature - Yale",
      "B.A. in Creative Writing - Columbia",
    ],
    experience: "10 years",
    specializations: [
      "Creative Writing",
      "British Literature",
      "Poetry Analysis",
    ],
    achievements: [
      "Published Author",
      "Literary Magazine Advisor",
      "Writing Competition Judge",
    ],
    bio: "Ms. Johnson nurtures young writers and helps students discover the power of storytelling and literary analysis through engaging discussions and creative workshops.",
    officeHours: "Mon, Wed, Fri: 3:00 PM - 5:00 PM",
    subjects: ["English Literature", "Creative Writing", "AP English"],
  },
  {
    id: "4",
    name: "Mr. David Kim",
    title: "Technology Integration Coordinator",
    department: "Technology",
    image: demo,
    email: "d.kim@school.edu",
    phone: "+1 (555) 456-7890",
    education: [
      "M.S. in Computer Science - Carnegie Mellon",
      "B.S. in Software Engineering - MIT",
    ],
    experience: "8 years",
    specializations: ["Programming", "Robotics", "AI & Machine Learning"],
    achievements: [
      "Coding Club Founder",
      "Tech Innovation Award",
      "Student App Development Mentor",
    ],
    bio: "Mr. Kim prepares students for the digital future through cutting-edge technology education and programming, emphasizing problem-solving and computational thinking.",
    officeHours: "Daily: 12:00 PM - 1:00 PM",
    subjects: ["Computer Science", "Robotics", "Web Development"],
  },
  {
    id: "5",
    name: "Dr. Maria Gonzalez",
    title: "History Department Chair",
    department: "History",
    image: demo,
    email: "m.gonzalez@school.edu",
    phone: "+1 (555) 567-8901",
    education: [
      "Ph.D. in World History - Oxford",
      "M.A. in International Relations - Georgetown",
    ],
    experience: "18 years",
    specializations: [
      "World History",
      "Cultural Studies",
      "Historical Research",
    ],
    achievements: [
      "Historical Society Member",
      "Curriculum Development Leader",
      "International Exchange Coordinator",
    ],
    bio: "Dr. Gonzalez brings global perspectives to history education, connecting past events to contemporary issues and fostering critical thinking about world cultures.",
    officeHours: "Mon-Wed: 2:30 PM - 4:30 PM",
    subjects: ["World History", "AP History", "Cultural Studies"],
  },
  {
    id: "6",
    name: "Ms. Lisa Thompson",
    title: "Arts & Creative Director",
    department: "Arts",
    image: demo,
    email: "l.thompson@school.edu",
    phone: "+1 (555) 678-9012",
    education: [
      "M.F.A. in Fine Arts - RISD",
      "B.A. in Art Education - Parsons",
    ],
    experience: "14 years",
    specializations: ["Digital Art", "Sculpture", "Art History"],
    achievements: [
      "Gallery Exhibition Curator",
      "Art Competition Winner",
      "Student Portfolio Mentor",
    ],
    bio: "Ms. Thompson cultivates artistic expression and creativity, helping students discover their unique artistic voice through various mediums and techniques.",
    officeHours: "Tue, Thu: 1:00 PM - 3:00 PM",
    subjects: ["Visual Arts", "Digital Design", "Art History"],
  },
];

// Department filter options
const departments = [
  "All",
  "Mathematics",
  "Science",
  "English",
  "Technology",
  "History",
  "Arts",
];

// Simplified Teacher Card Component with Flip Effect
const SimplifiedTeacherCard: React.FC<{ teacher: Teacher; index: number }> = ({
  teacher,
  index,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "bottom 15%",
        },
      }
    );
  }, [index]);

  // 3D hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // const departmentColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  //   Mathematics: {
  //     bg: "bg-blue-100",
  //     text: "text-blue-800",
  //     border: "border-blue-200",
  //     gradient: "from-blue-500 to-blue-600",
  //   },
  //   Science: {
  //     bg: "bg-green-100",
  //     text: "text-green-800",
  //     border: "border-green-200",
  //     gradient: "from-green-500 to-green-600",
  //   },
  //   English: {
  //     bg: "bg-purple-100",
  //     text: "text-purple-800",
  //     border: "border-purple-200",
  //     gradient: "from-purple-500 to-purple-600",
  //   },
  //   Technology: {
  //     bg: "bg-indigo-100",
  //     text: "text-indigo-800",
  //     border: "border-indigo-200",
  //     gradient: "from-indigo-500 to-indigo-600",
  //   },
  //   History: {
  //     bg: "bg-amber-100",
  //     text: "text-amber-800",
  //     border: "border-amber-200",
  //     gradient: "from-amber-500 to-amber-600",
  //   },
  //   Arts: {
  //     bg: "bg-pink-100",
  //     text: "text-pink-800",
  //     border: "border-pink-200",
  //     gradient: "from-pink-500 to-pink-600",
  //   },
  // }

  return (
    <div
      ref={cardRef}
      className="relative w-full h-96 perspective-1000 group"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.3s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="relative h-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
            {/* Shine effect */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none z-10"
              style={{
                background: `radial-gradient(circle at ${
                  (rotation.y + 10) * 4
                }% ${
                  (rotation.x + 10) * 4
                }%, rgba(255,255,255,0.8), transparent 50%)`,
              }}
            ></div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              <div
                className="absolute w-1.5 h-1.5 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  top: "25%",
                  left: "20%",
                  animation: isHovered
                    ? "float 3s ease-in-out infinite"
                    : "none",
                  animationDelay: "0s",
                }}
              ></div>
              <div
                className="absolute w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  top: "65%",
                  right: "25%",
                  animation: isHovered
                    ? "float 3s ease-in-out infinite"
                    : "none",
                  animationDelay: "1s",
                }}
              ></div>
              <div
                className="absolute w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  bottom: "35%",
                  left: "30%",
                  animation: isHovered
                    ? "float 3s ease-in-out infinite"
                    : "none",
                  animationDelay: "2s",
                }}
              ></div>
            </div>

            {/* Profile Image - Takes most of the height */}
            <div className="relative h-72 overflow-hidden rounded-t-xl">
              <img
                src={teacher.image || "/placeholder.svg"}
                alt={teacher.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                style={{
                  filter: isHovered
                    ? "saturate(1.2) contrast(1.1)"
                    : "saturate(1) contrast(1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              {/* Hover icon overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content - Simplified */}
            <div className="p-4 flex flex-col justify-between h-24">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-green-700 transition-colors duration-300 line-clamp-1">
                  {teacher.name}
                </h3>
                <p className="text-green-600 font-medium text-sm line-clamp-1">
                  {teacher.title}
                </p>
              </div>
            </div>

            {/* Flip indicator - Bottom right with lightning icon */}
            <div className="absolute bottom-4 right-4 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="relative h-full bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg border border-green-100 p-6 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-green-800">
                {teacher.name}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm">
                <svg
                  className="w-4 h-4 mr-2 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-700">{teacher.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <svg
                  className="w-4 h-4 mr-2 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-700">{teacher.phone}</span>
              </div>
            </div>

            {/* Education */}
            <div className="mb-4">
              <h4 className="font-semibold text-green-800 mb-2 text-sm">
                Education
              </h4>
              <div className="space-y-1">
                {teacher.education.map((edu, idx) => (
                  <p key={idx} className="text-xs text-gray-600">
                    {edu}
                  </p>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div className="mb-4">
              <h4 className="font-semibold text-green-800 mb-2 text-sm">
                Specializations
              </h4>
              <div className="flex flex-wrap gap-1">
                {teacher.specializations.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full border border-green-200"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="mb-4">
              <h4 className="font-semibold text-green-800 mb-2 text-sm">
                Office Hours
              </h4>
              <p className="text-xs text-gray-600">{teacher.officeHours}</p>
            </div>

            {/* Achievements */}
            <div>
              <h4 className="font-semibold text-green-800 mb-2 text-sm">
                Recent Achievements
              </h4>
              <div className="space-y-1">
                {teacher.achievements.slice(0, 2).map((achievement, idx) => (
                  <div
                    key={idx}
                    className="flex items-start text-xs text-gray-600"
                  >
                    <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    {achievement}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
};

// Main Teachers Directory Component
const TeachersDirectorySimplified: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter teachers based on department and search term
  const filteredTeachers = teachersData.filter((teacher) => {
    const matchesDepartment =
      selectedDepartment === "All" || teacher.department === selectedDepartment;
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.some((subject) =>
        subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    console.log(setSelectedDepartment);
    console.log(setSearchTerm);
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="relative py-20 px-4 bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-gradient-to-r from-green-200/20 to-emerald-200/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gradient-to-r from-emerald-200/20 to-teal-200/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-green-100/10 to-emerald-100/10 blur-3xl"></div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-800 via-emerald-700 to-teal-700 bg-clip-text text-transparent mb-4 leading-tight">
            Meet Our Teachers
          </h2>
        </div>

        {/* Search and Filter */}

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeachers.map((teacher, index) => (
            <SimplifiedTeacherCard
              key={teacher.id}
              teacher={teacher}
              index={index}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredTeachers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No teachers found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or department filter.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {teachersData.length}
            </div>
            <div className="text-gray-600">Dedicated Teachers</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {departments.length - 1}
            </div>
            <div className="text-gray-600">Academic Departments</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Math.round(
                teachersData.reduce(
                  (acc, teacher) => acc + Number.parseInt(teacher.experience),
                  0
                ) / teachersData.length
              )}
            </div>
            <div className="text-gray-600">Average Experience (Years)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersDirectorySimplified;
