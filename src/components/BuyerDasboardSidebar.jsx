import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import InitialsAvatar from "react-initials-avatar";

const BuyerDasboardSidebar = () => {
  const [BuyerData, setBuyerData] = useState("");

  const fetchBuyerProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://gearbox-backend-8c3f.onrender.com/api/buyer/buyerprofile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBuyerData(response.data.buyer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBuyerProfile();
  }, []);

  const location = useLocation();
  const path = location.pathname;

  const isActive = (p) => path === p;
  const btnStyle = (active) =>
    `w-full h-10 rounded-md px-3 text-sm font-[monsterrat] text-white ${
      active ? "bg-white/50" : "bg-white/10"
    }`;

  return (
    <>
      <div className="mt-3 text-white text-base sm:text-lg font-semibold font-[montserrat] text-center">
        {BuyerData?.name}
      </div>
      <div className="mt-4 flex items-center justify-center">
        <InitialsAvatar
          name={BuyerData?.name || "User"}
          className="rounded-full bg-white/10 text-[#df1b1b] w-20 h-20 flex items-center justify-center text-3xl font-bold"
        />
      </div>

      {/* <img
          src="https://placehold.co/120x120"
          alt="Profile"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full outline-[4px] outline-[#3b3939]"
        /> */}
      <div className="mt-6 flex flex-col gap-5 w-full px-4">
        <Link to="/buyerprofile">
          <button className={btnStyle(isActive("/buyerprofile"))}>
            PROFILE
          </button>
        </Link>

        <Link to="/mybooking">
          <button className={btnStyle(isActive("/mybooking"))}>
            My Bookings
          </button>
        </Link>
      </div>
    </>
  );
};

export default BuyerDasboardSidebar;
