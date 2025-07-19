import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BuyerDasboardSidebar from "../components/BuyerDasboardSidebar";
import "../components/fonts.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const [mybooking, setMybooking] = useState([]);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://gearbox-backend-8c3f.onrender.com/api/rentrequest/requestForBuyer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMybooking(response.data);
    } catch (error) {
      console.error("Fetch Requests Error:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0C0A0B] overflow-hidden">
      <div className="relative z-10">
        <Navbar />
        <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
          {/* Sidebar */}
          <div className="w-full lg:w-60 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col items-center py-6">
               <BuyerDasboardSidebar />
        
          </div>

          {/* Main Content */}
          <div className="flex-1 flex justify-center items-start">
            <div className="w-full max-w-7xl bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-8 gap-4 mb-4 text-sm sm:text-base text-white font-[Montserrat] font-semibold">
                <span>Seller Email</span>
                <span>Item Type</span>
                <span>Item Name</span>
                <span>Location</span>
                <span>Delivery</span>
                <span>Return</span>
                <span>Payment Status</span>
                <span>Action</span>
              </div>

              <div className="w-full h-px bg-white/20 mb-4 flex flex-col"></div>

              {/* Data Row */}
              {mybooking.map((req, index) => (
                <div
                  key={index}
                  className="bg-[#d9d9d9]/10 rounded-[10px] px-4 py-3 mb-3 text-white font-light"
                >
                  {/* Mobile Layout */}
                  <div className="block sm:hidden space-y-1 text-sm">
                    <p>
                      <span className="font-semibold">Seller Email:</span>{" "}
                      {req.sellerEmail}
                    </p>
                    <p>
                      <span className="font-semibold">Item Type:</span>{" "}
                      {req.product?.itemType}
                    </p>
                    <p>
                      <span className="font-semibold">Item Name:</span>{" "}
                      {req.product?.name}
                    </p>
                    <p>
                      <span className="font-semibold">Location:</span>{" "}
                      {req.location}
                    </p>
                    <p>
                      <span className="font-semibold">Delivery:</span>{" "}
                      {new Date(req.startDate).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-semibold">Return:</span>{" "}
                      {new Date(req.endDate).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-semibold">Payment Status:</span>{" "}
                      {req.status || "Pending"}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Action:</span>
                      {req.status === "Booked" ? (
                        <span className="bg-[#0caf3a] text-white text-xs px-4 py-1 rounded-[10px]">
                          Booked
                        </span>
                      ) : req.status === "Approved" ? (
                        <>
                          <span className="bg-[#0caf3a] text-white text-xs px-4 py-1 rounded-[10px]">
                            Approved
                          </span>
                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 rounded-[10px]"
                            onClick={() =>
                              navigate(`/checkout/${req.product._id}`)
                            }
                          >
                            Checkout
                          </button>
                        </>
                      ) : req.status === "Rejected" ? (
                        <span className="bg-[#df1b1b] text-white text-xs px-4 py-1 rounded-[10px]">
                          Rejected
                        </span>
                      ) : (
                        <span className="bg-gray-500 text-white text-xs px-4 py-1 rounded-[10px]">
                          Pending
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Desktop / Tablet Layout */}
                  <div className="hidden sm:grid grid-cols-8 gap-4 items-center text-sm sm:text-base">
                    <span>{req.sellerEmail}</span>
                    <span>{req.product?.itemType}</span>
                    <span>{req.product?.name}</span>
                    <span>{req.location}</span>
                    <span>{new Date(req.startDate).toLocaleString()}</span>
                    <span>{new Date(req.endDate).toLocaleString()}</span>
                    <span>{req.status || "Pending"}</span>
                    <div className="flex gap-2">
                      {req.status === "Booked" ? (
                        <span className="bg-[#0caf3a] text-white text-xs px-4 py-1 rounded-[10px]">
                          Booked
                        </span>
                      ) : req.status === "Approved" ? (
                        <div className="flex flex-col items-start gap-1">
                          <span className="bg-[#0caf3a] text-white text-xs px-4 py-1 rounded-[10px]">
                            Approved
                          </span>
                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 rounded-[10px]"
                            onClick={() =>
                              navigate(`/checkout/${req.product._id}`)
                            }
                          >
                            Checkout
                          </button>
                        </div>
                      ) : req.status === "Rejected" ? (
                        <span className="bg-[#df1b1b] text-white text-xs px-4 py-1 rounded-[10px]">
                          Rejected
                        </span>
                      ) : (
                        <span className="bg-gray-500 text-white text-xs px-4 py-1 rounded-[10px]">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
