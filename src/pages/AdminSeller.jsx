import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";

const AdminSeller = () => {
  const [sellercount, setSellercount] = useState("");
  const [itemsCount, setItemsCount] = useState();
  const [sellers, setSellers] = useState([]);

  const fetchSellercount = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/seller/count");
      setSellercount(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItemsCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/product/count"
      );
      setItemsCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllSellers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/product/sellerproducts-admin"
      );
      setSellers(response.data.sellers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSellercount();
    fetchItemsCount();
    fetchAllSellers();
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex text-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* Stats */}
        <div className="flex flex-wrap gap-6 mb-10">
          <div className="flex-1 min-w-[200px] bg-[#2b2b2b] border border-[#3a3a3a] rounded-lg p-6 text-center shadow-sm">
            <h2 className="text-sm font-medium text-gray-300 mb-1 uppercase tracking-wider">
              Total Sellers
            </h2>
            <p className="text-4xl font-bold text-[#ff4d4d]">{sellercount}</p>
          </div>

          <div className="flex-1 min-w-[200px] bg-[#2b2b2b] border border-[#3a3a3a] rounded-lg p-6 text-center shadow-sm">
            <h2 className="text-sm font-medium text-gray-300 mb-1 uppercase tracking-wider">
              Total Items
            </h2>
            <p className="text-4xl font-bold text-[#4dff4d]">{itemsCount}</p>
          </div>
        </div>

        {/* Header */}
        <div className="flex gap-6 text-gray-300 font-semibold border-b border-[#3a3a3a] pb-2 uppercase tracking-wide text-sm">
          <div className="w-10 text-center">SL No</div>
          <div className="flex-1">Username</div>
          <div className="flex-1">Item Types</div>
          <div className="flex-1">Item Names</div>
          <div className="flex-1">Email</div>
          <div className="flex-1 mr-10">Phone number</div>
        </div>

        {/* Seller List */}
        <div className="mt-4 flex flex-col gap-4">
          {sellers.length > 0 ? (
            sellers.map((seller, index) => (
              <div
                key={seller.sellerId || index}
                className="flex gap-6 items-start bg-[#2b2b2b] border border-[#3a3a3a] rounded-lg p-4 hover:bg-[#333] transition-colors shadow-xs shadow-white/20"
              >
                {/* Serial Number */}
                <div className="w-10 text-center font-semibold text-gray-400">
                  {index + 1}
                </div>

                {/* Username */}
                <div className="flex-1 font-medium">
                  {seller.sellerUsername || "N/A"}
                  <img
                    width="48"
                    height="48"
                    src="https://img.icons8.com/color/96/user-male-circle--v1.png"
                    alt="user-male-circle--v1"
                  />
                </div>

                {/* Item Types */}
                <div className="flex-1">
                  {seller.products && seller.products.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-200">
                      {seller.products.map((p, idx) => (
                        <li key={idx}>{p.itemType || "N/A"}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>

                {/* Item Names */}
                <div className="flex-1">
                  {seller.products && seller.products.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-200">
                      {seller.products.map((p, idx) => (
                        <li key={idx}>{p.productName || "N/A"}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex-1">{seller.sellerEmail || "N/A"}</div>

                <div className="flex-1">{seller.sellerPhone}</div>

                <img
                  width="25"
                  height="25"
                  src="https://img.icons8.com/color/96/cancel-2--v1.png"
                  alt="cancel-2--v1"
                  title="block seller"
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">No sellers found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminSeller;
