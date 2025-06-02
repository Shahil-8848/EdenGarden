// import React, { useEffect, useRef, useState } from "react";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { gsap } from "gsap";

// interface EnhancedBannerProps {
//   bannerImages: string[];
// }

// const BannerSlider: React.FC<EnhancedBannerProps> = ({ bannerImages }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const bannerRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const subtitleRef = useRef<HTMLParagraphElement>(null);
//   const overlayRef = useRef<HTMLDivElement>(null);

//   // Auto-slide functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) =>
//         prevSlide === bannerImages.length - 1 ? 0 : prevSlide + 1
//       );
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [bannerImages.length]);

//   // GSAP animations
//   useEffect(() => {
//     if (
//       imageRef.current &&
//       titleRef.current &&
//       subtitleRef.current &&
//       overlayRef.current
//     ) {
//       // Reset and animate image
//       gsap.set(imageRef.current, { scale: 1.2, opacity: 0 });
//       gsap.set(overlayRef.current, { opacity: 0 });
//       gsap.set([titleRef.current, subtitleRef.current], {
//         y: 50,
//         opacity: 0,
//       });

//       const tl = gsap.timeline();

//       // Image zoom and fade in
//       tl.to(imageRef.current, {
//         scale: 1.05,
//         opacity: 1,
//         duration: 1.2,
//         ease: "power2.out",
//       })
//         // Overlay fade in
//         .to(
//           overlayRef.current,
//           {
//             opacity: 1,
//             duration: 0.8,
//             ease: "power2.out",
//           },
//           "-=0.6"
//         )
//         // Text animations
//         .to(
//           titleRef.current,
//           {
//             y: 0,
//             opacity: 1,
//             duration: 0.8,
//             ease: "power3.out",
//           },
//           "-=0.4"
//         )
//         .to(
//           subtitleRef.current,
//           {
//             y: 0,
//             opacity: 1,
//             duration: 0.8,
//             ease: "power3.out",
//           },
//           "-=0.6"
//         );

//       // Continuous subtle zoom effect
//       gsap.to(imageRef.current, {
//         scale: 1.08,
//         duration: 8,
//         ease: "power1.inOut",
//         yoyo: true,
//         repeat: -1,
//       });
//     }
//   }, [currentSlide]);

//   const nextSlide = () => {
//     setCurrentSlide(
//       currentSlide === bannerImages.length - 1 ? 0 : currentSlide + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentSlide(
//       currentSlide === 0 ? bannerImages.length - 1 : currentSlide - 1
//     );
//   };

//   return (
//     <section ref={bannerRef} className="py-6">
//       <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
//         <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-green-200/30">
//           <AspectRatio ratio={16 / 5} className="bg-slate-900">
//             {/* Background Image */}
//             <div
//               ref={imageRef}
//               className="absolute inset-0 bg-cover bg-center will-change-transform"
//               style={{
//                 backgroundImage: `url(${bannerImages[currentSlide]})`,
//                 transformOrigin: "center center",
//               }}
//             />

//             {/* Gradient Overlays */}
//             <div
//               ref={overlayRef}
//               className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-slate-900/50 to-blue-900/70"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

//             {/* Content */}
//             <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 px-6">
//               <h2
//                 ref={titleRef}
//                 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-center tracking-tight"
//                 style={{
//                   fontFamily: "Inter, system-ui, sans-serif",
//                   textShadow: "0 4px 20px rgba(0,0,0,0.5)",
//                   background:
//                     "linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   backgroundClip: "text",
//                 }}
//               >
//                 Eden Garden
//               </h2>
//               <p
//                 ref={subtitleRef}
//                 className="text-xl md:text-3xl lg:text-4xl font-light text-center max-w-4xl leading-relaxed"
//                 style={{
//                   fontFamily: "Inter, system-ui, sans-serif",
//                   textShadow: "0 2px 10px rgba(0,0,0,0.7)",
//                 }}
//               >
//                 Nurturing minds, shaping futures through excellence in education
//               </p>

//               {/* Call to Action */}
//             </div>

//             {/* Navigation Dots */}
//             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
//               {bannerImages.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`w-4 h-4 rounded-full transition-all duration-300 ${
//                     currentSlide === index
//                       ? "bg-white scale-125 shadow-lg"
//                       : "bg-white/50 hover:bg-white/70"
//                   }`}
//                   onClick={() => setCurrentSlide(index)}
//                 />
//               ))}
//             </div>

