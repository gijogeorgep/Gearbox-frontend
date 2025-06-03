import React, { useState } from "react";
import profile from "../assets/profile_icon.png";
import notification from "../assets/notification_icon.png";
import logo from "../assets/gearboxlogo.png";
import down from "../assets/down_icon.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Updated profile click handler
  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")); // Expecting { _id, role }

    if (!token || !user) {
      alert("You must be logged in to view your profile.");
      return;
    }

    if (user.role === "buyer") {
      navigate("/buyerprofile");
    } else if (user.role === "seller") {
      navigate("/sellerprofile");
    } else {
      alert("Invalid user role.");
    }
  };

  return (
    <>
      <div className="relative">
        <div className="flex items-center justify-between px-4 md:px-20 py-2">
          <img src={logo} alt="logo" className="w-28 md:w-36" />

          <div className="hidden md:flex items-center gap-8 text-white text-xl font-light font-[Montserrat] tracking-wide">
            <Link to="/">HOME</Link>

            <Link to="/service">SERVICE</Link>
            {/* <span className="cursor-pointer" onClick={onserviceClick}>
              SERVICE
            </span> */}

            <div className="relative flex items-center">
              <span
                className="cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                LOGIN
              </span>
              <img
                className="cursor-pointer w-6 ml-1"
                src={down}
                alt="dropdown"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="w-[132px] h-[66px] absolute top-8 right-0 bg-[#2d2d2d] rounded-[10px] border border-white/10 backdrop-blur-[0px] z-50">
                  <div className="absolute top-1/2 left-[1px] w-[131px] h-px bg-white/50"></div>
                  <button className="absolute top-[9px] left-1/2 -translate-x-1/2 text-white text-sm font-light font-[Montserrat] tracking-wide">
                    <Link to="/sellerlogin">Seller</Link>
                  </button>
                  <button className="absolute bottom-[9px] left-1/2 -translate-x-1/2 text-white text-sm font-light font-[Montserrat] tracking-wide">
                    <Link to="/buyerlogin">Buyer</Link>
                  </button>
                </div>
              )}
            </div>

            <img
              src={profile}
              alt="profile icon"
              className="w-7 cursor-pointer"
              onClick={handleProfileClick}
            />
            <img src={notification} alt="notification icon" className="w-7" />
          </div>

          <div className="md:hidden">
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/menu--v1.png"
              alt="menu"
              className="w-8 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
            />
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed top-0 left-0 w-[80%] h-full bg-[#1f1f1f] text-white z-50 p-6 transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <img src={logo} alt="logo" className="w-24" />
              <img
                src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png"
                alt="close"
                className="w-6 h-6 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
            <nav className="flex flex-col gap-6 font-[Montserrat] text-base text-white/90 tracking-wide">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                HOME
              </Link>
              <span onClick={() => setIsMobileMenuOpen(false)}>SERVICE</span>
              <div className="relative">
                <span className="block mb-2">LOGIN</span>
                <div className="pl-3 flex flex-col gap-2 text-sm text-white/90">
                  <Link
                    to="/sellerlogin"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Seller
                  </Link>
                  <Link
                    to="/buyerlogin"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Buyer
                  </Link>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <img
                  src={profile}
                  alt="profile"
                  className="w-6 cursor-pointer"
                  onClick={() => {
                    handleProfileClick();
                    setIsMobileMenuOpen(false);
                  }}
                />
                <img src={notification} alt="notification" className="w-6" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
