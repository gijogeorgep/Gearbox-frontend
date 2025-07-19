import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../components/fonts.css";
import dashboardbg from "../assets/dashboardbg.png";
import SellerDasboardSidebar from "../components/SellerDasboardSidebar";
import { useNavigate } from "react-router-dom";

const SellerProfile = () => {
  const [sellerData, setSellerData] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/sellerlogin");
    }
  };

  useEffect(() => {
    const fetchSellerProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/sellerlogin");
        }

        const response = await axios.get(
          "https://gearbox-backend-8c3f.onrender.com/api/seller/sellerprofile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSellerData(response.data);
      } catch (err) {
        console.error("Error fetching seller profile", err);
      }
    };

    fetchSellerProfile();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0C0A0B] overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        style={{ backgroundImage: `url(${dashboardbg})` }}
      ></div>

      <div className="relative z-10">
        <Navbar />

        <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
          {/* Sidebar */}
          <div className="w-full lg:w-60 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col items-center py-6">
            {/* Profile Image */}

            {/* Sidebar Buttons */}
            <SellerDasboardSidebar />
          </div>
          {/* Profile content */}

          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-full max-w-3xl bg-white/10 p-6 sm:p-8 rounded-xl border border-white/10 backdrop-blur-sm shadow-lg text-white">
              {/* Profile photo at top center */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                {/* Profile photo */}
                <div className="relative w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden flex items-center justify-center bg-white/10 text-center">
                  {/* If no profile image, show the text */}
                  <span className="text-sm text-gray-300 px-2 text-center">
                    Add Profile Photo
                  </span>

                  {/* Upload icon */}
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 bg-white/20 p-1 rounded-full cursor-pointer hover:bg-white/40 transition duration-200"
                    title="Upload Photo"
                  >
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/ios-filled/50/FFFFFF/plus-math.png"
                      alt="Upload"
                    />
                    <input
                      type="file"
                      id="profile-upload"
                      className="hidden"
                      // Add your upload handler here
                    />
                  </label>
                </div>
              </div>

              {/* Edit and Logout icons */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                <button
                  className="p-2 rounded-full hover:bg-white/20 transition duration-200"
                  title="Edit Profile"
                >
                  <img
                    width="28"
                    height="28"
                    src="https://img.icons8.com/sf-regular/FFFFFF/48/create-new.png"
                    alt="Edit"
                  />
                </button>

                <button
                  onClick={logout}
                  className="p-2 rounded-full hover:bg-white/20 transition duration-200"
                  title="Logout"
                >
                  <img
                    width="28"
                    height="28"
                    src="https://img.icons8.com/ios-filled/50/FFFFFF/logout-rounded-up.png"
                    alt="Logout"
                  />
                </button>
              </div>

              {/* Seller Profile heading */}
              <h1 className="text-3xl font-bold text-center mb-6 mt-12">
                {" "}
                {/* added mt-12 to make space for photo */}
                Seller Profile
              </h1>

              {sellerData ? (
                <div className="space-y-3 text-center text-lg">
                  <p>
                    <span className="font-semibold text-gray-300">Name:</span>{" "}
                    {sellerData.name}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Email:</span>{" "}
                    {sellerData.email}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">
                      Username:
                    </span>{" "}
                    {sellerData.username}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Phone:</span>{" "}
                    {sellerData.phone}
                  </p>
                </div>
              ) : (
                <p className="text-center animate-pulse text-gray-300">
                  Loading...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;