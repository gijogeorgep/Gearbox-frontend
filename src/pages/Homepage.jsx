import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Tagline from "../components/Tagline";
import Hero from "../components/Hero";
import Items from "../components/Items";
import FilterItem from "../components/FilterItem";
import Cards from "../components/Cards";
import axios from "axios";
import Footer from "../components/Footer";

import AboutUs from "../components/AboutUs";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    itemType: "",
    brand: "",
  });

  // Handle filter updates from FilterItem component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://gearbox-backend-8c3f.onrender.com/api/product/all"
      );
      console.log(res.data);
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const serviceRef = useRef(null);

  const handleScrollToService = () => {
    if (serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on filters
  const filteredProducts = products.filter((product) => {
    const matchesName =
      filters.name === "" ||
      product.name.toLowerCase().includes(filters.name.toLowerCase());

    const matchesLocation =
      filters.location === "" ||
      product.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesItemType =
      filters.itemType === "" ||
      product.itemType.toLowerCase() === filters.itemType.toLowerCase();

    const matchesbrand =
      filters.brand === "" ||
      product.brand.toLowerCase() === filters.brand.toLowerCase();

    return matchesName && matchesLocation && matchesItemType && matchesbrand;
  });

  return (
    <div className="bg-[#0C0A0B] min-h-screen flex flex-col">
      <Navbar onserviceClick={handleScrollToService} />
      <Tagline />
      <Hero />
      <Items />
      <FilterItem onChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Cards key={product._id} product={product} />
          ))
        ) : (
          <p className="text-white text-center col-span-full">
            No matching products found.
          </p>
        )}
      </div>
      {/* <div ref={serviceRef}>
        <Service />
      </div> */}

      <AboutUs />

      <Footer />
    </div>
  );
};

export default Homepage;
