import React from "react";
import { useState, useEffect } from "react";
import StarCanvas from "../components/StarCanvas";
import logo from "../assets/ReclipseLogo.png";
import "../fonts.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Land: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [showContent, setShowContent] = useState<boolean>(false);
  const [contentReady, setContentReady] = useState<boolean>(false);

  useEffect(() => {
    const targetDate = new Date("2025-10-30T00:00:00").getTime();

    const updateCountdown = (): void => {
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

  const handleAnimationComplete = (): void => {
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setContentReady(true);
      // Another small delay before showing content for smoother effect
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }, 300);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Star Canvas Background */}
      <StarCanvas onAnimationComplete={handleAnimationComplete} />

      {/* Content Overlay - Smooth fade-in after galaxy animation */}
      <div 
        className={`relative z-10 flex flex-col items-center justify-center w-full h-full px-4 transition-all duration-2000 ease-out ${
          showContent && contentReady
            ? 'opacity-100 transform scale-100' 
            : 'opacity-0 transform scale-95'
        }`}
        style={{
          transitionProperty: 'opacity, transform',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {/* Logo */}
        <div className={`h-80 md:w-[550px] w-[350px] mb-20 transition-all duration-2500 ease-out ${
          showContent ? 'animate-logo-fade-in' : 'opacity-0 transform translate-y-8'
        }`}>
          <img src={logo} alt="logo" className="animate-pulse" />
        </div>

        {/* Title */}
        <h1 className={`cinzel-decorative text-xl md:text-2xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-white via-slate-300 to-white bg-clip-text text-center -mb-12 h-32 md:-mt-20 -mt-48 transition-all duration-2000 ease-out ${
          showContent ? 'animate-title-fade-in' : 'opacity-0 transform translate-y-12'
        }`}>
         A  modern elegance for timeless traditions
        </h1>

        <p className={`cinzel-decorative text-xl md:text-2xl text-gray-300 font-bold mb-12 text-center transition-all duration-2000 ease-out ${
          showContent ? 'animate-subtitle-fade-in' : 'opacity-0 transform translate-y-8'
        }`}>
          Website Launching Soon
        </p>

        {/* Countdown Timer */}
        <div className={`flex flex-col items-center justify-center mb-8 mt-5 transition-all duration-2500 ease-out ${
          showContent ? 'animate-timer-fade-in' : 'opacity-0 transform translate-y-16'
        }`}>
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

      <style>{`       
        @keyframes fade-in-smooth {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes logo-fade-in {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes title-fade-in {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes subtitle-fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes timer-fade-in {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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

        .animate-logo-fade-in {
          animation: logo-fade-in 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
        }

        .animate-title-fade-in {
          animation: title-fade-in 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s both;
        }

        .animate-subtitle-fade-in {
          animation: subtitle-fade-in 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.9s both;
        }

        .animate-timer-fade-in {
          animation: timer-fade-in 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.2s both;
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

