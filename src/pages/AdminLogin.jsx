import React, { useState } from "react";
import logo from "../assets/gearboxlogo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/login",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("adminName", response.data.doc.username);

      console.log(response.data.doc);
      alert(response.data.msg);
      navigate("/adminhome");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#2d2d2d] min-h-screen flex flex-col">
      <div className="w-full h-16 md:h-20 bg-white/10 backdrop-blur-sm flex items-center justify-between px-4 md:px-8 border-b border-white/10">
        <img
          className="w-40
           h-6
        "
          src={logo}
          alt="logo"
        />
        <div className="text-white text-xl font-bold">Admin Portal</div>
      </div>

      {/* Login Form Container */}
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white/10 rounded-lg border border-white/10 backdrop-blur p-4 sm:p-6 md:p-8">
          <h2 className="text-white text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">
            Admin Login
          </h2>

          <form className="flex flex-col gap-4 sm:gap-6">
            <div className="relative">
              <label className="text-white text-sm mb-1 block">Username</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                type="text"
                className="w-full bg-transparent border-b border-white/30 outline-none text-white py-2 transition-colors font-light"
              />
            </div>

            <div className="relative">
              <label className="text-white text-sm mb-1 block">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
                className="w-full bg-transparent border-b border-white/30 outline-none text-white py-2 transition-colors font-light"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handlesubmit}
                type="submit"
                className="w-[139.86px] h-[42.27px] bg-[#df1b1b] rounded-[10.44px] text-white hover:bg-[#c01818] transition-colors"
              >
                Login
              </button>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
