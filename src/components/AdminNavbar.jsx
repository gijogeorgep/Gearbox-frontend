import React from "react";
// Rename this import since you're using 'logout' as a function name later
import logoutIcon from "../assets/logout_icon.png";
import logo from "../assets/gearboxlogo.png";
import addprofile from "../assets/addprofile_icon.png";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    const confirmLogout = window.confirm("Are You Sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("adminame");
      navigate("/adminlogin");
    }
  };

  return (
    <>
      <div className="w-full h-[54px] flex items-center justify-between px-6 border-b border-white">
        {/* Logo or Left Section (optional) */}
        <div className="flex flex-col">
          <p>admin portal</p>
          <img src={logo} alt="logo" />
        </div>

        {/* Center/Right Menu Items */}
        <div className="flex items-center space-x-8 text-white text-xl font-light font-montserrat tracking-wide">
          <span className="font-[Montserrat]">HOME</span>

          <Link to="/admindashboard">
            <span className="font-[Montserrat]">DASHBOARD</span>
          </Link>

          {/* Icon 2 */}
          <img src={addprofile} alt="profile icon" />
          {/* Icon 3 */}
          <button onClick={logout}>
            <img src={logoutIcon} alt="logout icon" onClick={logout} />
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
