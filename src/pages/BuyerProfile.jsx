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
      }
      console.log("token is:", token);

      const response = await axios.get(
        "http://localhost:4000/api/buyer/buyerprofile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBuyerData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBuyerProfile();
  }, []);

  const logout = () => {
    const confirmLogout = window.confirm("Are You Sure You Want To logout");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/buyerlogin");
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-[#0C0A0B] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
          style={{ backgroundImage: `url(${dashboardbg})` }}
        ></div>

        <div className="relative z-10">
          <Navbar />
          <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
            <div className="w-full lg:w-60 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col items-center py-6">
              <img
                src="https://placehold.co/120x120"
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full outline-[4px] outline-[#3b3939]"
              />

              <BuyerDasboardSidebar />
            </div>

            <div className="flex-1 flex justify-center items-center">
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] max-w-4xl bg-white/10 p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col justify-center items-center space-y-4 text-white">
                {/* Logout positioned absolutely inside the white box */}
                <div className="absolute top-2 right-4">
                  <div className="flex flex-col ">
                    <img
                      onClick={logout}
                      width="28"
                      height="28"
                      src="https://img.icons8.com/ios-filled/50/FFFFFF/logout-rounded-up.png"
                      alt="logout-rounded-up"
                    />
                  </div>
                </div>

                <h1 className="text-2xl font-semibold">Buyer Profile</h1>

                {buyerData ? (
                  <div className="space-y-2 text-center">
                    <p>
                      <strong>Name:</strong> {buyerData.buyer.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {buyerData.buyer.email}
                    </p>
                    <p>
                      <strong>Username:</strong> {buyerData.buyer.username}
                    </p>
                    <p>
                      <strong>Phone:</strong> {buyerData.buyer.phone}
                    </p>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerProfile;
