import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const BuyerDasboardSidebar = () => {
  const [BuyerData, setBuyerData] = useState("");

  const fetchBuyerPrfoile = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token is:", token);
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
    fetchBuyerPrfoile();
  }, []);

  const location = useLocation();
  const path = location.pathname;

  const isActive = (p) => path === p;
  const btnStyle = (active) =>
    `w-full h-10 rounded-md px-3 text-sm  font-[monsterrat] text-white ${
      active ? "bg-white/50" : "bg-white/10"
    }`;

  return (
    <>
      <div className="mt-3 text-white text-base sm:text-lg font-semibold font-[montserrat] text-center">
        {BuyerData?.name}
      </div>

      <div className="mt-6  flex flex-col gap-5 w-full px-4">
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
