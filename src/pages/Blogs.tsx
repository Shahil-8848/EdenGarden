"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Types
interface Author {
  name: string;
  // avatar: string;
  grade?: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;

  content: string;
  fullContent: string;
  coverImage: string;
  date: string;
  readTime: string;
  featured: boolean;
  categories: string[];
  author: Author;
}

// Sample Data with full content
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The beaty of being yourself",
    slug: "future-education-ai-transforming-learning",

    content: `In this world, everyone is trying to copy someone else. We see people on social media, in school and even in movies and we start thinking we have to be like them to be loved or accepted. But the truth is the most beautiful thing you can ever be is 'yourself'.
Each one of us is unique. We all have different talents dreams and stories. When we try to be someone else but that different talents, stories and thoughts that make us who we are.
Being yourself means accepting who you are and being proud of it. When we try to be someone we lose our real identity. But when we are true to ourself, we feel happy and confident.
So let's stop conmparing ourself with others and start loving who we are. Remember, you were born to stand out not to fit
`,
    fullContent: `In this world, everyone is trying to copy someone else. We see people on social media, in school and even in movies and we start thinking we have to be like them to be loved or accepted. But the truth is the most beautiful thing you can ever be is 'yourself'.`,
    coverImage:
      "https://www.sisterandsoul.com.au/cdn/shop/articles/carolina-heza-zwPYmB1GlNE-unsplash_1024x.jpg?v=1696811119",
    date: "November 11, 2025",
    readTime: "8 min read",
    featured: true,
    categories: ["Personal", "Health"],
    author: {
      name: "Dristi Majhi",

      grade: "9th Grade",
    },
  },
  {
    id: "2",
    title: "Why It's Okay to be Different",
    slug: "",

    content: `Have you even looked around and felt like you don't quite fit in? Maybe your hairstyle is different, your accent isn't the same, or you just think differently from others. I used to feel that way too like I had to be liked by everyone else to be accepted. But with time, I realized something important  being different isn't wrong- it's what makes us special.
Think about it—if everyone looked, talked, and acted the same, life would be so boring. Our world is beautiful because it's full of different people, ideas and creatures. Each person brings something unique.
Being different means you have your own story, your own voice and your own way of seeing the world. Maybe you've more creative, quite, funny or curious – that's your strength.
In the End, our differences are not something to be ashamed of—they are what make the world shine a little brighter.
`,
    fullContent: ``,
    coverImage:
      "https://www.emp-online.com/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw91127bc6/images/4/5/1/1/451151d.jpg?sfrm=png",
    date: "April 28, 2025",
    readTime: "6 min read",
    featured: true,
    categories: ["Environment", "Student Projects", "Sustainability"],
    author: {
      name: "Salina Rai",

      grade: "9th Grade",
    },
  },
  {
    id: "3",
    title: "The Science of Memory: Unlocking Better Study Techniques",
    slug: "science-memory-unlocking-study-techniques",

    content:
      "Understanding how memory works can revolutionize your study habits and academic performance.",
    fullContent:
      "Understanding how memory works can revolutionize your study habits and academic performance. Through neuroscience research, we now know specific techniques that can dramatically improve retention and recall.",
    coverImage:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    date: "April 10, 2025",
    readTime: "7 min read",
    featured: false,
    categories: ["Academic", "Psychology", "Study Tips"],
    author: {
      name: "Krishna Raut",

      grade: "7th Grade",
    },
  },
  {
    id: "4",
    title: "Championship Dreams: Our Basketball Team's Inspiring Journey",
    slug: "championship-dreams-basketball-team-journey",

    content:
      "Our basketball team's journey to the state championship was filled with challenges, growth, and incredible teamwork.",
    fullContent:
      "Our basketball team's journey to the state championship was filled with challenges, growth, and incredible teamwork that brought our entire school community together.",
    coverImage:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
    date: "March 22, 2024",
    readTime: "5 min read",
    featured: false,
    categories: ["Sports", "School Events", "Teamwork"],
    author: {
      name: "James Rodriguez",

      grade: "12th Grade",
    },
  },
  {
    id: "5",
    title: "Digital Storytelling: The Evolution of Student Journalism",
    slug: "digital-storytelling-evolution-student-journalism",

    content:
      "Student journalism is evolving rapidly with new digital tools and platforms.",
    fullContent:
      "Student journalism is evolving rapidly with new digital tools and platforms that allow for more creative and impactful storytelling than ever before.",
    coverImage:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop",
    date: "March 8, 2024",
    readTime: "6 min read",
    featured: false,
    categories: ["Journalism", "Technology", "Media"],
    author: {
      name: "Aisha Patel",

      grade: "11th Grade",
    },
  },
  {
    id: "6",
    title: "Art as Identity: Celebrating Cultural Diversity Through Creativity",
    slug: "art-identity-celebrating-cultural-diversity",

    content:
      "Art has always been a powerful medium for expressing identity and culture.",
    fullContent:
      "Art has always been a powerful medium for expressing identity and culture, and our recent multicultural exhibition demonstrated the incredible diversity within our school community.",
    coverImage:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
    date: "February 14, 2024",
    readTime: "4 min read",
    featured: false,
    categories: ["Arts", "Culture", "Diversity"],
    author: {
      name: "David Kim",

      grade: "9th Grade",
    },
  },
];

