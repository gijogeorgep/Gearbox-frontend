import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("adminName");
    setAdminName(name);
  }, []);

  const location = useLocation();
  const path = location.pathname;

  const isActive = (p) => path === p;
  const btnstyle = (active) =>
    `w-full h-10 rounded-md px-3 text-sm font-[montserrat] text-white ${
      active ? "bg-white/50" : "bg-white/10"
    }`;

  return (
    <>
      <aside className="w-64 bg-white/10 backdrop-blur-sm border-r border-white/10 rounded-tr-2xl rounded-br-2xl p-6 font-[montserrat]">
        <span className="text-white font-extrabold uppercase tracking-wider text-3xl">
          {adminName}
        </span>
        <nav className="space-y-6">
          <div className="flex flex-col gap-10">
            <Link to="/admindashboard">
              <button className={btnstyle(isActive("/admindashboard"))}>
                DASHBOARD
              </button>
            </Link>

            <Link to="/adminbuyer">
              <button className={btnstyle(isActive("/adminbuyer"))}>
                BUYERS
              </button>
            </Link>

            <Link to="/adminseller">
              <button className={btnstyle(isActive("/adminseller"))}>
                Sellers
              </button>
            </Link>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-lg py-2 px-6 text-white text-xl tracking-widest">
            SETTINGS
          </div>
        </nav>
        <div className="flex mt-36">
          <Link to="/adminhome">
            <img
              width="35"
              height="35"
              src="https://img.icons8.com/ios-filled/50/df1b1b/home.png"
              alt="home"
            />
          </Link>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
