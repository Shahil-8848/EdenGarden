import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Krishna2 from "./Krishna2.jpg";
import Plus2 from "./Plus2Pics6.jpg";
export default function ElearningHero() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 relative">
      <div className="flex flex-col md:flex-row gap-20 items-center">
        {/* Left side with images and decorative elements */}
        <div className="relative w-full md:w-1/2">
          {/* Main image */}
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg transform rotate-[-3deg]">
            <img
              src={Plus2}
              alt="Smiling woman with glasses"
              className="w-full h-auto"
            />

            {/* Experience badge */}
            <div className="absolute bottom-0 right-0 bg-purple-600 text-white px-4 py-2 rounded-tl-lg">
              <div className="text-3xl font-bold">16</div>
              <div className="text-xs font-medium leading-tight">
                Years of
                <br />
                Experience
              </div>
            </div>
          </div>

          {/* Secondary image */}
          <div className="absolute top-1/4 right-0 w-3/5 rounded-2xl overflow-hidden shadow-lg z-20 transform translate-x-8 translate-y-16">
            <img
              src={Krishna2}
              alt="Online learning session"
              className="w-full h-auto"
            />
          </div>

          {/* Dotted airplane path */}
          <svg
            className="absolute top-0 left-0 w-full h-full z-0"
            viewBox="0 0 500 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50,300 Q100,250 150,280 Q200,310 250,250 Q300,190 350,220 Q400,250 450,200"
              stroke="#E0E0E0"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
            />
            <path d="M450,200 l-15,-15 l5,15 l-5,15 z" fill="#FF6B6B" />
          </svg>

          {/* Curved lines */}
          <svg
            className="absolute bottom-0 left-0 w-full h-full z-0"
            viewBox="0 0 500 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20,350 C80,320 120,380 180,350 C240,320 280,380 340,350"
              stroke="#E0E0E0"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Right side with text content */}
        <div className="w-full md:w-10/12">
          <div className="text-teal-500 font-medium mb-2">GET TO KNOW US</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Grow your skills learn
            <br />
            with us from anywhere
          </h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed eiusmod
            tempor incididunt labore dolore magna aliquam ipsum ad minim. Sed
            duis augue, commodo ornare filis non, efficitur molestie metus
            pharetra molestie.
          </p>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-rose-100 p-1">
                <CheckCircle className="h-5 w-5 text-rose-500" />
              </div>
              <span className="font-medium">Expert trainers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-violet-100 p-1">
                <CheckCircle className="h-5 w-5 text-violet-500" />
              </div>
              <span className="font-medium">Online learning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-amber-100 p-1">
                <CheckCircle className="h-5 w-5 text-amber-500" />
              </div>
              <span className="font-medium">Lifetime access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-teal-100 p-1">
                <CheckCircle className="h-5 w-5 text-teal-500" />
              </div>
              <span className="font-medium">Great results</span>
            </div>
          </div>

          <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6">
            DISCOVER NOW
          </Button>
        </div>
      </div>
    </div>
  );
}
