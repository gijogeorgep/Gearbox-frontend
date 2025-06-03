import React, { useState, useEffect } from "react";
import "./fonts.css";

const FilterItem = ({ onChange }) => {
  const [name, setname] = useState("");
  const [location, setLocation] = useState("");
  const [itemType, setItemType] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    onChange({ name, location, itemType, brand });
  }, [name, location, itemType, brand]);

  // Reset function to clear all filters
  const handleReset = () => {
    setname("");
    setLocation("");
    setItemType("");
    setBrand("");
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-6xl mx-auto bg-[#4f4a4a] rounded-xl p-4 shadow-2xs shadow-white/20">
        {/* Filter icon and title row */}
        <div className="flex items-center gap-3 mb-4">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/ios/50/FFFFFF/filter--v1.png"
            alt="filter"
          />
          <h2 className="text-white font-semibold text-lg">Filters</h2>
          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="ml-auto bg-red-500 hover:bg-[#df1b1b] text-white px-3 py-1 rounded transition duration-200"
          >
            Reset
          </button>
        </div>

        {/* Filter inputs */}
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
          <div className="bg-white/90 rounded-xl w-full md:w-[230px] h-12">
            <input
              onChange={(e) => setname(e.target.value)}
              value={name}
              className="w-full h-full p-3 outline-none bg-transparent text-[#df1b1b] placeholder-black"
              type="text"
              placeholder="Search by name"
            />
          </div>

          <div className="bg-white/90 rounded-xl w-full md:w-[230px] h-12">
            <input
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              className="w-full h-full p-3 outline-none bg-transparent text-[#df1b1b] placeholder-black"
              type="text"
              placeholder="Search by location"
            />
          </div>

          <div className="bg-white/90 rounded-xl w-full md:w-[230px] h-12">
            <select
              onChange={(e) => {
                setItemType(e.target.value);
                if (e.target.value !== "camera") {
                  setBrand("");
                }
              }}
              value={itemType}
              className="w-full h-full p-3 outline-none bg-transparent text-black"
              name="item-type"
            >
              <option value="">Select item type</option>
              <option value="camera">Camera</option>
              <option value="lens">Lens</option>
              <option value="gimbal">Gimbal</option>
              <option value="tripod">Tripod</option>
            </select>
          </div>

          {itemType === "camera" && (
            <div className="bg-white/10 rounded-xl w-full md:w-[230px] h-12">
              <select
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                className="w-full h-full p-3 outline-none bg-transparent text-black"
                name="brand"
              >
                <option value="">Select brand</option>
                <option value="sony">Sony</option>
                <option value="canon">Canon</option>
                <option value="nikon">Nikon</option>
                <option value="panasonic">Panasonic</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
