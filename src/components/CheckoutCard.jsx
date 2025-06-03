import React from "react";

const CheckoutCard = ({ product, startDate, endDate }) => {
  const getDayDifference = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = e - s;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const dayDiff =
    startDate && endDate ? getDayDifference(startDate, endDate) : null;
  const baseRate = product?.rate || 500;
  const addonCost = dayDiff && dayDiff > 1 ? (dayDiff - 1) * 100 : 0;
  const deliveryFee = 200;
  const cautionDeposit = product?.cautionDeposit || 0;
  const totalPayable = baseRate + addonCost + deliveryFee + cautionDeposit;

  return (
    <>
      <div className="max-w-[240px] w-full bg-white/15 backdrop-blur-md border border-white/10 rounded-md p-2.5 text-white space-y-1.5 text-xs font-[montserrat] mx-auto sm:mx-auto transition-transform hover:scale-[1.02]">
        <div className="space-y-0.5">
          <h2
            className="text-sm font-bold text-white tracking-tight truncate"
            title={product?.name}
          >
            {product?.name || "Product Name"}
          </h2>
          <p
            className="text-[11px] font-light text-gray-200 tracking-wide line-clamp-1 uppercase"
            title={product?.sellername}
          >
            {product?.sellername || "Seller Name"}
          </p>
        </div>
        <div className="space-y-1.5 px-1.5">
          <div className="flex flex-col">
            <div className="flex justify-between text-sm font-semibold text-white tracking-tight">
              <p>Item Total</p>
              <p>₹{baseRate}</p>
            </div>
            <span className="text-xs font-light text-gray-200 tracking-wide line-clamp-2">
              Rate for 1 day
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between text-sm font-semibold text-white tracking-tight">
              <p>Add On Days</p>
              <p>₹{addonCost}</p>
            </div>
            <span className="text-xs font-light text-gray-200 tracking-wide line-clamp-2">
              ₹100 increment
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between text-sm font-semibold text-white tracking-tight">
              <p>Caution Deposit</p>
              <p>₹{cautionDeposit}</p>
            </div>
            <span className="text-xs font-light text-gray-200 tracking-wide line-clamp-2">
              {cautionDeposit} return after returning the item
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between text-sm font-semibold text-white tracking-tight">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>
            <span className="text-xs font-light text-gray-200 tracking-wide line-clamp-2">
              Free up to 3 km, ₹20/km after
            </span>
          </div>
          <hr className="border-gray-600/20 my-1.5" />
          <div className="flex justify-between text-base font-bold text-white tracking-tight bg-white/30 rounded px-1.5 py-0.5">
            <p>TO PAY</p>
            <p className="text-[#df1b1b]">₹{totalPayable}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutCard;
