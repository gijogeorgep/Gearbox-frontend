import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "react-initials-avatar";
import "react-initials-avatar/lib/ReactInitialsAvatar.css";

const SellerDasboardSidebar = () => {
  const [sellerData, setSellerData] = useState();

  useEffect(() => {
    const fetchSellerProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        const response = await axios.get(
          "https://gearbox-backend-8c3f.onrender.com/api/seller/sellerprofile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSellerData(response.data);
      } catch (err) {
        console.error("Error fetching seller profile", err);
      }
    };

    fetchSellerProfile();
  }, []);

  const location = useLocation();
  const path = location.pathname;

  const isActive = (p) => path === p;
  const btnStyle = (active) =>
    `w-full h-10 rounded-md px-3 text-sm font-[montserrat] text-white ${
      active ? "bg-white/50" : "bg-white/10"
    }`;
  return (
    <>
      <div className="flex items-center justify-center w-24 h-24 mx-auto">
        {sellerData?.name ? (
          <Avatar
            name={sellerData.name}
            size={96}
            rounded
            fontSize={40}
            color="#fff"
            backgroundColor="#3b82f6"
          />
        ) : (
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-300 text-gray-500 text-4xl font-bold">
            <img
              width="96"
              height="96"
              src="https://img.icons8.com/color/96/test-account.png"
              alt="test-account"
            />
          </div>
        )}
      </div>
      <div className="mt-3 text-white text-base sm:text-lg font-semibold font-[montserrat] text-center">
        {sellerData?.name}
      </div>

      <div className="mt-6 flex flex-col gap-5 w-full px-4">
        <Link to="/sellerprofile">
          <button className={btnStyle(isActive("/sellerprofile"))}>
            PROFILE
          </button>
        </Link>

        <Link to="/sellitems">
          <button className={btnStyle(isActive("/sellitems"))}>
            SELL ITEMS
          </button>
        </Link>

        <Link to="/mylist">
          <button className={btnStyle(isActive("/mylist"))}>MY LIST</button>
        </Link>

        <Link to="/rentalrequest">
          <button className={btnStyle(isActive("/rentalrequest"))}>
            <span>RENTAL REQUESTS</span>
            <span className="w-5 h-5 ml-20 bg-[#df1b1b] text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
              1
            </span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default SellerDasboardSidebar;
