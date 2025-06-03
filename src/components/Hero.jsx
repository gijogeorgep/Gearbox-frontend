import React, { useEffect, useState } from "react";
import heroimg from "../assets/hero_img.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  const texts = [
    "Rent premium camera equipment, accessories, and tools to bring your creative vision to life",
    "Monetize your camera gear by renting it out to filmmakers and creators while keeping full control over your equipment",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const interval = setInterval(() => {
      setFade(false); // Fade out
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setFade(true); // Fade in
      }, 500); // Delay to change text after fade out
    }, 4000); // Change text every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[563px] overflow-hidden">
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-10"
        src={heroimg}
        alt="Hero background"
      />

      {/* Centered Text */}
      <div className="absolute inset-0 flex justify-center items-center px-6">
        <p
          className={`text-center text-white text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-[montserrat] font-bold tracking-wide max-w-4xl transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {texts[currentTextIndex]}
        </p>
      </div>
    </div>
  );
};

export default Hero;
