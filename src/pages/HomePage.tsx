import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ChevronLeft, ChevronRight, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WhyUs from "../MyComponents/WhyUs";
import { Link } from "react-router-dom";
import EventSlider from "@/MyComponents/EventSlider";
import PrincipalMessage from "@/MyComponents/MsgFromPrincipal";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const bannerRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const newsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const eventsRef = useRef(null);

  // Banner slider state and data
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerImages = [
    "https://scontent.fbir7-1.fna.fbcdn.net/v/t39.30808-6/494627999_1163956128862495_6777657293295228081_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=9r90JNnxiMMQ7kNvwFvjst0&_nc_oc=Adl9mK2Bv5ElDfb2fGlHcK83XFaVoHkvAGDa8eoUL2UDg0Wv0E2HFN2TzJr_hAbS4feL6ZWQizPSPVzrM6Lhl4RL&_nc_zt=23&_nc_ht=scontent.fbir7-1.fna&_nc_gid=qhOmtzqckReyYYISrrCaFA&oh=00_AfKt3h8OFlKmJUwTZixNAgJ3tBO3FeDAgG1x8dta1bSQig&oe=6840B2BF",
    "https://scontent.fbir7-1.fna.fbcdn.net/v/t39.30808-6/499701828_1171916121399829_1048416657670283510_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Tzp92pX3gO4Q7kNvwGSdtdL&_nc_oc=AdnZLChCbTIEUyOMgWSqJGdCAHCNWDeYyeEoD-gaNnZG3IyAi5swVk_pGpNAz4DJP5T_vQrg_NCLf7H1luyqhse9&_nc_zt=23&_nc_ht=scontent.fbir7-1.fna&_nc_gid=bMKL1hKCq9hIwaNF6X5Xng&oh=00_AfK_4C868EoZLfATPQ6oieptvRBJ36oMtcRAPSwI-ZSCCg&oe=6840A693",
    "https://scontent.fbir7-1.fna.fbcdn.net/v/t39.30808-6/484290723_1121760143082094_2552161464950838033_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=JhrHrtd4bkUQ7kNvwExfyW4&_nc_oc=Adk8d4DfmP4hmvA97CjS_kJIxOrkA_5VWsuOAiWODSKMJb7kCGfByY7F5adO9gl2jhSQC-85HLrdrsWy5qzSVAvs&_nc_zt=23&_nc_ht=scontent.fbir7-1.fna&_nc_gid=nKBzEyoaGrhXWj090AlYjQ&oh=00_AfK7UhG-Lq22o6UO6mhjaUzlK0e6V2x8FGxVg3RInTJT3g&oe=68295178",
    "https://scontent.fbir7-1.fna.fbcdn.net/v/t39.30808-6/481121278_1111824904075618_5864908203893587589_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=KPIYahTk5l4Q7kNvwH5GstR&_nc_oc=Adm0zHEBNfKHw3B1Dtajl7UKmBXzs1nC2h4VOPfF89KtNA7896j7hZ1GdFLLoNECyncYGZhzXidic3Gv9zerT_3W&_nc_zt=23&_nc_ht=scontent.fbir7-1.fna&_nc_gid=bvz0-bFTxY97hafX4cjyHA&oh=00_AfITl0EKYuldkHhskVLZYrfZXWOB-beLQcix78HXQRkpAw&oe=68294F4B",
  ];

  // Function to navigate to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  // Function to navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
    );
  };

  // Auto slider change
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(sliderInterval);
  }, []);

  // GSAP animations initialization
  useEffect(() => {
    // Initialize GSAP animations
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
    });

    // Page load animation with staggered effect
    const pageElements = [
      bannerRef.current,
      aboutRef.current,
      featuresRef.current,
      newsRef.current,
      testimonialsRef.current,
      eventsRef.current,
    ];

    gsap.fromTo(
      pageElements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2,
      }
    );

    // Scroll animations for sections
    pageElements.forEach((section, index) => {
      if (!section) return;

      const direction = index % 2 === 0 ? 30 : -30;

      gsap.fromTo(
        section,
        { opacity: 0, y: direction },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Clean up ScrollTrigger instances when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Primary color value to use directly in styles
  const primaryColor = "#008754";
  // const primaryHoverColor = "#006f44";

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Contact Bar - Redesigned with direct color and adjusted layout */}
      <div
        style={{ backgroundColor: primaryColor }}
        className="text-white py-2"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span className="text-xs">Birtamode-4, Jhapa, Nepal</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone size={14} />
                <span className="text-xs">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail size={14} />
                <span className="text-xs">contact@edengarden.edu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Bar Schools notification ya halne */}
      <div className="bg-lime-200 text-emerald-800 py-2">
        <div className="container mx-auto px-4">
          <p className="text-sm text-center">
            Eden Garden Education Foundation celebrates Independence Day. School
            will be closed on March 26th.
          </p>
        </div>
      </div>

      {/* Header/Navigation */}
      <header className="py-4">
        <div className="container mx-auto px-4">
          <div className="border border-gray-200 rounded-lg bg-white shadow-lg shadow-green-200">
            <div className="flex justify-between items-center py-4 px-6">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: primaryColor }}
                >
                  <img
                    src="https://scontent.fktm19-1.fna.fbcdn.net/v/t39.30808-6/480402285_1104560078135434_135699426940138276_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Pkk9HiNPjk0Q7kNvwGPmvTQ&_nc_oc=AdktzjCnyOO5LOaUjuQQkZmSn7vnJZxB0D_pTy5vXFbcFSJ28tMo1gA323vgglpwERo&_nc_zt=23&_nc_ht=scontent.fktm19-1.fna&_nc_gid=uwSvC4VfkPEwpQqv0j1L-w&oh=00_AfIDIyCK-kbWaU8HxvWqTKWuvaYI4nIZUE5td6mRfjNHFA&oe=68417481"
                    alt="logo"
                  ></img>
                </div>
                <div>
                  <h1
                    className="text-2xl md:text-xl font-bold text-gray-800"
                    style={{
                      fontFamily:
                        "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Eden Garden Education Foundation
                  </h1>
                  <p className="text-xs text-gray-500">Igniting Young Minds</p>
                </div>
              </div>

              <nav className="hidden md:flex items-center space-x-6">
                <a
                  href="#"
                  className="nav-item text-sm font-medium text-gray-800 hover:text-primary"
                  style={
                    { "--nav-hover-color": primaryColor } as React.CSSProperties
                  }
                >
                  Home
                </a>
                <a
                  href="#"
                  className="nav-item text-sm font-medium text-gray-600 hover:text-primary"
                  style={
                    { "--nav-hover-color": primaryColor } as React.CSSProperties
                  }
                >
                  About
                </a>
                <a
                  href="#"
                  className="nav-item text-sm font-medium text-gray-600 hover:text-primary"
                  style={
                    { "--nav-hover-color": primaryColor } as React.CSSProperties
                  }
                >
                  Academic
                </a>
                <a
                  href="#"
                  className="nav-item text-sm font-medium text-gray-600 hover:text-primary"
                  style={
                    { "--nav-hover-color": primaryColor } as React.CSSProperties
                  }
                >
                  Students
                </a>
                <Link
                  to="/blogs"
                  className="nav-item text-sm font-medium text-gray-600 hover:text-primary"
                  style={
                    { "--nav-hover-color": primaryColor } as React.CSSProperties
                  }
                >
                  Blogs
                </Link>
                <a
                  href="#"
                  className="nav-item text-sm font-medium text-gray-600 hover:text-primary"
                  style={
                    { "--nav-hover-color": primaryColor } as React.CSSProperties
                  }
                >
                  Gallery
                </a>
                <a
                  href="#"
                  className="nav-item text-sm font-medium text-gray-600 hover:text-primary"
                  style={
                    { "--nav-hover-color": primaryColor } as React.CSSProperties
                  }
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Banner Section with Auto-sliding */}
        <section ref={bannerRef} className="py-3">
          <div className="w-full max-w-[1400px] mx-auto px-2 sm:px-4">
            <div className="relative rounded-lg overflow-hidden shadow-md">
              <AspectRatio ratio={16 / 5} className="bg-slate-50">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                  style={{
                    backgroundImage: `url(${bannerImages[currentSlide]})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Eden Garden Education
                  </h2>
                  <p className="text-xl md:text-2xl">
                    Nurturing minds, shaping futures
                  </p>
                </div>
                <div className="absolute bottom-4 left-4 flex space-x-1">
                  {bannerImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        currentSlide === index ? "bg-green-600" : "bg-white"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
                <button
                  className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white"
                  onClick={prevSlide}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white"
                  onClick={nextSlide}
                >
                  <ChevronRight size={24} />
                </button>
              </AspectRatio>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="School building"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  About Our School
                </h2>
                <div
                  className="w-20 h-1 mb-6"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <p className="text-gray-600 mb-4">
                  Eden Garden Education Foundation was established in 1995 with
                  a vision to provide quality education to all students. We are
                  committed to nurturing young minds and helping them grow into
                  responsible citizens who can contribute positively to society.
                </p>
                <p className="text-gray-600 mb-4">
                  Our school offers a comprehensive curriculum that balances
                  academic excellence with character development. We believe in
                  providing a supportive environment where students can discover
                  their talents and pursue their passions.
                </p>
                <p className="text-gray-600 mb-6">
                  With state-of-the-art facilities and dedicated teachers, we
                  strive to create a learning atmosphere that is both
                  challenging and nurturing. Our approach to education focuses
                  on developing critical thinking, creativity, and leadership
                  skills.
                </p>
                <Button
                  variant="outline"
                  style={{
                    borderColor: primaryColor,
                    color: primaryColor,
                  }}
                  className="hover:bg-[#008754] hover:text-white"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <WhyUs />
        {/* Features Section */}
        {/* <section ref={featuresRef} className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Why Choose Us
              </h2>
              <div
                className="w-20 h-1 mx-auto mb-6"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                Our school offers a unique learning experience with focus on
                academic excellence, character development, and nurturing
                individual talents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div
                  className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4"
                  style={{ color: primaryColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Academic Excellence
                </h3>
                <p className="text-gray-600">
                  Our curriculum is designed to challenge students and help them
                  achieve their highest potential in academics.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div
                  className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4"
                  style={{ color: primaryColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Dedicated Faculty
                </h3>
                <p className="text-gray-600">
                  Our experienced teachers are passionate about education and
                  committed to the success of each student.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div
                  className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4"
                  style={{ color: primaryColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Modern Facilities
                </h3>
                <p className="text-gray-600">
                  Our school is equipped with modern facilities and technology
                  to enhance the learning experience.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Latest News Section */}
        <EventSlider />
        <section ref={newsRef} className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Latest News
                </h2>
                <div
                  className="w-20 h-1 mb-2"
                  style={{ backgroundColor: primaryColor }}
                ></div>
              </div>
              <a
                href="#"
                className="hover:underline"
                style={{ color: primaryColor }}
              >
                View All News
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <Card
                  key={item}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-162591948${item}320-f31b85356482?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80`}
                      alt={`News ${item}`}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>May {item + 9}, 2025</span>
                      <span className="mx-2">•</span>
                      <span>Events</span>
                    </div>
                    <CardTitle>Annual Science Fair Winners Announced</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Congratulations to all participants and winners of our
                      Annual Science Fair. The event showcased incredible talent
                      and innovation from our students.
                    </CardDescription>
                    <a
                      href="#"
                      className="hover:underline"
                      style={{ color: primaryColor }}
                    >
                      Read more →
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section ref={eventsRef} className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Upcoming Events
              </h2>
              <div
                className="w-20 h-1 mx-auto mb-6"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                Stay updated with all the exciting events and activities
                happening at our school.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((event) => (
                <div
                  key={event}
                  className="flex bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div
                    className="w-24 text-white flex flex-col items-center justify-center p-3"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span className="text-2xl font-bold">{15 + event}</span>
                    <span className="text-sm">June</span>
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="font-semibold text-lg mb-1">
                      Annual Sports Day
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Join us for a day full of exciting sports activities and
                      competitions. All students and parents are welcome.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button
                variant="outline"
                style={{
                  borderColor: primaryColor,
                  color: primaryColor,
                }}
                className="hover:bg-[#008754] hover:text-white"
              >
                View All Events
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={testimonialsRef} className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                What Parents Say
              </h2>
              <div
                className="w-20 h-1 mx-auto mb-6"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                Read what parents have to say about their experience with our
                school.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="h-8 w-8 opacity-50"
                      style={{ color: primaryColor }}
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-600 text-center mb-4">
                    "Eden Garden Education has been the perfect choice for my
                    child. The teachers are caring and the academic program is
                    challenging yet supportive. My child has thrived here in
                    both academics and extracurricular activities."
                  </p>
                  <div className="flex flex-col items-center">
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">
                      Parent of Grade 5 Student
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <PrincipalMessage />
      </main>

      {/* Footer */}
      <footer className="relative bg-[#00712D] text-white">
        {/* Curved top border using SVG */}
        <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-[99%] h-16">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
            style={{ transform: "rotate(180deg)" }}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#00712D"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* School Info Section */}
            <div className="space-y-6">
              {/* <img
              src={HorizonLogo}
              width="100px"
              height="100px"
              alt="School Logo"
              className="bg-white p-2 rounded-lg"
            /> */}
              <p className="text-lg font-medium max-w-xs">
                "Igniting Young Minds"
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    className="hover:text-white/80 transition-colors"
                  >
                    {/* <Facebook className="h-6 w-6" /> */}
                  </a>
                  <a
                    href="https://instagram.com"
                    className="hover:text-white/80 transition-colors"
                  >
                    {/* <Instagram className="h-6 w-6" /> */}
                  </a>
                  <a
                    href="https://youtube.com"
                    className="hover:text-white/80 transition-colors"
                  >
                    {/* <Youtube className="h-6 w-6" /> */}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  "About Us",
                  "Programs",
                  "Admission",
                  "News/Events",
                  "Student Forms",
                  "Payment Notice",
                  "Academic Calendar",
                  "School Policies",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-white/80 transition-colors flex items-center space-x-2"
                    >
                      <span className="h-1 w-1 bg-white rounded-full"></span>
                      <span>{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 flex-shrink-0" />
                  <span>Birtamod-3,Jhapa,Nepal</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 flex-shrink-0" />
                  <a
                    href="mailto:info@samriddhischool.edu.np"
                    className="hover:text-white/80 transition-colors"
                  >
                    edengarden@gmail.com
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 flex-shrink-0" />
                  <div>
                    <a
                      href="tel:01-4970590"
                      className="hover:text-white/80 transition-colors"
                    >
                      01-4970590
                    </a>
                    ,{" "}
                    <a
                      href="tel:01-4970591"
                      className="hover:text-white/80 transition-colors"
                    >
                      4970591
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* School Hours & Newsletter Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">School Hours</h3>
                <ul className="space-y-2">
                  <li>Monday - Friday: 9:00 AM - 4:00 PM</li>
                  <li>Saturday: Closed</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Emergency Contact</h3>
                <p>24/7 Helpline: +977-980-12341547</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p>
                © Copyright {new Date().getFullYear()} Eden Garden Education
                Foundation All Rights Reserved
              </p>
              <div className="flex items-center space-x-2">
                <span>Developed By:</span>
                <a
                  href="https://digitalnepal.com"
                  className="text-white hover:text-white/80 transition-colors font-medium"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
