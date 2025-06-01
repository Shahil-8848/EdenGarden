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
  avatar: string;
  grade?: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
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
    title: "The Future of Education: How AI is Transforming Learning",
    slug: "future-education-ai-transforming-learning",
    excerpt:
      "Discover how artificial intelligence is revolutionizing the classroom experience, creating personalized learning paths, and preparing students for tomorrow's challenges.",
    content:
      "Artificial Intelligence is no longer a concept confined to science fiction movies. Today, it's actively reshaping how we learn, teach, and interact with educational content. From personalized learning algorithms to intelligent tutoring systems, AI is creating unprecedented opportunities for students to excel in their academic journey.",
    fullContent: `Artificial Intelligence is no longer a concept confined to science fiction movies. Today, it's actively reshaping how we learn, teach, and interact with educational content. From personalized learning algorithms to intelligent tutoring systems, AI is creating unprecedented opportunities for students to excel in their academic journey.

## The Current State of AI in Education

Our school has been at the forefront of integrating AI technologies into the classroom. We've implemented adaptive learning platforms that adjust to each student's pace and learning style. These systems analyze how students interact with content, identifying areas where they struggle and providing additional resources automatically.

## Personalized Learning Paths

One of the most exciting developments is the creation of personalized learning paths. AI algorithms analyze student performance data to create customized curricula that adapt in real-time. This means that if a student excels in mathematics but struggles with literature, the system can provide more challenging math problems while offering additional support for reading comprehension.

## Intelligent Tutoring Systems

Our AI-powered tutoring systems provide 24/7 support to students. These systems can answer questions, provide explanations, and even generate practice problems tailored to individual needs. The technology has proven particularly effective in subjects like mathematics and science, where step-by-step problem-solving is crucial.

## Preparing for the Future

As we look ahead, it's clear that AI literacy will be as important as traditional literacy. Our school is preparing students not just to use AI tools, but to understand how they work and how to develop them. We've introduced coding classes that focus on machine learning and data science, giving students the skills they'll need in tomorrow's job market.

## Challenges and Considerations

While AI offers tremendous opportunities, we must also address the challenges it presents. Privacy concerns, the digital divide, and the need for human connection in education are all important considerations. Our approach has been to use AI as a tool to enhance human teaching, not replace it.

The future of education is bright, and AI is helping us create learning experiences that are more personalized, engaging, and effective than ever before. As students, we have the opportunity to be part of this transformation and help shape how future generations will learn.`,
    coverImage:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    date: "May 15, 2024",
    readTime: "8 min read",
    featured: true,
    categories: ["Technology", "Education", "Innovation"],
    author: {
      name: "Ankit Karki",
      avatar:
        "https://scontent.fbir7-1.fna.fbcdn.net/v/t39.30808-6/465128776_9061754170521479_2687488796146001787_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=GyxHUqmxcfIQ7kNvwEi7flc&_nc_oc=Adn0zhhfWIsMMiMn8KJZ989r1smPWmwv-ZskGLQFlkI1XMO9N54Hryu7yZBrXxecafk&_nc_zt=23&_nc_ht=scontent.fbir7-1.fna&_nc_gid=PSV1PUsDnGFrE_MUa0YO4w&oh=00_AfK9I3ykqrVVaJXuC-YE3QnR8H0bYLDwlovi6S2jkMFcvQ&oe=68408D52",
      grade: "10th Grade",
    },
  },
  {
    id: "2",
    title: "Sustainability in Action: Our School's Green Revolution",
    slug: "sustainability-action-school-green-revolution",
    excerpt:
      "Join us on our journey to create a more sustainable campus. From solar panels to zero-waste initiatives, see how students are leading environmental change.",
    content:
      "Our school's commitment to sustainability goes beyond just talking about environmental issues – we're taking concrete action to create a greener, more sustainable campus. Over the past year, our student-led environmental committee has implemented numerous initiatives that have significantly reduced our carbon footprint.",
    fullContent: `Our school's commitment to sustainability goes beyond just talking about environmental issues – we're taking concrete action to create a greener, more sustainable campus. Over the past year, our student-led environmental committee has implemented numerous initiatives that have significantly reduced our carbon footprint.

## Solar Power Initiative

The most visible change on our campus is the installation of solar panels on the main building's roof. This project, which was proposed and advocated for by students, now provides 40% of our school's electricity needs. The panels not only reduce our environmental impact but also serve as a real-world learning tool for our physics and environmental science classes.

## Zero-Waste Cafeteria Program

Our cafeteria has undergone a complete transformation. We've eliminated single-use plastics, implemented a comprehensive composting program, and partnered with local farms to source organic, locally-grown ingredients. Students now bring reusable containers, and any food waste is composted and used in our school garden.

## Green Transportation

We've launched a bike-to-school program that has reduced car traffic by 30%. The school installed secure bike racks and created safe cycling routes. Additionally, we've organized carpooling networks and advocated for better public transportation connections to our campus.

## Campus Garden and Biodiversity

Our school garden has become a centerpiece of our sustainability efforts. Students grow vegetables that are used in the cafeteria, and we've created habitats for local wildlife. The garden serves as an outdoor classroom where students learn about ecology, botany, and sustainable agriculture.

## Energy Conservation

Through student-led awareness campaigns, we've reduced our energy consumption by 25%. Simple actions like turning off lights, using natural lighting when possible, and optimizing heating and cooling systems have made a significant impact.

## Student Leadership

What makes our sustainability program special is that it's entirely student-driven. Our environmental committee meets weekly to plan new initiatives, monitor our progress, and educate the school community about environmental issues. We've proven that young people can be powerful agents of change.

## Looking Forward

Our next goals include achieving carbon neutrality by 2026, expanding our renewable energy capacity, and creating partnerships with other schools to share our sustainability model. We believe that environmental education and action should be at the heart of every school's mission.

The green revolution at our school shows that sustainability isn't just about the future – it's about the actions we take today. Every student has the power to make a difference, and together, we're creating a more sustainable world.`,
    coverImage:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
    date: "April 28, 2024",
    readTime: "6 min read",
    featured: true,
    categories: ["Environment", "Student Projects", "Sustainability"],
    author: {
      name: "Soniya Subba",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      grade: "11th Grade",
    },
  },
  {
    id: "3",
    title: "The Science of Memory: Unlocking Better Study Techniques",
    slug: "science-memory-unlocking-study-techniques",
    excerpt:
      "Explore neuroscience-backed strategies that can transform your learning experience and boost academic performance.",
    content:
      "Understanding how memory works can revolutionize your study habits and academic performance.",
    fullContent:
      "Understanding how memory works can revolutionize your study habits and academic performance. Through neuroscience research, we now know specific techniques that can dramatically improve retention and recall.",
    coverImage:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    date: "April 10, 2024",
    readTime: "7 min read",
    featured: false,
    categories: ["Academic", "Psychology", "Study Tips"],
    author: {
      name: "Krishna Raut",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      grade: "7th Grade",
    },
  },
  {
    id: "4",
    title: "Championship Dreams: Our Basketball Team's Inspiring Journey",
    slug: "championship-dreams-basketball-team-journey",
    excerpt:
      "Follow our team's incredible path to victory, filled with challenges, teamwork, and unforgettable moments.",
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
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      grade: "12th Grade",
    },
  },
  {
    id: "5",
    title: "Digital Storytelling: The Evolution of Student Journalism",
    slug: "digital-storytelling-evolution-student-journalism",
    excerpt:
      "How modern technology is empowering student voices and creating new opportunities for authentic storytelling.",
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
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      grade: "11th Grade",
    },
  },
  {
    id: "6",
    title: "Art as Identity: Celebrating Cultural Diversity Through Creativity",
    slug: "art-identity-celebrating-cultural-diversity",
    excerpt:
      "Our multicultural art exhibition showcases the beautiful tapestry of student heritage and creative expression.",
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
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
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

        <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
          {post.excerpt}
        </p>

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
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-4 ring-green-200">
              <img
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            </div>
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

          <p className="text-gray-600 line-clamp-3 mb-6 flex-grow leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-green-100">
                <img
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
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
