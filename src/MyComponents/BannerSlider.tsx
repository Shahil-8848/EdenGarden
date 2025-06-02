"use client";

import type React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { gsap } from "gsap";

interface EnhancedBannerProps {
  bannerImages: string[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
}

const ProfessionalBannerSlider: React.FC<EnhancedBannerProps> = ({
  bannerImages,
  autoPlay = true,
  interval = 5000,
  showControls = true,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = bannerImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoaded(true);
      } catch (error) {
        console.warn("Some images failed to preload:", error);
        setIsLoaded(true);
      }
    };

    preloadImages();
  }, [bannerImages]);

  // Auto-slide functionality with play/pause
  useEffect(() => {
    if (isPlaying && isLoaded) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prevSlide) =>
          prevSlide === bannerImages.length - 1 ? 0 : prevSlide + 1
        );
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [bannerImages.length, interval, isPlaying, isLoaded]);

  // Progress bar animation
  useEffect(() => {
    if (progressRef.current && isPlaying) {
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: interval / 1000,
          ease: "none",
          repeat: -1,
        }
      );
    } else if (progressRef.current) {
      gsap.set(progressRef.current, { width: "0%" });
    }
  }, [currentSlide, isPlaying, interval]);

  // Enhanced GSAP animations
  useEffect(() => {
    if (!isLoaded) return;

    if (
      imageRef.current &&
      titleRef.current &&
      subtitleRef.current &&
      overlayRef.current
    ) {
      // Kill existing animations
      gsap.killTweensOf([
        imageRef.current,
        titleRef.current,
        subtitleRef.current,
        overlayRef.current,
      ]);

      // Reset elements
      gsap.set(imageRef.current, {
        scale: 1.15,
        opacity: 0,
        filter: "blur(2px)",
      });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set([titleRef.current, subtitleRef.current], {
        y: isMobile ? 60 : 80,
        opacity: 0,
        rotationX: 15,
      });

      const tl = gsap.timeline();

      // Enhanced image entrance
      tl.to(imageRef.current, {
        scale: isMobile ? 1.08 : 1.05,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.8,
        ease: "power3.out",
      })
        // Overlay with sophisticated timing
        .to(
          overlayRef.current,
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=1.2"
        )
        // Title with 3D effect
        .to(
          titleRef.current,
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        )
        // Subtitle with stagger
        .to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.9"
        );

      // Continuous breathing effect
      gsap.to(imageRef.current, {
        scale: isMobile ? 1.12 : 1.08,
        duration: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, [currentSlide, isLoaded, isMobile]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide(
      currentSlide === bannerImages.length - 1 ? 0 : currentSlide + 1
    );
  }, [currentSlide, bannerImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      currentSlide === 0 ? bannerImages.length - 1 : currentSlide - 1
    );
  }, [currentSlide, bannerImages.length]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isLoaded) {
    return (
      <section className="py-2 md:py-6">
        <div className="w-full max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6">
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse">
            <AspectRatio
              ratio={isMobile ? 4 / 3 : 16 / 5}
              className="bg-slate-300"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={bannerRef} className="py-1 md:py-6">
      <div className="w-full max-w-[1400px] mx-auto px-1 sm:px-3 md:px-6">
        <div className="relative rounded-lg md:rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/20 border border-white/10 bg-slate-900">
          {/* Dynamic Aspect Ratio - Much taller on mobile for better presence */}
          <AspectRatio
            ratio={isMobile ? 4 / 3 : 16 / 5}
            className="bg-slate-900"
          >
            {/* Background Image */}
            <img
              ref={imageRef}
              src={
                bannerImages[currentSlide] ||
                "/placeholder.svg?height=600&width=800"
              }
              alt={`Eden Garden School Banner ${currentSlide + 1}`}
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{
                transformOrigin: "center center",
                filter: "brightness(0.85) contrast(1.15) saturate(1.1)",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />

            {/* Enhanced Mobile Gradient Overlays */}
            <div
              ref={overlayRef}
              className={`absolute inset-0 z-10 ${
                isMobile
                  ? "bg-gradient-to-b from-emerald-900/60 via-slate-900/40 to-blue-900/70"
                  : "bg-gradient-to-br from-emerald-900/50 via-slate-900/30 to-blue-900/50"
              }`}
            />
            <div
              className={`absolute inset-0 z-10 ${
                isMobile
                  ? "bg-gradient-to-t from-black/20 via-black/10 to-black/20"
                  : "bg-gradient-to-t from-black/20 via-black/10 to-black/20"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r " />

            {/* Subtle pattern overlay */}
            <div
              className="absolute inset-0 opacity-5 z-10"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                backgroundSize: isMobile ? "15px 15px" : "20px 20px",
              }}
            />

            {/* Content Container - Optimized for mobile */}
            <div
              className={`absolute inset-0 flex flex-col justify-center items-center text-white z-20 ${
                isMobile ? "px-4 py-8" : "px-4 md:px-6"
              }`}
            >
              <h1
                ref={titleRef}
                className={`font-black text-center tracking-tight leading-tight mb-3 md:mb-6 ${
                  isMobile
                    ? "text-4xl sm:text-5xl"
                    : "text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
                }`}
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  textShadow: isMobile
                    ? "0 6px 40px rgba(0,0,0,0.8), 0 3px 20px rgba(0,0,0,0.6), 0 10px 50px rgba(16,185,129,0.4)"
                    : "0 4px 30px rgba(0,0,0,0.7), 0 2px 15px rgba(0,0,0,0.5), 0 8px 40px rgba(16,185,129,0.3)",
                  color: "#ffffff",
                }}
              >
                Eden Garden
              </h1>
              <p
                ref={subtitleRef}
                className={`font-light text-center leading-relaxed ${
                  isMobile
                    ? "text-lg sm:text-xl max-w-sm px-2"
                    : "text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl max-w-xs sm:max-w-2xl md:max-w-4xl px-2"
                }`}
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  textShadow: isMobile
                    ? "0 4px 25px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.7)"
                    : "0 3px 20px rgba(0,0,0,0.8), 0 1px 8px rgba(0,0,0,0.6)",
                  color: "#f1f5f9",
                }}
              >
                Nurturing minds, shaping futures through excellence in education
              </p>
            </div>

            {/* Progress Bar */}
            {isPlaying && (
              <div
                className={`absolute bottom-0 left-0 w-full z-30 ${
                  isMobile ? "h-1.5" : "h-1"
                } bg-white/20`}
              >
                <div
                  ref={progressRef}
                  className="h-full bg-gradient-to-r from-emerald-400 to-green-300 shadow-lg shadow-emerald-500/50"
                />
              </div>
            )}

            {/* Mobile-Optimized Navigation Dots - Larger and more prominent */}
            <div
              className={`absolute z-30 flex ${
                isMobile
                  ? "bottom-6 left-1/2 -translate-x-1/2 space-x-3"
                  : "bottom-4 md:bottom-8 left-4 md:left-8 space-x-2 md:space-x-3"
              }`}
            >
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  className={`relative rounded-full transition-all duration-500 ease-out group ${
                    isMobile ? "w-3 h-3" : "w-2 h-2 md:w-3 md:h-3"
                  } ${
                    currentSlide === index
                      ? "bg-white scale-125 md:scale-150"
                      : "bg-white/40 hover:bg-white/70 hover:scale-110"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  style={{
                    boxShadow:
                      currentSlide === index
                        ? "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(16,185,129,0.5)"
                        : "0 2px 10px rgba(0,0,0,0.4)",
                  }}
                >
                  {currentSlide === index && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-green-300 opacity-50 animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Enhanced Navigation Controls */}
            {showControls && (
              <>
                {/* Mobile Navigation Arrows - Larger and more accessible */}
                <button
                  className={`absolute top-1/2 left-3 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/30 group ${
                    isMobile
                      ? "w-14 h-14"
                      : "w-12 h-12 md:w-16 md:h-16 md:left-4 md:left-8"
                  }`}
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  <ChevronLeft
                    size={isMobile ? 28 : 24}
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                </button>
                <button
                  className={`absolute top-1/2 right-3 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/30 group ${
                    isMobile
                      ? "w-14 h-14"
                      : "w-12 h-12 md:w-16 md:h-16 md:right-4 md:right-8"
                  }`}
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <ChevronRight
                    size={isMobile ? 28 : 24}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </button>

                {/* Play/Pause Control - Mobile optimized */}
                <button
                  className={`absolute top-4 right-4 z-30 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/30 ${
                    isMobile
                      ? "w-12 h-12"
                      : "w-10 h-10 md:w-12 md:h-12 md:top-8 md:right-8"
                  }`}
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isPlaying ? (
                    <Pause size={isMobile ? 20 : 16} />
                  ) : (
                    <Play size={isMobile ? 20 : 16} />
                  )}
                </button>
              </>
            )}

            {/* Enhanced Decorative Elements */}
            <div
              className={`absolute top-0 left-0 bg-gradient-to-br from-white/8 to-transparent z-10 ${
                isMobile ? "w-24 h-24" : "w-20 md:w-32 h-20 md:h-32"
              }`}
            />
            <div
              className={`absolute bottom-0 right-0 bg-gradient-to-tl from-white/8 to-transparent z-10 ${
                isMobile ? "w-24 h-24" : "w-20 md:w-32 h-20 md:h-32"
              }`}
            />

            {/* Corner accents - More prominent on mobile */}
            <div
              className={`absolute top-0 right-0 bg-gradient-to-b from-emerald-400/70 to-transparent z-10 ${
                isMobile ? "w-1.5 h-20" : "w-1 h-16 md:h-24"
              }`}
            />
            <div
              className={`absolute bottom-0 left-0 bg-gradient-to-r from-emerald-400/70 to-transparent z-10 ${
                isMobile ? "h-1.5 w-20" : "w-16 md:w-24 h-1"
              }`}
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalBannerSlider;
