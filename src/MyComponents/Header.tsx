"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronRight,
  Home,
  BookOpen,
  Users,
  FileText,
  ImageIcon,
  Phone,
  Mail,
  MapPin,
  Info,
  Bell,
} from "lucide-react";
import { gsap } from "gsap";
import logo from "../SchoolPics/logo-removebg-preview.png";
// Placeholder for logo - replace with your actual logo import
const edenLogo = logo;

interface HeaderProps {
  primaryColor?: string;
}

const ProfessionalHeader: React.FC<HeaderProps> = ({
  primaryColor = "#059669",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    {
      name: "Home",
      to: "/",
      icon: Home,
      active: window.location.pathname === "/",
    },
    {
      name: "About",
      to: "/about",
      icon: Info,
      active: window.location.pathname === "/about",
    },
    {
      name: "Academic",
      to: "/academic",
      icon: BookOpen,
      active: window.location.pathname === "/academic",
    },
    {
      name: "Teachers",
      to: "/teachers",
      icon: Users,
      active: window.location.pathname === "/teachers",
    },
    {
      name: "Blogs",
      to: "/blogs",
      icon: FileText,
      active: window.location.pathname === "/blogs",
    },
    {
      name: "Gallery",
      to: "/gallery",
      icon: ImageIcon,
      active: window.location.pathname === "/gallery",
    },
    {
      name: "Contact",
      to: "/contact",
      icon: Phone,
      active: window.location.pathname === "/contact",
    },
  ];

  const notices = [
    "2nd Terminal Examination Result is Happening this 31st of Ashoj",
    "Parent-Teacher Meeting scheduled for this Exam day",
    "Students are requested to attent the school",
    "Tihar Holiday Starts After Results",
  ];

  // Handle scroll effect and sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 80;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Marquee animation
  useEffect(() => {
    if (marqueeRef.current) {
      const marqueeContent = marqueeRef.current;
      const clone = marqueeContent.cloneNode(true) as HTMLElement;
      marqueeContent.parentElement?.appendChild(clone);

      gsap.to(marqueeContent, {
        x: "-100%",
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      gsap.to(clone, {
        x: "-100%",
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  // Mobile menu animations
  useEffect(() => {
    if (isMobileMenuOpen) {
      if (mobileMenuRef.current && overlayRef.current && menuItemsRef.current) {
        gsap.set(mobileMenuRef.current, { x: "100%" });
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(menuItemsRef.current.children, { x: 50, opacity: 0 });

        const tl = gsap.timeline();
        tl.to(overlayRef.current, { opacity: 1, duration: 0.3 })
          .to(
            mobileMenuRef.current,
            { x: "0%", duration: 0.4, ease: "power3.out" },
            "-=0.1"
          )
          .to(
            menuItemsRef.current.children,
            {
              x: 0,
              opacity: 1,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.2"
          );
      }
    } else {
      if (mobileMenuRef.current && overlayRef.current && menuItemsRef.current) {
        const tl = gsap.timeline();
        tl.to(menuItemsRef.current.children, {
          x: 50,
          opacity: 0,
          duration: 0.2,
          stagger: 0.02,
          ease: "power2.in",
        })
          .to(
            mobileMenuRef.current,
            { x: "100%", duration: 0.3, ease: "power3.in" },
            "-=0.1"
          )
          .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.2");
      }
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Contact Bar */}
      <div
        style={{ backgroundColor: primaryColor }}
        className="text-white py-2.5"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex flex-wrap items-center gap-3 md:gap-6">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="flex-shrink-0" />
                <span className="text-xs md:text-sm">
                  Birtamode-4, Jhapa, Nepal
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="flex-shrink-0" />
                <span className="text-xs md:text-sm">023-530511</span>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0" />
                <span className="text-xs md:text-sm">
                  edengarden169@gmail.com
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Notice Bar with Marquee */}
      <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border-y border-emerald-200 py-3 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            {/* Static Notice Label */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md">
                <Bell size={16} className="text-white animate-pulse" />
              </div>
              <span className="text-sm font-bold text-emerald-800 tracking-wide whitespace-nowrap">
                NOTICES
              </span>
              <div className="w-px h-6 bg-emerald-300 ml-2"></div>
            </div>

            {/* Marquee Container */}
            <div className="flex-1 overflow-hidden relative">
              <div className="flex gap-8" style={{ whiteSpace: "nowrap" }}>
                <div ref={marqueeRef} className="flex gap-8 items-center">
                  {notices.map((notice, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex-shrink-0 shadow-sm"></div>
                      <span className="text-sm font-medium text-emerald-900">
                        {notice}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Enhanced Glassmorphic Design */}
      <div
        ref={headerRef}
        className="z-40 transition-all duration-300"
        style={{
          position: "sticky",
          top: 0,
          background: isScrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(12px)",
          boxShadow: isScrolled
            ? "0 8px 32px rgba(5, 150, 105, 0.15)"
            : "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3">
          <div
            className="rounded-2xl transition-all duration-300 overflow-hidden"
            style={{
              background: `linear-gradient(to right, 
                rgba(6, 95, 70, 0.15) 0%, 
                rgba(4, 120, 87, 0.12) 25%,
                rgba(5, 150, 105, 0.10) 50%,
                rgba(4, 120, 87, 0.12) 75%,
                rgba(6, 95, 70, 0.15) 100%)`,
              backgroundColor: "rgba(240, 253, 250, 0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(6, 95, 70, 0.15)",
              boxShadow: isScrolled
                ? "0 4px 20px rgba(6, 95, 70, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)"
                : "0 2px 10px rgba(6, 95, 70, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
            }}
          >
            <div className="flex justify-between items-center py-3 md:py-4 px-4 md:px-6">
              {/* Logo Section */}
              <div className="flex items-center gap-3 md:gap-4">
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    padding: "3px",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={edenLogo}
                      alt="Eden Garden Education Foundation Logo"
                      className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h1
                    className="text-base sm:text-lg md:text-2xl font-bold leading-tight"
                    style={{
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                      letterSpacing: "0.01em",
                      background: `linear-gradient(135deg, ${primaryColor} 0%, #10b981 50%, #047857 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "0px 0px 1px rgba(5, 150, 105, 0.1)",
                    }}
                  >
                    <span className="hidden sm:inline">
                      Eden Garden Education Foundation
                    </span>
                    <span className="sm:hidden">Eden Garden</span>
                  </h1>
                  <p
                    className="text-xs md:text-sm font-semibold mt-0.5"
                    style={{
                      fontFamily: "'Inter', 'Segoe UI', sans-serif",
                      letterSpacing: "0.02em",
                      background:
                        "linear-gradient(90deg, #059669 0%, #10b981 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Igniting Young Minds
                  </p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`group relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      item.active
                        ? "text-emerald-700"
                        : "text-gray-700 hover:text-emerald-600"
                    }`}
                    style={{
                      fontFamily: "'Inter', 'Segoe UI', sans-serif",
                      letterSpacing: "0.01em",
                      textDecoration: "none",
                      background: item.active
                        ? "rgba(5, 150, 105, 0.1)"
                        : "transparent",
                    }}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-300 rounded-full ${
                        item.active ? "w-3/4" : "w-0 group-hover:w-3/4"
                      }`}
                    />
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Toggle mobile menu"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(16, 185, 129, 0.15) 100%)",
                  border: "1px solid rgba(5, 150, 105, 0.2)",
                }}
              >
                <Menu size={22} className="text-emerald-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Slider - Enhanced */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl transform translate-x-full"
      >
        {/* Mobile Menu Header */}
        <div
          className="flex items-center justify-between p-5 border-b border-emerald-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(236, 253, 245, 1) 0%, rgba(209, 250, 229, 1) 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shadow-md"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                padding: "2px",
              }}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={edenLogo}
                  alt="Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
            <div>
              <h2
                className="text-base font-bold"
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  background: `linear-gradient(135deg, ${primaryColor} 0%, #10b981 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Eden Garden
              </h2>
              <p
                className="text-xs font-semibold"
                style={{
                  fontFamily: "'Inter', 'Segoe UI', sans-serif",
                  color: "#059669",
                }}
              >
                Education Foundation
              </p>
            </div>
          </div>
          <button
            onClick={closeMobileMenu}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm"
            aria-label="Close menu"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(5, 150, 105, 0.2)",
            }}
          >
            <X size={18} className="text-emerald-700" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div
          ref={menuItemsRef}
          className="py-4 overflow-y-auto h-[calc(100%-180px)]"
        >
          <div className="px-5 mb-3">
            <p
              className="text-xs font-bold text-emerald-700 uppercase tracking-wider"
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Navigation
            </p>
          </div>

          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.to}
                onClick={closeMobileMenu}
                className={`group flex items-center justify-between px-5 py-3.5 transition-all duration-300 ${
                  item.active
                    ? "bg-gradient-to-r from-emerald-50 to-green-50 border-r-4 border-emerald-500"
                    : "hover:bg-emerald-50/50"
                }`}
                style={{ textDecoration: "none" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                      item.active
                        ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white scale-105"
                        : "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200"
                    }`}
                  >
                    <IconComponent size={18} />
                  </div>
                  <span
                    className={`font-semibold text-sm transition-colors duration-300 ${
                      item.active
                        ? "text-emerald-700"
                        : "text-gray-700 group-hover:text-emerald-600"
                    }`}
                    style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
                  >
                    {item.name}
                  </span>
                </div>
                <ChevronRight
                  size={16}
                  className={`transition-all duration-300 ${
                    item.active
                      ? "text-emerald-500"
                      : "text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1"
                  }`}
                />
              </Link>
            );
          })}

          {/* Mobile Contact Info */}
          <div className="mt-6 px-5">
            <p
              className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3"
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Contact Us
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-emerald-50/50">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <MapPin size={14} />
                </div>
                <span className="text-xs text-gray-700 leading-relaxed">
                  Birtamode-4, Jhapa, Nepal
                </span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-50/50">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <Phone size={14} />
                </div>
                <span className="text-xs text-gray-700">023-530511</span>
              </div>
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-emerald-50/50">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <Mail size={14} />
                </div>
                <span className="text-xs text-gray-700 break-all leading-relaxed">
                  edengarden169@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Footer */}
        <div
          className="absolute bottom-0 left-0 right-0 p-5"
          style={{
            background:
              "linear-gradient(to top, rgba(236, 253, 245, 1) 0%, rgba(236, 253, 245, 0) 100%)",
          }}
        >
          <div className="text-center">
            <p
              className="text-xs font-medium text-emerald-700 mb-2"
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Nurturing minds, shaping futures
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 rounded-full mx-auto shadow-sm" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalHeader;
