import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";

const ServicePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      <div className="bg-[#0C0A0B] min-h-screen">
        <Navbar />
        <section className="relative py-16 px-6 ml-10 mr-10">
          {/* Background image with reduced opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-8 rounded-4xl"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dztx4i2re/image/upload/v1748544272/camera-2618321_1280_i9q0t0.jpg')",
            }}
          ></div>

          {/* Content */}
          <div className="relative max-w-4xl mx-auto text-center z-10">
            <h1
              className="text-4xl md:text-5xl font-extrabold text-white"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Our Services
            </h1>
            <p
              className="mt-4 text-lg text-[#df1b1b] max-w-xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              GearBox is your one-stop destination for renting professional
              camera equipment. Explore our services tailored to your creative
              needs.
            </p>
          </div>

          <div className="relative mt-12 grid md:grid-cols-3 gap-8 z-10 font-[Montserrat]">
            {[
              {
                title: "Camera Rentals",
                description:
                  "Rent high-quality cameras from leading brands for your next project. From DSLRs to mirrorless, we've got you covered.",
              },
              {
                title: "Gimbal & Stabilizers",
                description:
                  "Ensure smooth, cinematic shots with our range of gimbals and stabilizers. Perfect for filmmakers and vloggers.",
              },
              {
                title: "Audio & Lighting Gear",
                description:
                  "Achieve professional sound and lighting with our mics, lights, and accessories. Create your best work effortlessly.",
              },
              {
                title: "Delivery & Pickup",
                description:
                  "We deliver your gear right to your doorstep and pick it up after use. Hassle-free and reliable.",
              },
              {
                title: "Maintenance & Support",
                description:
                  "Our team ensures that all equipment is in top condition and offers 24/7 support for all your rental needs.",
              },
              {
                title: "Flexible Rental Terms",
                description:
                  "Choose from daily, weekly, or monthly rentals. We tailor our services to match your project timelines.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white/10 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
                data-aos="zoom-in"
                data-aos-delay={index * 150}
              >
                <h2
                  className="text-2xl font-semibold text-[#df1b1b]"
                  data-aos="fade-right"
                  data-aos-delay={index * 150 + 200}
                >
                  {service.title}
                </h2>
                <p
                  className="mt-3 text-gray-200"
                  data-aos="fade-left"
                  data-aos-delay={index * 150 + 300}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicePage;