// Badge Component
const Badge: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}> = ({ children, className = "", variant = "default" }) => {
  const baseClasses =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors";
  const variantClasses =
    variant === "outline"
      ? "border border-green-300 bg-white text-green-700 hover:bg-green-50"
      : "bg-green-100 text-green-800";

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

// Button Component
const Button: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}> = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  onClick,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantClasses =
    variant === "outline"
      ? "border border-green-300 bg-white text-green-700 hover:bg-green-50 focus:ring-green-500"
      : "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500";

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Card Components
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Icons (simplified SVG icons)
const Calendar: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const Clock: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ChevronDown: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const ChevronUp: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 15l7-7 7 7"
    />
  </svg>
);

// Featured Blog Card Component with expandable content
const FeaturedBlogCard: React.FC<{
  post: BlogPost;
  reversed?: boolean;
  index: number;
}> = ({ post, reversed = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        gsap.to(contentRef.current, {
          height: "auto",
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(contentRef.current, {
          height: "auto",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  }, [isExpanded]);

  const formatContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h3
            key={index}
            className="text-2xl font-bold text-green-800 mt-8 mb-4"
          >
            {paragraph.replace("## ", "")}
          </h3>
        );
      }
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex flex-col ${
        reversed ? "lg:flex-row-reverse" : "lg:flex-row"
      } gap-8 lg:gap-12 items-start`}
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
          <div className="featured-image relative aspect-[4/3] overflow-hidden">
            <img
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <Badge className="absolute top-6 left-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold px-4 py-2">
            Featured
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 content-section">
        <div className="flex gap-3 mb-4">
          {post.categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 font-medium"
            >
              {category}
            </Badge>
          ))}
        </div>

        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
          {post.title}
        </h3>

        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            {post.date}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            {post.readTime}
          </div>
        </div>

        {/* Expandable Content */}
        <div ref={contentRef} className="overflow-hidden">
          <div className="prose prose-lg max-w-none">
            {isExpanded ? (
              <div className="space-y-4">{formatContent(post.fullContent)}</div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{post.content}</p>
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-full group transition-all duration-300"
        >
          {isExpanded ? (
            <>
              Read Less
              <ChevronUp className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
            </>
          ) : (
            <>
              Read More
              <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </>
          )}
        </Button>

        {/* Author Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-4 ring-green-200"></div>
            <div>
              <p className="font-semibold text-gray-900">{post.author.name}</p>
              {post.author.grade && (
                <p className="text-sm text-gray-500">{post.author.grade}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Blog Card Component
const BlogCard: React.FC<{ post: BlogPost; index: number }> = ({
  post,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "bottom 15%",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef}>
      <Card className="overflow-hidden h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group bg-white/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <CardContent className="p-6 flex flex-col h-[calc(100%-12rem)]">
          <div className="flex gap-2 mb-4">
            {post.categories.slice(0, 2).map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 text-xs font-medium"
              >
                {category}
              </Badge>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 transition-all duration-300">
            {post.title}
          </h3>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-green-100"></div>
              <span className="text-sm font-medium text-gray-700">
                {post.author.name}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {post.date}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {post.readTime}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Category Section Component
const CategorySection: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(posts.flatMap((post) => post.categories))),
  ];

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.categories.includes(selectedCategory));

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent mb-6">
            Explore by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Browse through different topics and find stories that interest you
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                    : "bg-white hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 border-green-300"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Blog Component
const Blog: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Animate featured blog images
      (gsap.utils.toArray(".featured-image") as Element[]).forEach((image) => {
        gsap.fromTo(
          image,
          {
            scale: 1.2,
            opacity: 0.8,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: image,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          }
        );
      });

      // Animate content sections
      (gsap.utils.toArray(".content-section") as HTMLElement[]).forEach(
        (section) => {
          gsap.fromTo(
            section,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "bottom 15%",
              },
            }
          );
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 2);
  const categoryPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Student{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-lime-300">
              Voices
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover inspiring stories, innovative ideas, and creative
            expressions from our talented student community
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-50 to-transparent"></div>
      </div>

      {/* Featured Posts */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Featured Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Highlighting exceptional work from our student writers
          </p>
        </div>

        <div className="space-y-20">
          {featuredPosts.map((post, index) => (
            <FeaturedBlogCard
              key={post.id}
              post={post}
              reversed={index % 2 === 1}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Category Sections */}
      <CategorySection posts={categoryPosts} />
    </div>
  );
};

export default Blog;
