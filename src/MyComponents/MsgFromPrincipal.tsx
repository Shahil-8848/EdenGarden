import type React from "react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Types
interface CoreValue {
  icon: string;
  title: string;
  description: string;
}

interface PrincipalData {
  name: string;
  title: string;
  image: string;
  message: string;
  signature: string;
  coreValues: CoreValue[];
  quote: string;
}

// Sample data
const principalData: PrincipalData = {
  name: "Mohan Acharya",
  title: "Principal & Educational Leader",
  image:
    "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg",
  message: `Welcome to our extraordinary educational community, where every student's potential is nurtured and celebrated. As we embark on another remarkable academic year, I am filled with immense pride and excitement for the journey ahead.

Our school stands as a beacon of excellence, innovation, and inclusivity. We believe that education extends far beyond textbooks and classrooms—it's about fostering critical thinking, creativity, and character development that will serve our students throughout their lives.

In today's rapidly evolving world, we are committed to preparing our students not just for the challenges of tomorrow, but to become the leaders and innovators who will shape our future. Through our comprehensive programs, dedicated faculty, and state-of-the-art facilities, we create an environment where curiosity thrives and dreams take flight.

I invite you to join us in this incredible journey of discovery, growth, and achievement. Together, we will continue to build a legacy of excellence that our entire community can be proud of.`,
  signature: "Mohan Acharya",
  quote: "Education is not preparation for life; education is life itself.",
  coreValues: [
    {
      icon: "🌟",
      title: "Excellence",
      description: "Striving for the highest standards in all endeavors",
    },
    {
      icon: "🤝",
      title: "Integrity",
      description: "Building character through honesty and ethical behavior",
    },
    {
      icon: "🌱",
      title: "Growth",
      description: "Fostering continuous learning and personal development",
    },
    {
      icon: "🌍",
      title: "Community",
      description: "Creating inclusive environments where everyone belongs",
    },
  ],
};

// Core Values Component
const CoreValueCard: React.FC<{ value: CoreValue; index: number }> = ({
  value,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "bottom 15%",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 border border-green-100 hover:border-green-200"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
          {value.icon}
        </div>
        <h4 className="font-semibold text-green-800 mb-1 group-hover:text-green-600 transition-colors duration-300">
          {value.title}
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {value.description}
        </p>
      </div>
    </div>
  );
};

// Quote Component
const InspirationalQuote: React.FC<{ quote: string }> = ({ quote }) => {
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quoteRef.current) return;

    gsap.fromTo(
      quoteRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 85%",
          end: "bottom 15%",
        },
      }
    );
  }, []);

  return (
    <div ref={quoteRef} className="relative">
      <div className="absolute -top-4 -left-4 text-6xl text-green-200 font-serif">
        "
      </div>
      <blockquote className="text-lg md:text-xl italic text-green-700 font-medium text-center relative z-10 px-8">
        {quote}
      </blockquote>
      <div className="absolute -bottom-4 -right-4 text-6xl text-green-200 font-serif rotate-180">
        "
      </div>
    </div>
  );
};

// Main Principal Message Component
const PrincipalMessage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    console.log(isVisible);

    const ctx = gsap.context(() => {
      // Main container animation
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => setIsVisible(true),
          },
        }
      );

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            x: -100,
            opacity: 0,
            scale: 0.8,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
              end: "bottom 15%",
            },
          }
        );
      }

      // Content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              end: "bottom 15%",
            },
          }
        );
      }

      // Signature animation
      if (signatureRef.current) {
        gsap.fromTo(
          signatureRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: signatureRef.current,
              start: "top 85%",
              end: "bottom 15%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative py-20 px-4 bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-gradient-to-r from-green-200/20 to-emerald-200/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-200/20 to-teal-200/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-green-100/10 to-emerald-100/10 blur-3xl"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-green-300 rounded-full animate-bounce"></div>
      <div
        className="absolute bottom-32 left-16 w-3 h-3 bg-emerald-400 rounded-full animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-40 left-1/4 w-2 h-2 bg-teal-300 rounded-full animate-bounce"
        style={{ animationDelay: "2s" }}
      ></div>

      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
              Leadership Message
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-800 via-emerald-700 to-teal-700 bg-clip-text text-transparent mb-4 leading-tight">
            A Message from Our Principal
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Principal Image Section */}
          <div ref={imageRef} className="relative">
            <div className="relative group">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

              {/* Main image container */}
              <div className="relative bg-white rounded-2xl p-6 shadow-2xl">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={principalData.image || "/placeholder.svg"}
                    alt={principalData.name}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>

                {/* Principal info overlay */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <h3 className="text-xl font-bold text-green-800 mb-1">
                    {principalData.name}
                  </h3>
                  <p className="text-green-600 font-medium">
                    {principalData.title}
                  </p>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="prose prose-lg max-w-none">
              {principalData.message.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed mb-6 text-justify"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Signature */}
            <div
              ref={signatureRef}
              className="mt-8 pt-6 border-t border-green-200"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-grow">
                  <div
                    className="text-2xl font-script text-green-700 mb-1"
                    style={{ fontFamily: "cursive" }}
                  >
                    {principalData.signature}
                  </div>
                  <div className="text-sm text-gray-500">Principal</div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="mb-16 py-12 px-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100">
          <InspirationalQuote quote={principalData.quote} />
        </div>

        {/* Core Values Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent mb-4">
            Our Core Values
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These fundamental principles guide everything we do and shape the
            character of our school community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principalData.coreValues.map((value, index) => (
            <CoreValueCard key={index} value={value} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PrincipalMessage;
