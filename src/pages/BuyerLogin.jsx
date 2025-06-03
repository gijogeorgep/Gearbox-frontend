import React, { useState } from "react";
import Navbar from "../components/Navbar";
import buyerpic from "../assets/buyerform.png";
import "../components/fonts.css";
import { Link } from "react-router-dom";
import axios from "axios";

const BuyerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/buyer/login",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.doc.name,
          username: response.data.doc.username,
          role: "buyer", // or "seller", or "buyer"
        })
      );

      console.log(response.data.doc);
      alert(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-[#2d2d2d] min-h-screen text-white overflow-hidden">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)] px-4">
          <div className="flex flex-col md:flex-row rounded-[13px] border border-white/10 backdrop-blur-[0px] overflow-hidden">
            {/* Left: Form */}
            <div className="w-full md:w-[400px] h-auto md:h-[450px] bg-white/10 rounded-t-[13px] md:rounded-tl-[13px] md:rounded-bl-[13px] px-8 py-8 flex flex-col justify-center items-start">
              <h2 className="text-white text-xl font-semibold font-[montserrat] mb-6  ml-20 tracking-wide">
                BUYER LOGIN
              </h2>

              <label className="text-white text-lg font-[montserrat] mb-2 tracking-wider font-medium">
                USERNAME
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="bg-transparent border-b border-white mb-6 py-2 text-white focus:outline-none w-[250px] font-light"
                placeholder="Enter your username"
              />

              <label className="text-white text-lg font-medium font-[montserrat] mb-2 tracking-wider">
                PASSWORD
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="bg-transparent border-b border-white mb-6 py-2 text-white focus:outline-none w-[250px] font-light"
                placeholder="Enter your password"
              />

              <button
                onClick={handleSubmit}
                className="w-[130px] h-[40px] ml-20 mt-4 bg-[#df1b1b] text-white text-sm font-light font-[montserrat] tracking-wide rounded-[10px]"
              >
                LOGIN
              </button>

              <div className="mt-6 text-sm font-light font-[montserrat] text-center w-full">
                <p className="text-white mb-1">Don't have an account ?</p>
                <Link
                  to="/buyersignup"
                  className="text-[#df1b1b] hover:underline font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <img
              className="w-full md:w-[250px] h-[250px] md:h-[450px] object-cover rounded-b-[13px] md:rounded-tr-[13px] md:rounded-br-[13px]"
              src={buyerpic}
              alt="Login Illustration"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerLogin;
