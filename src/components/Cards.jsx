import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./fonts.css";
import Aos from "aos";
const Cards = ({ product }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleRentClick = () => {
    console.log("Navigating with product _id:", product._id);
    if (!product._id) {
      console.error("Product _id is undefined:", product);
      return;
    }
    navigate(`/rentitem/${product._id}`, { state: { product } });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.src = "https://via.placeholder.com/278x160?text=Image+Error";
  };

  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div
      className="group w-full max-w-[278px] h-auto relative rounded-2xl bg-gradient-to-br from-[#2a2a2a] via-[#1f1f1f] to-[#0f0f0f] p-5 mx-auto shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.02] border border-gray-700/30"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {/* Product Image Container with Enhanced Styling */}
      <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-white shadow-inner">
        {/* Loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 animate-pulse">
            <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Main Image */}
        <img
          src={
            product.imageUrl ||
            "https://via.placeholder.com/278x160/2a2a2a/ffffff?text=No+Image"
          }
          alt={product.name}
          className={`w-full h-full object-contain transition-all duration-500 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } group-hover:scale-110`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Image Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Floating Badge for Premium Look */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-white text-xs font-medium">NEW</span>
        </div>
      </div>

      {/* Content Container with Better Spacing */}
      <div className="flex flex-col flex-grow mt-3">
        {/* Product Name & Description with Better Typography */}
        <div className="text-center mb-3">
          <h3 className="text-white text-sm sm:text-base font-semibold font-[montserrat] leading-tight tracking-wide mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-300 text-xs font-light leading-relaxed line-clamp-1">
            {product.description || "Premium quality item"}
          </p>
        </div>

        {/* Location with Enhanced Icon - Removed gray background */}
        <div className="flex items-center gap-2 mb-3 px-2 py-1.5">
          <div className="flex-shrink-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <img
              width="10"
              height="10"
              src="https://img.icons8.com/deco-glyph/48/ffffff/marker.png"
              alt="location"
              className="opacity-90"
            />
          </div>
          <span className="text-gray-200 text-xs sm:text-sm font-light font-[montserrat] tracking-wide truncate">
            {product.location || "Location Available"}
          </span>
        </div>

        {/* Price and Rent Button with Enhanced Design */}
        <div className="flex justify-between items-center mt-auto">
          {/* Price Section with Better Visual Hierarchy */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg px-2.5 py-1.5 border border-green-500/30">
            <img
              width="16"
              height="16"
              src="https://img.icons8.com/material-rounded/24/ffffff/rupee.png"
              alt="rupee"
              className="opacity-90"
            />
            <div className="flex flex-col leading-none">
              <div className="text-white text-base sm:text-lg font-bold font-[montserrat] tracking-wider">
                {product.rate || "---"}
              </div>
              <div className="text-green-300 text-[9px] sm:text-[10px] font-light font-[montserrat] tracking-wider">
                per day
              </div>
            </div>
          </div>

          {/* Enhanced Rent Button */}
          <button
            onClick={handleRentClick}
            className="relative bg-gradient-to-r from-[#df1b1b] to-[#c41e3a] rounded-lg px-4 py-2 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:from-[#c41e3a] hover:to-[#df1b1b] transition-all duration-300 transform hover:scale-105 active:scale-95 group/btn"
          >
            <span className="text-white text-sm font-semibold font-[montserrat] tracking-wide relative z-10">
              RENT
            </span>
            {/* Button shine effect */}
            <div className="absolute inset-0  transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
