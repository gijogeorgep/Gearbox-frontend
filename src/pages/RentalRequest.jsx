import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SellerDasboardSidebar from "../components/SellerDasboardSidebar";
import "../components/fonts.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RentalRequest = () => {
  const [requests, setRequests] = useState([]);

  const fetchRentRequest = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://gearbox-backend-8c3f.onrender.com/api/rentrequest/requestForSeller",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch rent requests");
    }
  };

  useEffect(() => {
    fetchRentRequest();
    requestCount();
  }, []);

  const requestCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/rentrequest/count"
      );
      console.log(response.count);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRequestStatus = async (requestId, status) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${status.toLowerCase()} this rent request?`
    );
    if (!confirmAction) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:4000/api/rentrequest/update/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Rent request ${status.toLowerCase()} successfully!`);
      fetchRentRequest(); // Refresh list after update
    } catch (error) {
      console.error("Update Request Error:", error);
      toast.error("Failed to update rent request");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0C0A0B] overflow-hidden">
      {/* Toast Container */}
      <ToastContainer />

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Top Navbar */}
        <Navbar />

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
          {/* Sidebar */}
          <div className="w-full lg:w-60 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col items-center py-6">
            {/* Profile Image */}

            {/* Sidebar Buttons */}
            <SellerDasboardSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex justify-center items-center px-3">
            <div className="w-full max-w-7xl bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col">
              {/* Table Headers */}
              <div className="grid grid-cols-8 gap-4 mb-4 text-sm sm:text-base text-white font-[Montserrat] font-semibold">
                <span>Name</span>
                <span>Item Type</span>
                <span>Item Name</span>
                <span>Location</span>
                <span>Phone No</span>
                <span>Delivery</span>
                <span>Return</span>
                <span>Status</span>
              </div>

              <div className="w-full h-px bg-white/20 mb-4"></div>

              {/* Request Rows */}
              {requests.map((req, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-8 gap-4 items-center text-sm sm:text-base text-white font-light bg-[#d9d9d9]/10 rounded-[10px] px-4 py-3 mb-3 ${
                    req.paymentStatus === "Paid"
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                >
                  <span>{req.name}</span>
                  <span>{req.product?.itemType}</span>
                  <span>{req.product?.name}</span>
                  <span>{req.location}</span>
                  <span>{req.phoneNumber}</span>
                  <span>{new Date(req.startDate).toLocaleString()}</span>
                  <span>{new Date(req.endDate).toLocaleString()}</span>

                  {/* Approve / Reject Buttons */}
                  <div className="flex flex-col gap-1 text-center">
                    {req.paymentStatus === "Paid" ? (
                      <span className="text-xs font-semibold">
                        {req.status} (Paid)
                      </span>
                    ) : req.status === "Approved" ? (
                      <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-md font-semibold">
                        Approved
                      </span>
                    ) : req.status === "Rejected" ? (
                      <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-md font-semibold">
                        Rejected
                      </span>
                    ) : (
                      <>
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-md font-semibold"
                          onClick={() =>
                            updateRequestStatus(req._id, "Approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-md font-semibold"
                          onClick={() =>
                            updateRequestStatus(req._id, "Rejected")
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
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

export default RentalRequest;
