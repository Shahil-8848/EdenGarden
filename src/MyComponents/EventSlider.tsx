"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import event1 from "../SchoolPics/kidsGroup1.jpg";
import badge from "../SchoolPics/Events/Badge.jpeg";
import env from "../SchoolPics/Events/EnvDay.jpeg";
import poet from "../SchoolPics/Events/WinnerPoet.jpeg";
import houses from "../SchoolPics/Events/HouseSelection.jpeg";
import futsal from "../SchoolPics/Events/Futsal.jpeg";
// Types
interface EventItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  link?: string;
}

// Sample data
const schoolEvents: EventItem[] = [
  {
    id: "1",
    title: "Annual School Captain & House Captain Badges",
    description:
      "Selection of School, House and Class Captain along with badges for them  ",
    image: badge,
    date: "June 15, 2024",
    category: "Academic",
    link: "/events/science-exhibition",
  },
  {
    id: "2",
    title: "Envrionment Day",
    description:
      "Students contributed to the sustainable environment by planting tres and promoting greeny",
    image: env,
    date: "May 28, 2024",
    category: "Sports",
    link: "/events/sports-tournament",
  },
  {
    id: "3",
    title: "Art work by Kids",
    description:
      "Junior Kids drawing and handcrafts. Involving drawing, coloring and presenting there artwork.",
    image: event1,
    date: "April 12, 2024",
    category: "Cultural",
    link: "/events/heritage-day",
  },
  {
    id: "4",
    title: "Bhanu Jayanti Poetry Winner",
    description:
      "Program organized by the school to promote literature and poetry writing in the special occassion of Bhanu Jayanti",
    image: poet,
    date: "March 22, 2024",
    category: "Environment",
    link: "/events/eco-campaign",
  },
  {
    id: "5",
    title: "Houses Captain",
    description:
      "Selection of House Captain, along with their oath taking ceremony. ",
    image: houses,
    date: "February 18, 2024",
    category: "Academic",
    link: "/events/literary-festival",
  },
  {
    id: "6",
    title: "InterHouse Futsal Tournament",
    description:
      "Teams competed to represent their houses and enjoyed playing the game for the winning price.",
    image: futsal,
    date: "January 25, 2024",
    category: "Technology",
    link: "/events/stem-challenge",
  },
  // {
  //   id: "7",
  //   title: "Music & Arts Showcase",
  //   description:
  //     "Our talented musicians and artists displayed their creativity through concerts, art exhibitions, and collaborative performances.",
  //   image: event1,
  //   date: "December 10, 2023",
  //   category: "Arts",
  //   link: "/events/music-arts-showcase",
  // },
  // {
  //   id: "8",
  //   title: "Community Service Day",
  //   description:
  //     "Students volunteered at local shelters, cleaned parks, and organized food drives, making a positive impact in our community.",
  //   image: event1,
  //   date: "November 15, 2023",
  //   category: "Community",
  //   link: "/events/community-service",
  // },
];

