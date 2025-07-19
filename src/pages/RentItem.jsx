import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import CheckoutCard from "../components/CheckoutCard";
const RentItem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://gearbox-backend-8c3f.onrender.com/api/product/${id}`
        );
        setProduct(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch product");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);



  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      toast.error("Name is required!");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      toast.error("Email is required!");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneNumber.trim()) {
      toast.error("Phone Number is required!");
      isValid = false;
    } else if (!phoneRegex.test(phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number!");
      isValid = false;
    }

    if (!locationInput.trim()) {
      toast.error("Location is required!");
      isValid = false;
    }

    const pincodeRegex = /^\d{6}$/;
    if (!pincode.trim()) {
      toast.error("Pincode is required!");
      isValid = false;
    } else if (!pincodeRegex.test(pincode)) {
      toast.error("Please enter a valid 6-digit pincode!");
      isValid = false;
    }

    if (!address.trim()) {
      toast.error("Address is required!");
      isValid = false;
    }

    if (!startDate) {
      toast.error("Start date is required!");
      isValid = false;
    }

    if (!endDate) {
      toast.error("End date is required!");
      isValid = false;
    } else if (
      startDate &&
      endDate &&
      new Date(endDate) <= new Date(startDate)
    ) {
      toast.error("End date must be after start date!");
      isValid = false;
    }

    return isValid;
  };

  const handleRentRequest = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to send a rent request");
        return;
      }

      const rentRequestData = {
        productId: product._id,
        name,
        email,
        sellerEmail: product.email,
        location: locationInput,
        startDate,
        endDate,
      };

      const response = await axios.post(
        "http://localhost:4000/api/rentrequest/request",
        rentRequestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Rent request sent successfully");
    } catch (error) {
      console.error("Error sending rent request:", error);
      toast.error(error.response?.data?.msg || "Failed to send rent request");
    }
  };

  const getDayDifference = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = e - s;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const dayDiff =
    startDate && endDate ? getDayDifference(startDate, endDate) : null;

  // Handle loading and error states
  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  



  return (
    <div className="bg-[#2d2d2d] min-h-screen text-white overflow-hidden">
      <ToastContainer />
      <Navbar />
      <div className="flex flex-col md:flex-row gap-6 px-4 sm:px-6 md:px-10 mt-6 md:mt-10">
        {/* Left Section: Image Card + UL */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
          {/* Image Card */}
          <div className="relative w-full max-w-[280px] mx-auto bg-gradient-to-b from-[#151515] to-[#3f3d3d] rounded-2xl p-4 shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out group cursor-pointer">
            <div className="overflow-hidden rounded-xl bg-white">
              <img
                src={product?.imageUrl}
                alt={product?.name}
                className="w-full h-[160px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="mt-3 text-center">
              <h2 className="text-lg font-semibold font-['Montserrat'] tracking-wide text-white">
                {product?.name || "Product Name"}
              </h2>
              <p className="text-sm font-light font-['Montserrat'] tracking-wide text-gray-300 mt-1">
                {product?.description || "Product Description"}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-center gap-1">
              <img
                width="14"
                height="14"
                src="https://img.icons8.com/deco-glyph/48/ffffff/marker.png"
                alt="location"
                className="opacity-90"
              />
              <span className="text-xs text-gray-400 font-light tracking-wide">
                {product?.location || "Location"}
              </span>
            </div>
          </div>

          <p className="text-sm">About this item</p>
          {/* UL: Feature List */}
          <ul className="text-sm list-disc list-inside text-white font-light w-full max-w-[278px] mx-auto">
            {(product?.detailedDescription || []).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <span className="text-sm">More Pictures Of Your Item</span>
          <div className="flex flex-wrap gap-4">
            <div className="relative w-[180px] bg-gradient-to-b from-[#151515] to-[#534f4f] rounded-[20px] p-3 shadow-inner shadow-[#00000040]">
              <img
                src={product?.smallImages?.[0]}
                alt={product?.smallImage1}
                className="w-full h-[90px] object-cover rounded-[15px]"
              />
            </div>
            <div className="relative w-[180px] bg-gradient-to-b from-[#151515] to-[#534f4f] rounded-[20px] p-3 shadow-inner shadow-[#00000040]">
              <img
                src={product?.smallImages?.[1]}
                alt={product?.smallImages?.[1]}
                className="w-full h-[90px] object-cover rounded-[15px]"
              />
            </div>
          </div>

          <span className="font-bold">Contact Your Seller</span>

          <div className="w-full max-w-[247.47px] h-[155px] relative mx-auto mt-6">
            <div className="w-full max-w-[247.47px] h-[109.03px] absolute top-[45.97px] bg-[#d9d9d9]/10 rounded-[7.09px] " />
            <img
              className="w-[90.33px] h-[85.56px] absolute left-1/2 transform -translate-x-1/2 top-0 rounded-full shadow-[4.09px_6.14px_2.11px_-6.14px_rgba(0,0,0,0.30)] outline outline-[4.09px] outline-[#3b3939]"
              src="https://placehold.co/90x86"
              alt="seller"
            />
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[94.60px] text-white text-[19.02px] font-semibold font-['Montserrat'] tracking-wide text-center">
              {product?.email}
            </div>

            <div className="w-[32.07px] h-[31.33px] absolute left-1/2 transform -translate-x-1/2 top-[117.59px] bg-[#d9d9d9]/10 rounded-full">
              <span>{product.phone} </span>
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/fluency-systems-filled/FFFFFF/48/phone-disconnected.png"
                alt="phone-disconnected"
              />
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material-rounded/df1b1b/24/high-priority.png"
              alt="high-priority"
            />
            <span className="font-light text-sm">
              Report an issue on your product or seller
            </span>
          </div>
        </div>
        {/* Right Big White Box */}
        <div className="w-full md:flex-1">
          <div className="w-full bg-white/10 rounded-[21.87px] border border-white/10 backdrop-blur-[0px] p-4 sm:p-6">
            <form>
              <div className="flex flex-col mb-6">
                <label className="text-white text-lg font-['Montserrat'] mb-2 tracking-wider font-medium">
                  Email
                </label>
                <input
                  type="email"
                  className="bg-transparent border-b border-white py-2 text-white focus:outline-none w-full max-w-[400px] font-light mb-6"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="text-white text-lg font-['Montserrat'] mb-2 tracking-wider font-medium">
                  Name
                </label>
                <input
                  type="text"
                  className="bg-transparent border-b border-white py-2 text-white focus:outline-none w-full max-w-[400px] font-light mb-6"
                  placeholder="Enter your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex flex-col">
                    <label className="text-white text-lg font-['Montserrat'] mb-2 tracking-wider font-medium">
                      Pincode
                    </label>
                    <input
                      type="number"
                      className="bg-transparent border-b border-white py-2 text-white focus:outline-none w-full max-w-[400px] font-light mb-6"
                      placeholder="Enter your pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-white text-lg font-['Montserrat'] mb-2 tracking-wider font-medium">
                      Location
                    </label>
                    <input
                      type="text"
                      className="bg-transparent border-b border-white py-2 text-white focus:outline-none w-full max-w-[400px] font-light mb-6"
                      placeholder="Enter your Location"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-white text-lg font-['Montserrat'] mb-2 tracking-wider font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="bg-transparent border-b border-white py-2 text-white focus:outline-none w-full max-w-[400px] font-light mb-6"
                      placeholder="Enter your Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <label className="text-white text-lg font-['Montserrat'] mb-2 tracking-wider font-medium">
                  Address
                </label>
                <textarea
                  className="bg-transparent border-b border-white py-2 text-white focus:outline-none w-full max-w-[400px] font-light mb-6 resize-none"
                  placeholder="Enter your delivery address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <div className="flex flex-col">
                    <p className="text-white font-['Montserrat'] mb-2 tracking-wider font-medium">
                      Select date for your item
                    </p>
                    <input
                      onChange={(e) => setStartDate(e.target.value)}
                      type="datetime-local"
                      className="bg-[#2d2d2d] text-white border border-white/30 rounded-md py-2 px-3 focus:outline-none w-full max-w-[250px] font-light mb-6"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-['Montserrat'] mb-2 tracking-wider font-medium">
                      Select Date and time for your item out
                    </p>
                    <input
                      onChange={(e) => setEndDate(e.target.value)}
                      type="datetime-local"
                      className="bg-[#2d2d2d] text-white border border-white/30 rounded-md py-2 px-3 focus:outline-none w-full max-w-[250px] font-light mb-6"
                    />
                  </div>
                </div>

                <CheckoutCard
                  product={product}
                  startDate={startDate}
                  endDate={endDate}
                />

                {startDate && endDate && dayDiff > 0 && (
                  <div className="text-white mt-4 font-['Montserrat'] text-sm">
                    <p>
                      You selected {dayDiff} {dayDiff === 1 ? "day" : "days"}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
                      <p>
                        Your item will be delivered to you on:{" "}
                        {new Date(startDate).toLocaleString()}
                      </p>
                      <p>
                        Your item will be returned from you on:{" "}
                        {new Date(endDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
                <button
                  onClick={handleRentRequest}
                  type="button"
                  className="bg-[#ffffff22] text-white border border-white/30 rounded-full px-6 py-3 mt-6 w-full max-w-[250px] hover:bg-white hover:text-black transition-all duration-300"
                >
                  Request Item for Rent
                </button>
                <span>
                  You will be notified when the buyer accepts your request
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-[500.01px] h-[281px] relative ml-96 mt-10">
        <iframe
          className="w-[499.56px] h-[281px] left-0 top-0 absolute rounded-[20.65px] z-10"
          src={`https://www.youtube.com/embed/${product?.tutorialLink}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="w-[500.01px] h-[281px] left-0 top-0 absolute bg-[#030101]/60 rounded-[20.66px] pointer-events-none z-20" />
      </div>
    </div>
  );
};

export default RentItem;
