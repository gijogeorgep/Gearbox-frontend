import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SellerDasboardSidebar from "../components/SellerDasboardSidebar";
import { useNavigate } from "react-router-dom";

const MyList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://gearbox-backend-8c3f.onrender.com/api/product/seller/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Cache-Control": "no-cache",
            },
          }
        );
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching seller products:", error);
      }
    };

    fetchSellerProducts();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0C0A0B] overflow-hidden">
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
        {/* Sidebar */}
        <div className="w-full lg:w-60 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col items-center py-6">
          <SellerDasboardSidebar />
        </div>

        {/* Product Cards */}
        <div className="flex-1 flex flex-wrap gap-6 justify-start items-start">
          {products.map((product) => (
            <div
              key={product._id}
              className="w-[260px] bg-gradient-to-b from-[#151515] to-[#534f4f] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 relative p-4 flex flex-col"
            >
              <img
                className="w-full h-[150px] object-cover rounded-md border border-white/20 bg-white"
                src={product.imageUrl || "https://placehold.co/260x150"}
                alt={product.name}
              />
              <div className="flex-1 mt-4 text-white text-sm font-medium font-['Montserrat'] tracking-wide line-clamp-2">
                {product.name || "Product Name"}
              </div>
              <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                {product.description || "Product Description"}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/updateitem/${product._id}`)}
                  className="flex-1 mr-2 bg-[#df1b1b] text-white rounded-md py-1.5 text-xs font-semibold transition hover:bg-[#b21616]"
                >
                  Update
                </button>
                <button className="flex-1 ml-2 bg-transparent border border-[#ffffff] text-white rounded-md py-1.5 text-xs font-semibold transition hover:bg-[#df1b1b] hover:text-white">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyList;
