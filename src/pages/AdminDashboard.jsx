import React, { useEffect, useState } from "react";
import "../components/fonts.css";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import AdminSidebar from "../components/AdminSidebar";

// Chart.js imports
import { Bar as ChartJSBar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  ChartLegend
);

const AdminDashboard = () => {
  const [sellercount, setSellercount] = useState(0);
  const [buyercount, setBuyercount] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);

  const [itemTypeChartData, setItemTypeChartData] = useState({});

  const userData = [
    {
      name: "Sellers",
      count: sellercount,
    },
    {
      name: "Buyers",
      count: buyercount,
    },
  ];

  const fetchSellercount = async () => {
    try {
      const res = await axios.get(
        "https://gearbox-backend-8c3f.onrender.com/api/seller/count"
      );
      setSellercount(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBuyerCount = async () => {
    try {
      const res = await axios.get(
        "https://gearbox-backend-8c3f.onrender.com/api/buyer/count"
      );
      setBuyercount(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItemsCount = async () => {
    try {
      const response = await axios.get(
        "https://gearbox-backend-8c3f.onrender.com/api/product/count"
      );
      setItemsCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItemTypes = async () => {
    try {
      const response = await axios.get(
        "https://gearbox-backend-8c3f.onrender.com/api/product/itemtypes"
      );
      const data = response.data.itemtypes;

      const labels = data.map((item) => item._id || item.type);
      const counts = data.map((item) => item.count);

      setItemTypeChartData({
        labels,
        datasets: [
          {
            label: "Item Types Count",
            data: counts,
            text: "Roboto",
            backgroundColor: "#df1b1b",

            font: {
              family: "san sarif",
              weight: "bold",
            },
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSellercount();
    fetchBuyerCount();
    fetchItemsCount();
    fetchItemTypes();
  }, []);

  return (
    <div className="min-h-screen bg-[#2d2d2d] flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 text-white">
        <div className="flex gap-4 flex-wrap">
          <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl p-6 w-64">
            <h2 className="text-lg font-semibold tracking-wider mb-2">
              TOTAL USERS
            </h2>
            <p className="text-7xl font-bold tracking-widest text-[#df1b1b]">
              {sellercount + buyercount}
            </p>
          </div>

          <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl p-6 w-64">
            <h2 className="text-lg font-semibold tracking-wider mb-2">
              TOTAL Sellers
            </h2>
            <p className="text-5xl font-bold tracking-widest">{sellercount}</p>
          </div>

          <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl p-6 w-64">
            <h2 className="text-lg font-semibold tracking-wider mb-2">
              TOTAL Buyers
            </h2>
            <p className="text-5xl font-bold tracking-widest">{buyercount}</p>
          </div>

          <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl p-6 w-64">
            <h2 className="text-lg font-semibold tracking-wider mb-2">
              TOTAL Item Listings
            </h2>
            <p className="text-5xl font-bold tracking-widest">{itemsCount}</p>
          </div>
        </div>

        {/* Existing Recharts Bar Chart */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold tracking-wider mb-2 text-white">
            User Type Comparison
          </h2>
          <BarChart width={600} height={300} data={userData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Chart.js Horizontal Bar Chart */}
        <div className="mt-10 bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl p-6 max-w-3xl">
          <h2 className="text-xl font-bold tracking-wide mb-6 text-white font-[Montserrat]">
            Item Types Comparison
          </h2>
          {itemTypeChartData.labels ? (
            <ChartJSBar
              data={itemTypeChartData}
              options={{
                indexAxis: "y",
                responsive: true,
                animation: {
                  duration: 1000,
                  easing: "easeOutQuart",
                },
                plugins: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Products by Item Type",
                    color: "#ffffff",
                    font: {
                      family: "Montserrat",
                      size: 18,
                      weight: "bold",
                    },
                  },
                },
                elements: {
                  bar: {
                    borderRadius: 6,
                    borderSkipped: false,
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "#e5e5e5",
                      font: {
                        family: "Montserrat",
                        size: 13,
                      },
                    },
                    grid: {
                      color: "rgba(255,255,255,0.1)",
                      borderDash: [3],
                    },
                  },
                  y: {
                    ticks: {
                      color: "#ffffff",
                      font: {
                        family: "Montserrat",
                        size: 14,
                      },
                    },
                    grid: {
                      color: "rgba(255,255,255,0.05)",
                    },
                  },
                },
              }}
            />
          ) : (
            <p className="text-white font-[Montserrat]">Loading chart...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
