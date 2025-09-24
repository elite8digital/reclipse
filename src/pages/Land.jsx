import React from "react";
import { useState, useEffect } from "react";
import StarCanvas from "../components/StarCanvas";
import logo from "../assets/ReclipseLogo.png";
import "../fonts.css";

const Land = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2025-10-16T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnimationComplete = () => {
    setShowContent(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Star Canvas Background */}
      <StarCanvas onAnimationComplete={handleAnimationComplete} />

      {/* Content Overlay - Only show after galaxy animation */}
      <div 
        className={`relative z-10 flex flex-col items-center justify-center w-full h-full px-4 transition-all duration-1500 ease-out ${
          showContent 
            ? 'opacity-100 transform scale-100' 
            : 'opacity-0 transform scale-0 pointer-events-none'
        }`}
      >
        {/* Logo */}
        <div className="animate-pulse h-80 md:w-[550px] w-[350px] mb-20">
          <img src={logo} alt="logo" />
        </div>

        {/* Title */}
        <h1 className="cinzel-decorative text-xl md:text-2xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-white via-slate-300 to-white bg-clip-text text-center -mb-12 h-32 animate-fade-in md:-mt-20 -mt-48">
         A  modern elegance for timeless traditions
        </h1>

        <p className="cinzel-decorative text-xl md:text-2xl text-gray-300 font-bold mb-12 text-center animate-fade-in-delay">
          Website Launching Soon
        </p>

        {/* Countdown Timer */}
        <div className="flex flex-col items-center justify-center mb-8 animate-fade-in-delay mt-5">
          {/* Timer Display with Separators */}
          <div className="flex items-center justify-center text-4xl md:text-6xl lg:text-8xl font-mono font-bold text-white tracking-wider mb-4">
            {/* Days */}
            <div className="flex flex-col items-center">
              <span className="text-white">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
            </div>
            
            {/* Separator */}
            <span className="text-gray-500 mx-3 md:mx-6 animate-pulse text-3xl md:text-5xl lg:text-7xl">
              :
            </span>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <span className="text-white">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
            </div>
            
            {/* Separator */}
            <span className="text-gray-500 mx-3 md:mx-6 animate-pulse text-3xl md:text-5xl lg:text-7xl">
              :
            </span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <span className="text-white">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
            </div>
            
            {/* Separator */}
            <span className="text-gray-500 mx-3 md:mx-6 animate-pulse text-3xl md:text-5xl lg:text-7xl">
              :
            </span>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <span className="text-white animate-pulse-gentle">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
          
          {/* Labels */}
          <div className="flex items-center justify-center text-xs md:text-sm lg:text-base text-gray-400 uppercase tracking-wider font-light">
            <span className="text-center min-w-[4rem] md:min-w-[6rem] lg:min-w-[8rem]">
              Days
            </span>
            <span className="mx-3 md:mx-6 opacity-0">:</span>
            <span className="text-center min-w-[4rem] md:min-w-[6rem] lg:min-w-[8rem]">
              Hours
            </span>
            <span className="mx-3 md:mx-6 opacity-0">:</span>
            <span className="text-center min-w-[4rem] md:min-w-[6rem] lg:min-w-[8rem]">
              Minutes
            </span>
            <span className="mx-3 md:mx-6 opacity-0">:</span>
            <span className="text-center min-w-[4rem] md:min-w-[6rem] lg:min-w-[8rem]">
              Seconds
            </span>
          </div>
        </div>

        {/* Launch Date */}
        {/* <p className="text-gray-400 text-sm md:text-base text-center animate-fade-in-delay-2 font-light">
          October 16, 2025 • 12:00 AM
        </p> */}

        {/* Optional notification signup */}
        {/* <div className="mt-8 animate-fade-in-delay-3">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Notify Me
          </button>
        </div> */}
      </div>

      <style jsx>{`       
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.6);
          }
        }

        .animate-fade-in {
          animation: scale-up 2s cubic-bezier(0.175, 0.885, 0.32, 1.1) 0.2s both;
        }

        .animate-fade-in-delay {
          animation: scale-up 2s cubic-bezier(0.175, 0.885, 0.32, 1.1) 0.5s both;
        }

        .animate-fade-in-delay-2 {
          animation: scale-up 2s cubic-bezier(0.175, 0.885, 0.32, 1.1) 0.8s both;
        }

        .animate-fade-in-delay-3 {
          animation: scale-up 2s cubic-bezier(0.175, 0.885, 0.32, 1.1) 1.1s both;
        }

        .group:hover .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Pulse animation for seconds */
        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }

        @keyframes pulse-gentle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};


export default Land;