//             {/* Navigation Arrows */}
//             <button
//               className="absolute top-1/2 left-6 -translate-y-1/2 w-14 h-14 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20"
//               onClick={prevSlide}
//             >
//               <ChevronLeft size={28} />
//             </button>
//             <button
//               className="absolute top-1/2 right-6 -translate-y-1/2 w-14 h-14 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20"
//               onClick={nextSlide}
//             >
//               <ChevronRight size={28} />
//             </button>
//           </AspectRatio>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BannerSlider;

"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

interface EnhancedBannerProps {
  bannerImages: string[];
}

const BannerSliderRefined: React.FC<EnhancedBannerProps> = ({
  bannerImages,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === bannerImages.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  // Enhanced GSAP animations with zoom effects
  useEffect(() => {
    if (
      imageRef.current &&
      titleRef.current &&
      subtitleRef.current &&
      overlayRef.current
    ) {
      // Reset and animate image with enhanced zoom
      gsap.set(imageRef.current, { scale: 1.3, opacity: 0 });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set([titleRef.current, subtitleRef.current], {
        y: 60,
        opacity: 0,
      });

      const tl = gsap.timeline();

      // Enhanced image zoom in effect
      tl.to(imageRef.current, {
        scale: 1.05,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      })
        // Overlay fade in
        .to(
          overlayRef.current,
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8"
        )
        // Text animations with stagger
        .to(
          titleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7"
        );

      // Continuous subtle zoom effect with breathing motion
      gsap.to(imageRef.current, {
        scale: 1.08,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === bannerImages.length - 1 ? 0 : currentSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? bannerImages.length - 1 : currentSlide - 1
    );
  };

  return (
    <section ref={bannerRef} className="py-6">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-green-500/20 border border-white/10">
          <AspectRatio ratio={16 / 5} className="bg-slate-900">
            {/* Background Image with enhanced effects */}
            <img
              ref={imageRef}
              src={bannerImages[currentSlide] || "/placeholder.svg"}
              alt="School Banner"
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{
                transformOrigin: "center center",
                filter: "brightness(0.9) contrast(1.1) saturate(1.1)",
              }}
            />

            {/* Enhanced Gradient Overlays */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-slate-900/40 to-blue-900/60 z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-transparent to-emerald-900/30 z-10" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20 px-6">
              <h2
                ref={titleRef}
                className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-center tracking-tight"
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  textShadow:
                    "0 4px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.4)",
                  color: "#fff", // Set text color to white
                  background: "none", // Remove gradient background
                  WebkitBackgroundClip: "initial",
                  WebkitTextFillColor: "initial",
                  backgroundClip: "initial",
                }}
              >
                Eden Garden
              </h2>
              <p
                ref={subtitleRef}
                className="text-xl md:text-3xl lg:text-4xl font-light text-center max-w-4xl leading-relaxed"
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  textShadow:
                    "0 3px 15px rgba(0,0,0,0.8), 0 1px 5px rgba(0,0,0,0.5)",
                  color: "#f8fafc",
                }}
              >
                Nurturing minds, shaping futures through excellence in education
              </p>
            </div>

            {/* Professional Navigation Dots - Bottom Left */}
            <div className="absolute bottom-8 left-8 flex space-x-3 z-30">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  className={`relative w-3 h-3 rounded-full transition-all duration-500 ease-out group ${
                    currentSlide === index
                      ? "bg-white scale-125 shadow-lg shadow-white/30"
                      : "bg-green-600 hover:bg-white/70 hover:scale-110"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    boxShadow:
                      currentSlide === index
                        ? "0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(16,185,129,0.3), inset 0 0 10px rgba(255,255,255,0.2)"
                        : "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Active dot glow effect */}
                  {currentSlide === index && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-green-300 opacity-30 animate-pulse" />
                  )}

                  {/* Hover ring effect */}
                  <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300" />
                </button>
              ))}
            </div>

            {/* Enhanced Navigation Arrows */}
            <button
              className="absolute top-1/2 left-8 -translate-y-1/2 w-16 h-16 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-30 border border-white/10 hover:border-white/20 group"
              onClick={prevSlide}
              aria-label="Previous slide"
              style={{
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <ChevronLeft
                size={28}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
            </button>
            <button
              className="absolute top-1/2 right-8 -translate-y-1/2 w-16 h-16 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-30 border border-white/10 hover:border-white/20 group"
              onClick={nextSlide}
              aria-label="Next slide"
              style={{
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <ChevronRight
                size={28}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>

            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent z-10" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/5 to-transparent z-10" />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default BannerSliderRefined;
