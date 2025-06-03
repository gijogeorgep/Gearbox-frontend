import React, { useState, useEffect } from "react";
import SellerDasboardSidebar from "../components/SellerDasboardSidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

const SellItem = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [brand, setBrand] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [smallImage1, setSmallImage1] = useState(null);
  const [smallImage2, setSmallImage2] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [descriptionPoints, setDescriptionPoints] = useState(["", ""]);
  const [rate, setRate] = useState(100);
  const [cautionDeposit, setCautionDeposit] = useState(100);
  const [tutorialLink, setTutorialLink] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingMainImage, setUploadingMainImage] = useState(false);
  const [uploadingSmall1, setUploadingSmall1] = useState(false);
  const [uploadingSmall2, setUploadingSmall2] = useState(false);
  const [sellerData, setSellerData] = useState(null);

  // Fetch seller data on component mount
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://gearbox-backend-8c3f.onrender.com/api/seller/sellerprofile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSellerData(response.data);
      } catch (error) {
        console.error("Failed to fetch seller data:", error);
        alert("Failed to load seller profile. Try again.");
      }
    };
    fetchSellerData();
  }, []);

  const uploadImageToCloudinary = async (file) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "gearbox_cloudinary");
      data.append("cloud_name", "dztx4i2re");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dztx4i2re/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      if (!res.ok) throw new Error(`Upload failed with status: ${res.status}`);
      const json = await res.json();
      if (!json.secure_url)
        throw new Error("No secure URL returned from Cloudinary");
      console.log("Uploaded image URL:", json.secure_url);
      return json.secure_url;
    } catch (err) {
      console.error("Image upload failed", err);
      throw err;
    }
  };

  const handleImageChange = async (
    e,
    setImageSetter,
    setUploadStatusSetter
  ) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadStatusSetter(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setImageSetter(url);
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed. Try again!");
    }
    setUploadStatusSetter(false);
  };

  const handleIncrement = (setter, value) => {
    setter(value + 50);
  };

  const handleDecrement = (setter, value) => {
    if (value >= 50) setter(value - 50);
  };

  const handlePointChange = (index, value) => {
    const newPoints = [...descriptionPoints];
    newPoints[index] = value;
    setDescriptionPoints(newPoints);
  };

  const addPoint = () => {
    setDescriptionPoints([...descriptionPoints, ""]);
  };

  const removePoint = (index) => {
    if (descriptionPoints.length > 2) {
      const newPoints = descriptionPoints.filter((_, i) => i !== index);
      setDescriptionPoints(newPoints);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload the main image first!");
      return;
    }

    if (!sellerData) {
      alert("Seller data not loaded. Please try again.");
      return;
    }

    setIsUploading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = {
        email: sellerData.email,
        itemType: selectedItem,
        brand,
        name,
        description,
        detailedDescription: descriptionPoints.filter(
          (point) => point.trim() !== ""
        ),
        imageUrl,
        smallImages: [smallImage1, smallImage2].filter(Boolean),
        rate,
        location,
        cautionDeposit,
        tutorialLink,
        sellername: sellerData.username || "", // Adjust based on your seller profile response
      };

      const response = await axios.post(
        "https://gearbox-backend-8c3f.onrender.com/api/product/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Item uploaded successfully!");
      console.log("Response:", response.data);

      // Update state with saved product’s small images to ensure consistency
      const savedSmallImages = response.data.newProduct?.smallImages || [];
      setSmallImage1(savedSmallImages[0] || null);
      setSmallImage2(savedSmallImages[1] || null);

      // Optional: Reset other form fields
      setSelectedItem("");
      setBrand("");
      setName("");
      setDescription("");
      setDescriptionPoints(["", ""]);
      setLocation("");
      setRate(100);
      setCautionDeposit(100);
      setTutorialLink("");
      setImageUrl(""); // Optional: Reset main image or keep for display
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit. Try again.");
    }
    setIsUploading(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0C0A0B] overflow-hidden">
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
        {/* Sidebar */}
        <div className="w-full lg:w-60 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col items-center py-6">
          <SellerDasboardSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-4xl bg-white/10 p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-sm text-white">
            <form onSubmit={handleSubmit}>
              <h1 className="text-xl font-semibold mb-4">Select Item</h1>

              {/* Item Type Buttons */}
              <div className="flex gap-5 flex-wrap mb-6">
                {["camera", "tripod", "lens", "gimbal"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSelectedItem(item);
                      setBrand("");
                    }}
                    className={`rounded-xl px-4 py-2 w-[100px] ${
                      selectedItem === item
                        ? "bg-[#df1b1b] text-gray-200"
                        : "bg-[#FFFFFF] text-[#df1b1b] hover:bg-gray-200"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>

              {/* Brand Buttons if Camera Selected */}
              {selectedItem === "camera" && (
                <div className="flex gap-5 flex-wrap mb-6">
                  {["Nikon", "Sony", "Canon", "Fujifilm", "Panasonic"].map(
                    (b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBrand(b)}
                        className={`rounded-xl px-4 py-2 w-[100px] ${
                          brand === b
                            ? "bg-[#df1b1b] text-gray-200"
                            : "bg-[#FFFFFF] text-[#df1b1b] hover:bg-gray-200"
                        }`}
                      >
                        {b}
                      </button>
                    )
                  )}
                </div>
              )}

              {/* Main Image Upload */}
              <div className="flex justify-center mb-6">
                <label className="w-full max-w-md bg-white/10 border border-white/20 rounded-xl p-6 flex flex-col items-center gap-4 cursor-pointer">
                  {uploadingMainImage ? (
                    <p>Uploading...</p>
                  ) : imageUrl ? (
                    <>
                      <img
                        src={imageUrl}
                        alt="Uploaded Thumbnail"
                        className="w-24 h-24 object-cover rounded"
                        onError={() =>
                          console.log("Failed to load Main Image:", imageUrl)
                        }
                      />
                      <p className="text-sm text-white/70">Click to change</p>
                    </>
                  ) : (
                    <>
                      <img
                        width="48"
                        height="48"
                        src="https://img.icons8.com/material-rounded/48/upload-to-cloud.png"
                        alt="upload"
                      />
                      <p>Upload Thumbnail</p>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleImageChange(e, setImageUrl, setUploadingMainImage)
                    }
                    disabled={uploadingMainImage || isUploading}
                  />
                </label>
              </div>

              {/* Small Images Upload */}
              <div className="flex justify-center gap-4 mb-6">
                <label className="w-36 h-36 bg-white/10 border border-white/20 rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer">
                  {uploadingSmall1 ? (
                    <p>Uploading...</p>
                  ) : smallImage1 ? (
                    <>
                      <img
                        src={smallImage1}
                        alt="Uploaded Small Image 1"
                        className="w-24 h-24 object-cover rounded"
                        onError={() =>
                          console.log(
                            "Failed to load Small Image 1:",
                            smallImage1
                          )
                        }
                      />
                      <p className="text-sm text-white/70">Click to change</p>
                    </>
                  ) : (
                    <>
                      <img
                        width="32"
                        height="32"
                        src="https://img.icons8.com/material-rounded/48/upload-to-cloud.png"
                        alt="upload"
                      />
                      <p>Upload Img 1</p>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleImageChange(e, setSmallImage1, setUploadingSmall1)
                    }
                    disabled={uploadingSmall1 || isUploading}
                  />
                </label>

                <label className="w-36 h-36 bg-white/10 border border-white/20 rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer">
                  {uploadingSmall2 ? (
                    <p>Uploading...</p>
                  ) : smallImage2 ? (
                    <>
                      <img
                        src={smallImage2}
                        alt="Uploaded Small Image 2"
                        className="w-24 h-24 object-cover rounded"
                        onError={() =>
                          console.log(
                            "Failed to load Small Image 2:",
                            smallImage2
                          )
                        }
                      />
                      <p className="text-sm text-white/70">Click to change</p>
                    </>
                  ) : (
                    <>
                      <img
                        width="32"
                        height="32"
                        src="https://img.icons8.com/material-rounded/48/upload-to-cloud.png"
                        alt="upload"
                      />
                      <p>Upload Img 2</p>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleImageChange(e, setSmallImage2, setUploadingSmall2)
                    }
                    disabled={uploadingSmall2 || isUploading}
                  />
                </label>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  <label>Name</label>
                  <input
                    placeholder="Product Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-white/30 outline-none py-2"
                  />
                </div>

                <div>
                  <label>Description</label>
                  <input
                    placeholder="Short description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-transparent border-b border-white/30 outline-none py-2"
                  />
                </div>

                <div>
                  <label>Detailed Description (Points)</label>
                  {descriptionPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        placeholder={`Point ${index + 1}`}
                        type="text"
                        value={point}
                        onChange={(e) =>
                          handlePointChange(index, e.target.value)
                        }
                        className="w-full bg-transparent border-b border-white/30 outline-none py-2"
                      />
                      {descriptionPoints.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removePoint(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addPoint}
                    className="mt-2 text-sm text-green-500 hover:text-green-600"
                  >
                    + Add Another Point
                  </button>
                </div>

                <div>
                  <label>Location</label>
                  <input
                    placeholder="Location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent border-b border-white/30 outline-none py-2"
                  />
                </div>
              </div>

              {/* Rate and Caution */}
              <span>Rate</span>
              <div className="flex flex-col gap-6 mb-6">
                <div className="w-[220px] h-[66px] bg-[#d9d9d9]/10 rounded-lg flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-6 h-6 object-contain"
                      src="https://img.icons8.com/material-outlined/FFFFFF/48/rupee.png"
                      alt="rupee"
                    />
                    <p className="text-white text-lg font-medium">{rate}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => handleIncrement(setRate, rate)}
                      className="w-7 h-6 bg-[#d9d9d9]/10 text-white rounded-md flex items-center justify-center"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDecrement(setRate, rate)}
                      className="w-7 h-6 bg-[#d9d9d9]/10 text-white rounded-md flex items-center justify-center"
                    >
                      -
                    </button>
                  </div>
                </div>

                <span>Caution Deposit </span>
                <div className="w-[220px] h-[66px] bg-[#d9d9d9]/10 rounded-lg flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-6 h-6 object-contain"
                      src="https://img.icons8.com/material-outlined/FFFFFF/48/rupee.png"
                      alt="rupee"
                    />
                    <p className="text-white text-lg font-medium">
                      {cautionDeposit}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleIncrement(setCautionDeposit, cautionDeposit)
                      }
                      className="w-7 h-6 bg-[#d9d9d9]/10 text-white rounded-md flex items-center justify-center"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleDecrement(setCautionDeposit, cautionDeposit)
                      }
                      className="w-7 h-6 bg-[#d9d9d9]/10 text-white rounded-md flex items-center justify-center"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>

              {/* Tutorial Link */}
              <div className="mb-6">
                <label>Tutorial Link</label>
                <p className="text-sm text-gray-400 mt-1">
                  Find the 11-character code in the YouTube URL (e.g.,
                  `m6dZh8GHM2M` in `https://youtu.be/m6dZh8GHM2M` or
                  `https://www.youtube.com/watch?v=m6dZh8GHM2M`)
                </p>
                <input
                  placeholder="m6dZh8GHM2M"
                  type="text"
                  value={tutorialLink}
                  onChange={(e) => setTutorialLink(e.target.value)}
                  className="w-full bg-transparent border-b border-white/30 outline-none py-2"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition"
                  disabled={
                    isUploading ||
                    uploadingMainImage ||
                    uploadingSmall1 ||
                    uploadingSmall2
                  }
                >
                  {isUploading ? "Submitting..." : "Submit Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellItem;
