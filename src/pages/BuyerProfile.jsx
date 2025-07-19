import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/fonts.css";
import dashboardbg from "../assets/dashboardbg.png";
import Navbar from "../components/Navbar";
import BuyerDasboardSidebar from "../components/BuyerDasboardSidebar";

const BuyerProfile = () => {
  const [buyerData, setBuyerData] = useState();
  const navigate = useNavigate();

  const fetchBuyerProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/buyerlogin");
        return;
      }

      const response = await axios.get(
        "https://gearbox-backend-8c3f.onrender.com/api/buyer/buyerprofile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBuyerData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    const confirmLogout = window.confirm("Are You Sure You Want To logout");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/buyerlogin");
    }
  };

 

  useEffect(() => {
    fetchBuyerProfile();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0C0A0B] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        style={{ backgroundImage: `url(${dashboardbg})` }}
      ></div>

      <div className="relative z-10">
        <Navbar />
        <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
          <div className="w-full lg:w-60 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col items-center py-6">
            <BuyerDasboardSidebar />
          </div>

          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-full h-auto min-h-[500px] max-w-4xl bg-white/10 p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col justify-center items-center space-y-6 text-white">
              <div className="absolute top-2 right-4">
                <img
                  onClick={logout}
                  width="28"
                  height="28"
                  src="https://img.icons8.com/ios-filled/50/FFFFFF/logout-rounded-up.png"
                  alt="logout"
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                />
              </div>

              <h1 className="text-2xl font-semibold">Buyer Profile</h1>

              <div className="flex flex-col items-center space-y-4">
              
              </div>

              {buyerData ? (
                <div className="space-y-3 text-center">
                  <p className="text-lg">
                    <strong>Name:</strong> {buyerData?.buyer?.name}
                  </p>
                  <p className="text-lg">
                    <strong>Email:</strong> {buyerData?.buyer?.email}
                  </p>
                  <p className="text-lg">
                    <strong>Username:</strong> {buyerData?.buyer?.username}
                  </p>
                  <p className="text-lg">
                    <strong>Phone:</strong> {buyerData?.buyer?.phone}
                  </p>
                  {buyerData?.buyer?.profileUrl && (
                    <p className="text-lg">
                      <strong>Profile URL:</strong>{" "}
                      <a
                        href={buyerData.buyer.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline break-all"
                      >
                        {buyerData.buyer.profileUrl}
                      </a>
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <p>Loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
