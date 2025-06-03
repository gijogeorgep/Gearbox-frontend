import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";
import "../components/fonts.css";
const AdminBuyer = () => {
  const [buyerCount, setBuyerCount] = useState();

  const fetchBuyerCount = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/buyer/count");
      setBuyerCount(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBuyerCount();
  });

  return (
    <>
      <div className="min-h-screen bg-[#2d2d2d] flex">
        <AdminSidebar />

        <main className="flex-1 p-8 text-white">
          <div className="flex gap-4 flex-wrap">
            <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl p-6 w-64">
              <h2 className="text-lg font-semibold tracking-wider mb-2">
                TOTAL Buyers
              </h2>
              <p className="text-7xl font-bold tracking-widest text-[#df1b1b]">
                {buyerCount}
              </p>
            </div>

            {/* <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl p-6 w-64">
              <h2 className="text-lg font-semibold tracking-wider mb-2">
                TOTAL Buyings
              </h2>
              <p className="text-5xl font-bold tracking-widest">{itemscount}</p>
            </div> */}
          </div>
          <div className=" flex justify-evenly mr-10 gap-20 mt-10 font-medium text-[Monsterrat]">
            <span>sl no</span>
            <span>id</span>
            <span>name</span>
            <span>items</span>
            <span>email</span>
          </div>

          <div className="w-[1200px] h-0 outline-[2px] outline-offset-[-1.50px] outline-white mt-5"></div>

          <div className="w-[900px]] h-25 bg-white/10 rounded-[13px] border border-white/10 backdrop-blur-[0px] mt-10">
            <div className=" flex justify-evenly mr-10 gap-20 mt-10 font-medium text-[Monsterrat]">
              <span>1</span>
              <span>id</span>
              <span>name</span>
              <span>items</span>
              <span>email</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminBuyer;
