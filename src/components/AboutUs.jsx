import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div
      className="transition-all bg-white/10 py-8 px-4 sm:px-6 md:px-8 relative min-h-[600px] mx-4 md:mx-10 rounded-4xl overflow-hidden"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 rounded-4xl"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/9c/e0/4b/9ce04b3252697e73ace9b6f554d1e011.jpg')",
        }}
      ></div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-end py-10">
        {/* Left-side Image */}
        <div className="transition-all flex justify-center md:justify-start w-full md:w-1/2">
          <img
            src="https://res.cloudinary.com/dztx4i2re/image/upload/v1748524641/aboust_us_gearbox_boy-removebg-preview_rijqfn.png"
            alt="GearBox Boy"
            className="w-2/3 sm:w-1/2 md:w-full max-w-sm object-contain transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            data-aos="slide-right"
            data-aos-delay="300"
            data-aos-duration="1000"
          />
        </div>

        {/* Right-side Text */}
        <div className="flex-1 text-center md:text-left w-full md:w-1/2">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-4 text-white"
            data-aos="fade-down"
            data-aos-delay="500"
            data-aos-duration="1000"
          >
            About GearBox
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg mb-4 text-gray-200"
            data-aos="fade-left"
            data-aos-delay="700"
            data-aos-duration="1000"
          >
            At <span className="font-semibold text-red-600">GearBox</span>,
            we're passionate about empowering creators, photographers, and
            videographers to bring their visions to life. We provide a curated
            selection of high-quality camera gear, from cameras and lenses to
            tripods and lighting equipment – all available to rent at affordable
            rates.
          </p>
          <p
            className="text-sm sm:text-base md:text-lg mb-4 text-gray-200"
            data-aos="fade-left"
            data-aos-delay="900"
            data-aos-duration="1000"
          >
            Founded by a team of passionate creatives, GearBox combines years of
            experience in the film and photography industry with a mission to
            make professional equipment accessible to everyone.
          </p>
          <p
            className="text-sm sm:text-base md:text-lg text-gray-200"
            data-aos="fade-left"
            data-aos-delay="1100"
            data-aos-duration="1000"
          >
            Whether you're an individual creator or a production hub, GearBox is
            here to support your creative journey. Our easy-to-use platform
            ensures you find the perfect gear for your project, and our
            dedicated team ensures it arrives safely at your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
