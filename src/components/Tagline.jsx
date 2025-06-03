import React from "react";
import "./animation.css";
import gearbox from "../assets/gearbox.png";
const Tagline = () => {
  // Replace this URL with your video link
  const videoUrl =
    "https://res.cloudinary.com/dztx4i2re/video/upload/v1748424915/239444_large_uxdtws.mp4";

  return (
    <div className="relative w-full h-[450px] sm:h-[520px] md:h-[620px] text-white font-[Montserrat] text-center mt-4 overflow-hidden rounded-xl">
      {/* Background Video with reduced opacity */}
      <video
        className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-20"
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full z-10">
        <div className="flex justify-center mb-4 sm:mb-6">
          <img
            className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px]"
            src={gearbox}
            alt="Gearbox"
          />
        </div>

        <h1 className=" animate1 text-[24px] sm:text-[32px] md:text-[48px] lg:text-[64px] font-extrabold tracking-[0.08em] hover:text-[#df1b1b] whitespace-nowrap">
          BORROW THE BEST
        </h1>
        <h1 className="animate2 text-[24px] sm:text-[32px] md:text-[48px] lg:text-[64px] font-extrabold tracking-[0.08em] hover:text-[#df1b1b] whitespace-nowrap mt-2">
          CREATE THE REST
        </h1>
        <p className="mt-4 sm:mt-6 text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] tracking-wide font-light">
          Your Ultimate Filmmaking Gear Hub
        </p>
      </div>
    </div>
  );
};

export default Tagline;
