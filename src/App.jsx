import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminSignUp from "./pages/AdminSignUp";
import AdminHome from "./pages/AdminHome";
import BuyerLogin from "./pages/BuyerLogin";
import Homepage from "./pages/Homepage";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { SellerProtectRoute } from "./components/ProtectedRoute";

import UserContext from "./context/UserContext";
import Admincontext from "./context/AdminContext";

import { UserProvider } from "./context/UserContext";
import BuyerSignUp from "./pages/BuyerSignUp";
import SellerLogin from "./pages/SellerLogin";
import SellerSignUp from "./pages/SellerSignUp";
import SellerProfile from "./pages/SellerProfile";
import SellItem from "./pages/SellItem";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSeller from "./pages/AdminSeller";
import RentItem from "./pages/RentItem";
import MyList from "./pages/MyList";
import RentalRequest from "./pages/RentalRequest";
import UpdateItem from "./pages/UpdateItem";
import BuyerProfile from "./pages/BuyerProfile";
import MyBooking from "./pages/MyBooking";
import AdminBuyer from "./pages/AdminBuyer";
import ReturnPolicy from "./pages/ReturnPolicy";
import CheckOut from "./pages/CheckOut";
import ServicePage from "./pages/ServicePage";     

function App() {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return setIsLoading(false);
      const response = await axios.get("http://localhost:4000/api/admin/home", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmin(response.data.doc);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };



  useEffect(() => {
    fetchAdmin();
    // fetchSeller();
  }, []);

  return (
    <>
      {/* <UserContext.Provider value={{ buyer, setBuyer, seller, setSeller }}> */}
      <UserProvider>
        <Admincontext.Provider value={{ admin, setAdmin, isLoading }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route path="adminsignup" element={<AdminSignUp />} />

              <Route
                path="adminhome"
                element={
                  <ProtectedRoute>
                    <AdminHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admindashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="/adminseller" element={<AdminSeller />} />
              <Route path="/adminbuyer" element={<AdminBuyer />} />

              <Route path="buyerlogin" element={<BuyerLogin />} />
              <Route path="buyersignup" element={<BuyerSignUp />} />
              <Route path="rentitem/:id" element={<RentItem />} />
              <Route path="/buyerprofile" element={<BuyerProfile />} />
              <Route path="/mybooking" element={<MyBooking />} />

              <Route path="sellerlogin" element={<SellerLogin />} />
              <Route path="sellersignup" element={<SellerSignUp />} />

              <Route
                path="sellerprofile"
                element={
                  <SellerProtectRoute>
                    <SellerProfile />
                  </SellerProtectRoute>
                }
              />

              <Route
                path="sellitems"
                element={
                  <SellerProtectRoute>
                    <SellItem />
                  </SellerProtectRoute>
                }
              />

              <Route path="/updateitem/:itemId" element={<UpdateItem />} />

              <Route path="mylist" element={<MyList />} />
              <Route path="rentalrequest" element={<RentalRequest />} />

              <Route path="/checkout/:id" element={<CheckOut />} />

              <Route path="/returnpolicy" element={<ReturnPolicy />} />
              <Route path="/service" element={<ServicePage />} />
            </Routes>
          </BrowserRouter>
        </Admincontext.Provider>
      </UserProvider>

      {/* </UserContext.Provider> */}
    </>
  );
}

export default App;
