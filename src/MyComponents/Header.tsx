"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { gsap } from "gsap";

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

  const navigationItems = [
    { name: "Home", href: "#", icon: Home, active: true },
    { name: "About", href: "#", icon: Info },
    { name: "Academic", href: "#", icon: BookOpen },
    { name: "Teachers", href: "/teachers", icon: Users },
    { name: "Blogs", href: "/blogs", icon: FileText },
    { name: "Gallery", href: "#", icon: ImageIcon },
    { name: "Contact", href: "#", icon: Phone },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // Only consider it scrolled after passing the contact and alert bars
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animations
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Open animation
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
      // Close animation
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
    console.log(isScrolled);
  };

  return (
    <>
      {/* Contact Bar */}
      <div
        style={{ backgroundColor: primaryColor }}
        className="text-white py-2"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex flex-wrap items-center space-x-2 md:space-x-6">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span className="text-xs">Birtamode-4, Jhapa, Nepal</span>
              </div>
              <div className="hidden sm:flex items-center space-x-1">
                <Phone size={14} />
                <span className="text-xs">+1 (555) 123-4567</span>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Mail size={14} />
                <span className="text-xs">contact@edengarden.edu</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
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

      {/* Alert Bar */}
      <div className="bg-lime-200 text-emerald-800 py-2">
        <div className="container mx-auto px-4">
          <p className="text-sm text-center font-medium">
            Eden Garden Education Foundation celebrates Independence Day. School
            will be closed on March 26th.
          </p>
        </div>
      </div>

      {/* Main Header - Now positioned relative instead of fixed */}
      <header className="bg-white z-30">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3">
          <div className="border border-gray-200/60 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg shadow-emerald-200/30">
            <div className="flex justify-between items-center py-3 md:py-4 px-4 md:px-6">
              {/* Logo Section */}
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-white shadow-lg">
                  <img
                    src="https://scontent.fktm19-1.fna.fbcdn.net/v/t39.30808-6/480402285_1104560078135434_135699426940138276_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Pkk9HiNPjk0Q7kNvwGPmvTQ&_nc_oc=AdktzjCnyOO5LOaUjuQQkZmSn7vnJZxB0D_pTy5vXFbcFSJ28tMo1gA323vgglpwERo&_nc_zt=23&_nc_ht=scontent.fktm19-1.fna&_nc_gid=uwSvC4VfkPEwpQqv0j1L-w&oh=00_AfIDIyCK-kbWaU8HxvWqTKWuvaYI4nIZUE5td6mRfjNHFA&oe=68417481"
                    alt="Eden Garden Education Foundation Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h1
                    className="text-lg sm:text-xl md:text-2xl font-bold leading-tight"
                    style={{
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                      letterSpacing: "0.01em",
                      background: `linear-gradient(135deg, ${primaryColor} 0%, #34d399 50%, #047857 100%)`,
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
                    className="text-xs md:text-sm text-gray-600 font-medium"
                    style={{
                      fontFamily: "'Inter', 'Segoe UI', sans-serif",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Igniting Young Minds
                  </p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group relative text-sm font-semibold transition-all duration-300 ${
                      item.active
                        ? "text-emerald-600"
                        : "text-gray-700 hover:text-emerald-600"
                    }`}
                    style={{
                      fontFamily: "'Inter', 'Segoe UI', sans-serif",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                        item.active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden w-10 h-10 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors duration-200 border border-gray-200"
                aria-label="Toggle mobile menu"
              >
                <Menu size={20} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

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

      {/* Mobile Menu Slider */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl transform translate-x-full"
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-green-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-white shadow-md">
              <img
                src="https://scontent.fktm19-1.fna.fbcdn.net/v/t39.30808-6/480402285_1104560078135434_135699426940138276_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Pkk9HiNPjk0Q7kNvwGPmvTQ&_nc_oc=AdktzjCnyOO5LOaUjuQQkZmSn7vnJZxB0D_pTy5vXFbcFSJ28tMo1gA323vgglpwERo&_nc_zt=23&_nc_ht=scontent.fktm19-1.fna&_nc_gid=uwSvC4VfkPEwpQqv0j1L-w&oh=00_AfIDIyCK-kbWaU8HxvWqTKWuvaYI4nIZUE5td6mRfjNHFA&oe=68417481"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2
                className="text-lg font-bold"
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  background: `linear-gradient(135deg, ${primaryColor} 0%, #34d399 50%, #047857 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Eden Garden
              </h2>
              <p
                className="text-xs text-gray-600"
                style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
              >
                Education Foundation
              </p>
            </div>
          </div>
          <button
            onClick={closeMobileMenu}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors duration-200 shadow-sm"
            aria-label="Close menu"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div ref={menuItemsRef} className="py-6">
          <div className="px-6 mb-4">
            <p
              className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Navigation
            </p>
          </div>

          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className={`group flex items-center justify-between px-6 py-4 transition-all duration-300 ${
                  item.active
                    ? "bg-emerald-50 border-r-4 border-emerald-500"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      item.active
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-100 text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-600"
                    }`}
                  >
                    <IconComponent size={18} />
                  </div>
                  <span
                    className={`font-semibold transition-colors duration-300 ${
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
              </a>
            );
          })}

          {/* Mobile Contact Info */}
          <div className="mt-8 px-6">
            <p
              className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4"
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Contact Us
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <MapPin size={16} />
                </div>
                <span className="text-sm text-gray-700">
                  Birtamode-4, Jhapa, Nepal
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Phone size={16} />
                </div>
                <span className="text-sm text-gray-700">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Mail size={16} />
                </div>
                <span className="text-sm text-gray-700">
                  contact@edengarden.edu
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 to-transparent">
          <div className="text-center">
            <p
              className="text-xs text-gray-500 mb-2"
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Nurturing minds, shaping futures
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalHeader;
