import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import CheckoutCard from "../components/CheckoutCard";

// Ensure Razorpay script is loaded
const CheckOut = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rentRequest, setRentRequest] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentRequest = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to view checkout");
          navigate("/login");
          return;
        }
        const rentResponse = await axios.get(
          `http://localhost:4000/api/rentrequest/requestForBuyer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const request = rentResponse.data.find(
          (req) => req.product._id === id && req.status === "Approved"
        );
        if (!request) {
          throw new Error("No approved rent request found for this product");
        }
        setRentRequest(request);

        // Fetch product details
        const productResponse = await axios.get(
          `http://localhost:4000/api/product/${id}`
        );
        setProduct(productResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch checkout details");
        setLoading(false);
      }
    };
    fetchRentRequest();
  }, [id, navigate]);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to complete checkout");
        return;
      }

      // Calculate total amount (same logic as CheckoutCard.jsx)
      const dayDiff = rentRequest
        ? Math.ceil(
            (new Date(rentRequest.endDate) - new Date(rentRequest.startDate)) /
              (1000 * 60 * 60 * 24)
          )
        : 1;
      const baseRate = product?.rate || 500;
      const addonCost = dayDiff > 1 ? (dayDiff - 1) * 100 : 0;
      const deliveryFee = 200;
      const cautionDeposit = product?.cautionDeposit || 0;
      const totalPayable =
        (baseRate + addonCost + deliveryFee + cautionDeposit) * 100; // Convert to paise

      // Create Razorpay order
      const response = await axios.post(
        "http://localhost:4000/api/checkout/createOrder",
        {
          rentRequestId: rentRequest._id,
          ProductId: id,
          amount: totalPayable, // Amount in paise
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { orderId, amount: orderAmount, currency } = response.data;

      // Razorpay options
      const options = {
        key: "rzp_test_QgNiku4DkATwmt", // Use env variable or fallback to test key
        amount: orderAmount,
        currency: currency,
        name: "GearBox",
        description: `Payment for renting ${product.name}`,
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post(
              "http://localhost:4000/api/checkout/verifyPayment",
              {
                rentRequestId: rentRequest._id,
                ProductId: id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (verifyResponse.data.message === "Checkout created") {
              toast.success("Payment successful! Checkout completed.");
              navigate("/mybooking");
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error) {
            toast.error(
              error.response?.data?.msg || "Failed to verify payment"
            );
          }
        },
        // prefill: {
        //   name: "Customer Name", // Replace with actual user data if available
        //   email: "customer@example.com",
        //   contact: "9999999999",
        // },
        theme: {
          color: "#df1b1b",
        },
      };

      // Initialize Razorpay
      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
      });
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to create order");
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <>
      <div className="bg-[#2d2d2d] min-h-screen text-white overflow-hidden">
        <ToastContainer />
        <Navbar />
        <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 mt-6 md:mt-10">
          <h1 className="text-2xl font-['Montserrat'] font-semibold mb-6">
            Checkout
          </h1>
          <div className="w-full max-w-md bg-white/10 rounded-[21.87px] border border-white/10 backdrop-blur-[0px] p-4 sm:p-6">
            <CheckoutCard
              product={product}
              startDate={rentRequest.startDate}
              endDate={rentRequest.endDate}
            />
            <div className="text-white mt-4 font-['Montserrat'] text-sm">
              <p>
                You selected{" "}
                {Math.ceil(
                  (new Date(rentRequest.endDate) -
                    new Date(rentRequest.startDate)) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                {Math.ceil(
                  (new Date(rentRequest.endDate) -
                    new Date(rentRequest.startDate)) /
                    (1000 * 60 * 60 * 24)
                ) === 1
                  ? "day"
                  : "days"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
                <p>
                  Your item will be delivered to you on:{" "}
                  {new Date(rentRequest.startDate).toLocaleString()}
                </p>
                <p>
                  Your item will be returned from you on:{" "}
                  {new Date(rentRequest.endDate).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              type="button"
              className="bg-[#ffffff22] text-white border border-white/30 rounded-full px-6 py-3 mt-6 w-full max-w-[250px] hover:bg-white hover:text-black transition-all duration-300"
            >
              Complete Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
