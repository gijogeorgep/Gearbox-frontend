import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../components/fonts.css";
import { Link } from "react-router-dom";
import sellerpic from "../assets/sellerform.jpg";
import axios from "axios";

const SellerSignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailVerified === false) {
      alert("Please verify your email before submitting.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/seller/create",
        {
          name,
          username,
          email,
          phone,
          password,
          confirmPassword,
        }
      );
      if (response.data.msg === "account created succesfuly") {
        alert("Account created successfully!");
        // Optionally redirect or reset form here
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      alert("Error creating account. Please try again.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/seller/verify-otp",
        {
          email,
          otp,
        }
      );
      if (response.data) {
        setEmailVerified(true);
        alert("Email verified successfully!");
      } else {
        alert("The OTP verification failed.");
      }
    } catch (error) {
      console.log(error);
      alert("Error verifying OTP. Please try again.");
    }
  };

  const handleVerifyEmail = async () => {
    try {
      await axios.post("http://localhost:4000/api/seller/sent-otp", {
        name,
        username,
        email,
      });
      setOtpStep(true);
      alert("OTP sent to your email. Please enter the OTP to verify.");
    } catch (error) {
      console.log(error);
      alert("Error sending OTP. Please try again.");
    }
  };

  return (
    <div className="bg-[#2d2d2d] min-h-screen text-white overflow-auto">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen px-4 py-10">
        <div className="flex flex-col md:flex-row border border-white/10 rounded-[13px] overflow-hidden backdrop-blur-[0px] max-w-[900px] w-full">
          <img
            src={sellerpic}
            alt="Signup Illustration"
            className="w-full md:w-[300px] h-[250px] md:h-auto object-cover rounded-t-[13px] md:rounded-t-none md:rounded-l-[13px]"
          />

          <div className="w-full md:w-[600px] bg-white/10 px-6 sm:px-10 py-8 rounded-b-[13px] md:rounded-b-none md:rounded-r-[13px] flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-semibold font-[montserrat] mb-6 tracking-wide text-center md:text-left text-white">
              SELLER SIGN UP
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center md:items-start w-full"
            >
              <div className="w-full mb-4">
                <label className="text-white text-sm mb-1 tracking-wider font-medium font-[montserrat]">
                  NAME/HUB
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your name or hub"
                  className="bg-transparent border-b border-white py-2 text-white focus:outline-none w-full font-thin"
                />
              </div>

              <div className="w-full mb-4">
                <label className="text-white text-sm mb-1 tracking-wider font-medium font-[montserrat]">
                  USERNAME
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Enter your Username"
                  className="bg-transparent border-b border-white py-2 text-white focus:outline-none w-full font-light"
                />
              </div>

              <div className="w-full mb-4">
                <label className="text-white text-sm mb-1 tracking-wider font-medium font-[montserrat]">
                  EMAIL
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-b border-white py-2 text-white focus:outline-none w-full font-light"
                />
              </div>

              <div className="w-full mb-4">
                <button
                  type="button"
                  onClick={handleVerifyEmail}
                  className="w-full py-2 bg-[#df1b1b] text-white font-medium rounded-md"
                >
                  Verify Email
                </button>
              </div>

              {otpStep && (
                <>
                  <div className="w-full mb-4">
                    <label className="text-white text-sm mb-1 tracking-wider font-medium font-[montserrat]">
                      Enter OTP
                    </label>
                    <input
                      onChange={(e) => setOtp(e.target.value)}
                      type="text"
                      placeholder="Enter OTP sent to your email"
                      className="bg-transparent border-b border-white py-2 text-white focus:outline-none w-full font-light"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleOtpSubmit}
                    className="w-full py-2 mb-4 bg-[#df1b1b] text-white font-medium rounded-md"
                  >
                    Verify OTP
                  </button>
                </>
              )}

              <div className="w-full mb-4">
                <label className="text-white text-sm mb-1 tracking-wider font-medium font-[montserrat]">
                  PHONE
                </label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="Enter your phone number"
                  className="bg-transparent border-b border-white py-2 text-white focus:outline-none w-full font-thin"
                />
              </div>

              <div className="w-full mb-4">
                <label className="text-white text-sm mb-1 tracking-wider font-medium font-[montserrat]">
                  PASSWORD
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter password"
                  className="bg-transparent border-b border-white py-2 text-white focus:outline-none w-full font-light"
                />
              </div>

              <div className="w-full mb-4">
                <label className="text-white text-sm mb-1 tracking-wider font-medium font-[montserrat]">
                  CONFIRM PASSWORD
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm password"
                  className="bg-transparent border-b border-white py-2 text-white focus:outline-none w-full font-thin"
                />
              </div>

              <button
                type="submit"
                className="w-[130px] h-[40px] mt-4 bg-[#df1b1b] text-white text-sm font-light font-[montserrat] tracking-wide rounded-[10px] ml-40"
              >
                Submit
              </button>
            </form>

            <div className="mt-6 text-sm font-light font-[montserrat] text-center w-full">
              <p className="text-white mb-1">Already have an account?</p>
              <Link
                to="/sellerlogin"
                className="text-[#df1b1b] hover:underline font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSignUp;
