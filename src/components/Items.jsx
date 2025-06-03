import React, { useState } from "react";
import camera from "../assets/camera.png";
import tripod from "../assets/tripod.png";
import lens from "../assets/lens.png";
import gimbal from "../assets/gimbal.png";
import light from "../assets/light.png";
import "./fonts.css";

const items = [
  { src: camera, alt: "Camera", label: "CAMERA" },
  { src: tripod, alt: "Tripod", label: "TRIPOD" },
  { src: gimbal, alt: "Gimbal", label: "GIMBAL" },
  { src: lens, alt: "Lens", label: "LENS" },
  { src: light, alt: "Light", label: "LIGHT" },
];

const Items = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4">
      {/* Informational Text */}
      <div className=" textitem text-white text-xl sm:text-2xl font-normal font-['Montserrat'] tracking-wide text-center mb-6">
        We Provide These High-Quality Photography Tools
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-2xl">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center group w-full flex-shrink-0"
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <img
                    className="w-full h-40 sm:h-44 md:h-48 rounded-2xl object-contain"
                    src={item.src}
                    alt={item.alt}
                  />
                </div>
                <div className="mt-4 text-white text-lg sm:text-xl font-normal font-['Montserrat'] tracking-wide text-center">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
        >
          →
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {items.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Items;