// Compact Event Card Component
const CompactEventCard: React.FC<{
  event: EventItem;
  index: number;
}> = ({ event }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((centerY - y) / centerY) * 8;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const categoryColors: Record<
    string,
    { bg: string; text: string; border: string; gradient: string }
  > = {
    Academic: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200",
      gradient: "from-blue-500 to-blue-600",
    },
    Sports: {
      bg: "bg-orange-100",
      text: "text-orange-800",
      border: "border-orange-200",
      gradient: "from-orange-500 to-orange-600",
    },
    Cultural: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      border: "border-purple-200",
      gradient: "from-purple-500 to-purple-600",
    },
    Environment: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
      gradient: "from-green-500 to-green-600",
    },
    Technology: {
      bg: "bg-indigo-100",
      text: "text-indigo-800",
      border: "border-indigo-200",
      gradient: "from-indigo-500 to-indigo-600",
    },
    Arts: {
      bg: "bg-pink-100",
      text: "text-pink-800",
      border: "border-pink-200",
      gradient: "from-pink-500 to-pink-600",
    },
    Community: {
      bg: "bg-teal-100",
      text: "text-teal-800",
      border: "border-teal-200",
      gradient: "from-teal-500 to-teal-600",
    },
  };

  const colors = categoryColors[event.category] || {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
    gradient: "from-green-500 to-green-600",
  };

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 w-80 h-96 mx-3 cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${
          rotation.y
        }deg) translateZ(${isHovered ? "10px" : "0px"})`,
        transition: "transform 0.3s ease-out",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative group h-full bg-white rounded-xl flex flex-col shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Card shine effect */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${(rotation.y + 10) * 4}% ${
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
              animation: isHovered ? "float 3s ease-in-out infinite" : "none",
              animationDelay: "0s",
            }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              top: "65%",
              right: "25%",
              animation: isHovered ? "float 3s ease-in-out infinite" : "none",
              animationDelay: "1s",
            }}
          ></div>
          <div
            className="absolute w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              bottom: "35%",
              left: "30%",
              animation: isHovered ? "float 3s ease-in-out infinite" : "none",
              animationDelay: "2s",
            }}
          ></div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-20">
          <span
            className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colors.bg} ${colors.text} border ${colors.border} backdrop-blur-sm shadow-sm`}
          ></span>
        </div>

        {/* Image Container */}
        <div className="relative overflow-hidden h-48 rounded-t-xl">
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent z-10"></div>
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            style={{
              filter: isHovered
                ? "saturate(1.2) contrast(1.1)"
                : "saturate(1) contrast(1)",
            }}
          />

          {/* Dynamic overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${colors.gradient
              .replace("from-", "from-")
              .replace(
                "to-",
                "to-"
              )}/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}
          ></div>

          {/* Date Badge */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-gray-800 z-20 shadow-sm">
            {event.date}
          </div>

          {/* Hover icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-green-600"
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

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-green-700 transition-colors duration-300 leading-tight line-clamp-2">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm flex-grow leading-relaxed line-clamp-4">
            {event.description}
          </p>
        </div>
      </div>

      <style>{`
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

// Navigation Dots Component
const NavigationDots: React.FC<{
  total: number;
  active: number;
  onSelect: (index: number) => void;
}> = ({ total, active, onSelect }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`transition-all duration-300 rounded-full relative overflow-hidden ${
            active === index
              ? "w-8 h-2 bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg"
              : "w-2 h-2 bg-green-200 hover:bg-green-300 hover:scale-125"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        >
          {active === index && (
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-50 animate-pulse"></div>
          )}
        </button>
      ))}
    </div>
  );
};

// Main Carousel Event Slider Component
const EventSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Create infinite loop by duplicating events
  const infiniteEvents = [...schoolEvents, ...schoolEvents, ...schoolEvents];
  const totalEvents = schoolEvents.length;

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return;
    console.log(progress);
    let animationFrame: number;
    let startTime: number | null = null;
    const duration = 4000; // 4 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);

      setProgress(progressPercent);

      if (progressRef.current) {
        progressRef.current.style.width = `${progressPercent}%`;
      }

      if (elapsed >= duration) {
        goToNext();
        setProgress(0);
        startTime = null;
      }

      if (!isPaused) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isPaused, currentIndex]);

  // Handle smooth sliding
  const slideToIndex = (index: number, smooth = true) => {
    if (!containerRef.current) return;

    const cardWidth = 320 + 24; // card width + margin
    const offset = -index * cardWidth;

    if (smooth) {
      gsap.to(containerRef.current, {
        x: offset,
        duration: 0.6,
        ease: "power2.out",
      });
    } else {
      gsap.set(containerRef.current, { x: offset });
    }
  };

  // Navigation functions
  const goToNext = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    slideToIndex(nextIndex);

    // Reset to beginning when reaching the end (infinite loop)
    if (nextIndex >= totalEvents * 2) {
      setTimeout(() => {
        setCurrentIndex(totalEvents);
        slideToIndex(totalEvents, false);
      }, 600);
    }
  };

  const goToPrev = () => {
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    slideToIndex(prevIndex);

    // Reset to end when going before the beginning (infinite loop)
    if (prevIndex < totalEvents) {
      setTimeout(() => {
        setCurrentIndex(totalEvents * 2 - 1);
        slideToIndex(totalEvents * 2 - 1, false);
      }, 600);
    }
  };

  const goToSlide = (index: number) => {
    const targetIndex = totalEvents + index;
    setCurrentIndex(targetIndex);
    slideToIndex(targetIndex);
    setProgress(0);
  };

  // Initialize position
  useEffect(() => {
    setCurrentIndex(totalEvents);
    slideToIndex(totalEvents, false);
  }, []);

  // Reset progress when slide changes manually
  useEffect(() => {
    setProgress(0);
    if (progressRef.current) {
      progressRef.current.style.width = "0%";
    }
  }, [currentIndex]);

  // Calculate active dot index
  const activeDotIndex =
    (((currentIndex - totalEvents) % totalEvents) + totalEvents) % totalEvents;

  return (
    <div
      className="event-slider relative py-16 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={sliderRef}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-green-200/30 to-emerald-200/30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-200/30 to-teal-200/30 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-r from-green-100/20 to-emerald-100/20 blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl md:text-2xl font-bold bg-gradient-to-r from-green-800 via-emerald-700 to-teal-700 bg-clip-text text-transparent mb-4 leading-tight">
          School Highlights
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Explore our recent events, achievements, and activities that showcase
          our vibrant school community
        </p>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-green-100/50 z-30">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transition-all duration-100 ease-linear relative overflow-hidden"
          style={{ width: "0%" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="overflow-hidden">
          <div
            ref={containerRef}
            className="flex transition-transform duration-600 ease-out"
          >
            {infiniteEvents.map((event, index) => (
              <CompactEventCard
                key={`${event.id}-${Math.floor(index / totalEvents)}`}
                event={event}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center text-green-800 hover:bg-green-50 hover:text-green-600 transition-all duration-300 z-20 transform hover:scale-110 group"
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center text-green-800 hover:bg-green-50 hover:text-green-600 transition-all duration-300 z-20 transform hover:scale-110 group"
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Dots */}
      <NavigationDots
        total={totalEvents}
        active={activeDotIndex}
        onSelect={goToSlide}
      />

      {/* Slide Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
          {activeDotIndex + 1} of {totalEvents}
        </span>
      </div>
    </div>
  );
};

export default EventSlider;
